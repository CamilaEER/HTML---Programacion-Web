from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import bcrypt
import jwt
import datetime

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'D@vid2003'
app.config['MYSQL_DB'] = 'VentaCursos'

mysql = MySQL(app)

SECRET_KEY = 'tu_secreto_super_seguro'

@app.route('/registro', methods=['POST'])
def registro():
    data = request.json
    nombre = data['nombre']
    correo = data['correo']
    password = data['password']

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM Usuarios WHERE Correo = %s", (correo,))
    if cur.fetchone():
        cur.close()
        return jsonify({'message': 'Correo ya registrado'}), 400

    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    cur.execute("INSERT INTO Usuarios (Nombre, Correo, Password) VALUES (%s, %s, %s)",
                (nombre, correo, hashed.decode('utf-8')))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message': 'Usuario registrado con éxito'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    correo = data['correo']
    password = data['password']

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM Usuarios WHERE Correo = %s", (correo,))
    user = cur.fetchone()
    cur.close()
    if not user:
        return jsonify({'message': 'Usuario no encontrado'}), 400

    if bcrypt.checkpw(password.encode('utf-8'), user[3].encode('utf-8')):
        token = jwt.encode({
            'idUsuario': user[0],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, SECRET_KEY, algorithm='HS256')
        return jsonify({'token': token})
    else:
        return jsonify({'message': 'Contraseña incorrecta'}), 400

from flask import request
import jwt

SECRET_KEY = 'tu_secreto_super_seguro'  # Debe ser el mismo que usas para firmar los tokens

@app.route('/compras', methods=['POST'])
def registrar_compra():
    token = None
    # Obtener token JWT del header Authorization
    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith('Bearer '):
        token = auth_header.split(' ')[1]
    else:
        return jsonify({'message': 'Token no proporcionado'}), 401

    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        idUsuario = decoded.get('idUsuario')
        if not idUsuario:
            return jsonify({'message': 'Token inválido: falta idUsuario'}), 401
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token expirado'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Token inválido'}), 401

    data = request.json
    idCertificado = data.get('idCertificado')
    if not idCertificado:
        return jsonify({'message': 'Falta idCertificado'}), 400

    cur = mysql.connection.cursor()
    try:
        cur.execute("""
            INSERT INTO Compras (idUsuario, idCertificado, Estado)
            VALUES (%s, %s, 'pagado')
        """, (idUsuario, idCertificado))
        mysql.connection.commit()
        return jsonify({'message': 'Compra registrada con éxito'}), 201
    except Exception as e:
        mysql.connection.rollback()
        return jsonify({'message': 'Error al registrar compra', 'error': str(e)}), 500
    finally:
        cur.close()

@app.route('/mis-certificados', methods=['GET'])
def obtener_certificados_usuario():
    token = None
    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith('Bearer '):
        token = auth_header.split(' ')[1]
    else:
        return jsonify({'message': 'Token no proporcionado'}), 401

    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        idUsuario = decoded.get('idUsuario')
        if not idUsuario:
            return jsonify({'message': 'Token inválido: falta idUsuario'}), 401
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token expirado'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Token inválido'}), 401

    cur = mysql.connection.cursor()
    try:
        cur.execute("""
            SELECT Certificados.idCertificado, Certificados.NombreCertificado, Certificados.Precio
            FROM Compras
            JOIN Certificados ON Compras.idCertificado = Certificados.idCertificado
            WHERE Compras.idUsuario = %s AND Compras.Estado = 'pagado'
        """, (idUsuario,))
        certificados = cur.fetchall()
        certificados_list = [
            {'idCertificado': c[0], 'nombre': c[1], 'precio': float(c[2])}
            for c in certificados
        ]
        return jsonify(certificados_list)
    finally:
        cur.close()


if __name__ == '__main__':
    app.run(port=5000, debug=True)

