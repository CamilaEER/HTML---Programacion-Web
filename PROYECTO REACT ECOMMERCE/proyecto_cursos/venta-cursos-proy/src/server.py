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
app.config['MYSQL_PASSWORD'] = '1212313'
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

if __name__ == '__main__':
    app.run(port=5000, debug=True)
