# Importación de librerías necesarias
from flask import Flask, request, jsonify  # Flask para la app web, request para obtener datos, jsonify para responder en JSON
from flask_mysqldb import MySQL             # Extensión de Flask para conectarse con MySQL
from flask_cors import CORS                 # Para permitir solicitudes de diferentes dominios
import bcrypt                               # Para cifrado seguro de contraseñas
import jwt                                  # Para generación y verificación de tokens JWT
import datetime                             # Para manejar fechas y expiración de tokens

# Inicialización de la app Flask
app = Flask(__name__)
CORS(app)  # Habilita CORS para que se pueda acceder desde el frontend

# Configuración de la base de datos MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '1212313'
app.config['MYSQL_DB'] = 'VentaCursos'

# Inicialización del objeto MySQL con la configuración
mysql = MySQL(app)

# Clave secreta para firmar y verificar JWTs
SECRET_KEY = 'tu_secreto_super_seguro'

# Ruta para registrar usuarios
@app.route('/registro', methods=['POST'])
def registro():
    data = request.json  # Obtener los datos del cuerpo de la solicitud (formato JSON)
    nombre = data['nombre']
    correo = data['correo']
    password = data['password']

    cur = mysql.connection.cursor()
    # Verificar si el correo ya está registrado
    cur.execute("SELECT * FROM Usuarios WHERE Correo = %s", (correo,))
    if cur.fetchone():
        cur.close()
        return jsonify({'message': 'Correo ya registrado'}), 400

    # Cifrado de la contraseña usando bcrypt
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    # Insertar nuevo usuario en la base de datos
    cur.execute("INSERT INTO Usuarios (Nombre, Correo, Password) VALUES (%s, %s, %s)",
                (nombre, correo, hashed.decode('utf-8')))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'Usuario registrado con éxito'}), 201

# Ruta para iniciar sesión
@app.route('/login', methods=['POST'])
def login():
    data = request.json  # Datos enviados por el cliente
    correo = data['correo']
    password = data['password']

    cur = mysql.connection.cursor()
    # Buscar al usuario por su correo
    cur.execute("SELECT * FROM Usuarios WHERE Correo = %s", (correo,))
    user = cur.fetchone()
    cur.close()

    if not user:
        return jsonify({'message': 'Usuario no encontrado'}), 400

    # Verificar contraseña cifrada
    if bcrypt.checkpw(password.encode('utf-8'), user[3].encode('utf-8')):
        # Generar un token JWT válido por 1 hora
        token = jwt.encode({
            'idUsuario': user[0],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, SECRET_KEY, algorithm='HS256')

        return jsonify({'token': token})
    else:
        return jsonify({'message': 'Contraseña incorrecta'}), 400


# Ruta para registrar una compra, requiere autenticación con JWT
@app.route('/compras', methods=['POST'])
def registrar_compra():
    token = None
    # Obtener el token del encabezado Authorization
    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith('Bearer '):
        token = auth_header.split(' ')[1]
    else:
        return jsonify({'message': 'Token no proporcionado'}), 401

    try:
        # Decodificar el token para obtener el id del usuario
        decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        idUsuario = decoded.get('idUsuario')
        if not idUsuario:
            return jsonify({'message': 'Token inválido: falta idUsuario'}), 401
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token expirado'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Token inválido'}), 401

    # Obtener id del certificado a comprar
    data = request.json
    idCertificado = data.get('idCertificado')
    if not idCertificado:
        return jsonify({'message': 'Falta idCertificado'}), 400

    cur = mysql.connection.cursor()
    try:
        # Insertar la compra en la base de datos
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


# Ruta para obtener todos los certificados pagados del usuario autenticado
@app.route('/mis-certificados', methods=['GET'])
def obtener_certificados_usuario():
    token = None
    # Obtener el token JWT del encabezado Authorization
    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith('Bearer '):
        token = auth_header.split(' ')[1]
    else:
        return jsonify({'message': 'Token no proporcionado'}), 401

    try:
        # Decodificar token para extraer el id del usuario
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
        # Buscar los certificados que el usuario ha comprado y que están en estado 'pagado'
        cur.execute("""
            SELECT Certificados.idCertificado, Certificados.NombreCertificado, Certificados.Precio
            FROM Compras
            JOIN Certificados ON Compras.idCertificado = Certificados.idCertificado
            WHERE Compras.idUsuario = %s AND Compras.Estado = 'pagado'
        """, (idUsuario,))
        certificados = cur.fetchall()

        # Formatear la respuesta como lista de diccionarios
        certificados_list = [
            {'idCertificado': c[0], 'nombre': c[1], 'precio': float(c[2])}
            for c in certificados
        ]
        return jsonify(certificados_list)
    finally:
        cur.close()


# Ejecutar la app en el puerto 5000 en modo debug
if __name__ == '__main__':
    app.run(port=5000, debug=True)
