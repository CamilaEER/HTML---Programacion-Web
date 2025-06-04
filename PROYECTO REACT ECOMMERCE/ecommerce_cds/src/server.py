from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import bcrypt
import jwt
import datetime

# Mensaje de carga del servidor
print("Cargando servidor Flask con todas las rutas...")

# Inicialización de la app Flask
app = Flask(__name__)
CORS(app)  # Permitir todas las solicitudes CORS (Compartir recursos entre diferentes orígenes)

# Configuración de la clave secreta para JWT (asegúrate de cambiarla por algo más seguro)
app.config['SECRET_KEY'] = 'secreta'

# Configuración de conexión a la base de datos MySQL
db_config = {
    'host': 'localhost',  # Dirección del servidor de base de datos
    'user': 'root',       # Nombre de usuario de la base de datos
    'password': '1212313',  # Contraseña para la base de datos (modifica según tu configuración)
    'database': 'ecommercecds'  # Nombre de la base de datos
}

# Función para obtener la conexión a la base de datos
def get_db_connection():
    return mysql.connector.connect(**db_config)

# Función para probar la conexión a la base de datos
def test_db_connection():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT 1')  # Ejecuta una consulta simple para verificar la conexión
        cursor.fetchone()  # Lee el resultado para limpiar el buffer
        cursor.close()
        conn.close()
        print("Conexión a la base de datos exitosa ✅")
        return True
    except mysql.connector.Error as err:
        print(f"Error al conectar a la base de datos: {err} ❌")
        return False

# Ruta para testear la conexión a la base de datos
@app.route('/test-db', methods=['GET'])
def test_db():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT 1')
        cursor.close()
        conn.close()
        return jsonify({'message': 'Conexión a la base de datos exitosa'}), 200
    except mysql.connector.Error as err:
        return jsonify({'message': 'Error en conexión a la base de datos', 'error': str(err)}), 500

# Ruta para el login de usuarios
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()  # Obtener los datos enviados en formato JSON
    correo = data.get('correo')
    password = data.get('password')

    # Validación de datos de entrada
    if not correo or not password:
        return jsonify({'message': 'Correo y contraseña son requeridos'}), 400

    # Conexión a la base de datos
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # Buscar al usuario por correo
    cursor.execute('SELECT * FROM Persona WHERE Correo = %s', (correo,))
    user = cursor.fetchone()

    cursor.close()
    conn.close()

    # Verificar si el usuario existe
    if not user:
        return jsonify({'message': 'Usuario no encontrado'}), 400

    # Verificar la contraseña
    if not bcrypt.checkpw(password.encode('utf-8'), user['Password'].encode('utf-8')):
        return jsonify({'message': 'Contraseña incorrecta'}), 400

    # Generar un token JWT válido por 1 hora
    payload = {
        'idPersona': user['idPersona'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }
    token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')

    return jsonify({'token': token})

# Ruta para registrar un nuevo usuario
@app.route('/registro', methods=['POST'])
def registro():
    data = request.get_json()
    nombre = data.get('nombre')
    edad = data.get('edad')
    correo = data.get('correo')
    password = data.get('password')

    # Verificar si todos los datos necesarios están presentes
    if not all([nombre, edad, correo, password]):
        return jsonify({'message': 'Faltan datos obligatorios'}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # Verificar si el correo ya está registrado
    cursor.execute('SELECT * FROM Persona WHERE Correo = %s', (correo,))
    if cursor.fetchone():
        cursor.close()
        conn.close()
        return jsonify({'message': 'El correo ya está registrado'}), 400

    # Encriptar la contraseña antes de guardarla
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Insertar el nuevo usuario en la base de datos
    cursor.execute(
        'INSERT INTO Persona (Nombre, Edad, Correo, Password) VALUES (%s, %s, %s, %s)',
        (nombre, edad, correo, hashed.decode('utf-8'))
    )
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({'message': 'Usuario registrado con éxito'}), 201

# Ruta para obtener la lista de CDs
@app.route('/api/cds', methods=['GET'])
def get_cds():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        query = '''
            SELECT CDs.*, Artistas.Nombre AS ArtistaNombre
            FROM CDs
            JOIN Artistas ON CDs.idArtista = Artistas.idArtista
        '''
        cursor.execute(query)
        results = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(results)
    except mysql.connector.Error as err:
        print(f"Error en /api/cds: {err}")
        return jsonify({'message': 'Error en base de datos', 'error': str(err)}), 500

# Ruta para obtener un CD específico
@app.route('/api/cds/<int:id>', methods=['GET'])
def get_cd(id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = '''
        SELECT CDs.*, Artistas.Nombre AS ArtistaNombre
        FROM CDs
        JOIN Artistas ON CDs.idArtista = Artistas.idArtista
        WHERE CDs.idCD = %s
    '''
    cursor.execute(query, (id,))
    result = cursor.fetchone()

    cursor.close()
    conn.close()

    # Verificar si el CD existe
    if not result:
        return jsonify({'message': 'CD no encontrado'}), 404

    return jsonify(result)

# Ruta para registrar un pedido
@app.route('/pedido', methods=['POST'])
def registrar_pedido():
    data = request.get_json()
    idPersona = data.get('idPersona')
    total = data.get('total')
    items = data.get('items')

    # Verificación de datos incompletos
    if not idPersona or not total or not isinstance(items, list):
        return jsonify({'message': 'Datos incompletos o incorrectos'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Insertar el pedido
        cursor.execute('INSERT INTO Pedidos (idPersona, Total) VALUES (%s, %s)', (idPersona, total))
        idPedido = cursor.lastrowid

        # Insertar los detalles del pedido
        insert_detalle = 'INSERT INTO DetallePedido (idPedido, idCD, Cantidad, PrecioUnitario) VALUES (%s, %s, %s, %s)'

        for item in items:
            cursor.execute(insert_detalle, (
                idPedido,
                item.get('idCD'),
                item.get('cantidad'),
                item.get('precio')
            ))

        conn.commit()
    except Exception as e:
        conn.rollback()
        cursor.close()
        conn.close()
        print("Error al insertar pedido:", e)
        return jsonify({'message': 'Error al registrar el pedido', 'error': str(e)}), 500

    cursor.close()
    conn.close()

    return jsonify({'message': 'Pedido y detalle registrados correctamente'}), 200

# Ruta principal para verificar que el servidor está funcionando
@app.route('/')
def home():
    return 'Servidor Flask activo y funcionando!'

# Iniciar el servidor Flask
if __name__ == '__main__':
    print("Iniciando servidor")
    # Verificar si la conexión a la base de datos es exitosa antes de iniciar el servidor
    if test_db_connection():
        print("Iniciando servidor Flask...")
        app.run(port=5000, debug=True)  # Ejecutar servidor Flask en el puerto 5000
    else:
        print("No se pudo establecer conexión con la base de datos. Revisa la configuración.")
