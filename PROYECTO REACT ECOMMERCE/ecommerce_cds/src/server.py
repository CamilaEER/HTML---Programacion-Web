from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import bcrypt
import jwt
import datetime
print("Cargando servidor Flask con todas las rutas...")

app = Flask(__name__)
CORS(app)  # Permitir todas las solicitudes CORS

app.config['SECRET_KEY'] = 'secreta'  # Cambia por tu propia clave secreta para JWT

# Configuración de la conexión a la base de datos
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'D@vid2003',  # Cambia con tu contraseña real
    'database': 'ecommercecds'
}

# Función para obtener conexión
def get_db_connection():
    return mysql.connector.connect(**db_config)

def test_db_connection():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT 1')
        # Lee el resultado para limpiar el buffer
        cursor.fetchone()
        cursor.close()
        conn.close()
        print("Conexión a la base de datos exitosa ✅")
        return True
    except mysql.connector.Error as err:
        print(f"Error al conectar a la base de datos: {err} ❌")
        return False


# Ruta para testear conexión vía HTTP
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

# Ruta para login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    correo = data.get('correo')
    password = data.get('password')

    if not correo or not password:
        return jsonify({'message': 'Correo y contraseña son requeridos'}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute('SELECT * FROM Persona WHERE Correo = %s', (correo,))
    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if not user:
        return jsonify({'message': 'Usuario no encontrado'}), 400

    # Verificar contraseña
    if not bcrypt.checkpw(password.encode('utf-8'), user['Password'].encode('utf-8')):
        return jsonify({'message': 'Contraseña incorrecta'}), 400

    # Generar token JWT
    payload = {
        'idPersona': user['idPersona'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }
    token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')

    return jsonify({'token': token})

# Ruta para registro
@app.route('/registro', methods=['POST'])
def registro():
    data = request.get_json()
    nombre = data.get('nombre')
    edad = data.get('edad')
    correo = data.get('correo')
    password = data.get('password')

    if not all([nombre, edad, correo, password]):
        return jsonify({'message': 'Faltan datos obligatorios'}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    # Verificar si correo ya existe
    cursor.execute('SELECT * FROM Persona WHERE Correo = %s', (correo,))
    if cursor.fetchone():
        cursor.close()
        conn.close()
        return jsonify({'message': 'El correo ya está registrado'}), 400

    # Encriptar contraseña
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Insertar nuevo usuario
    cursor.execute(
        'INSERT INTO Persona (Nombre, Edad, Correo, Password) VALUES (%s, %s, %s, %s)',
        (nombre, edad, correo, hashed.decode('utf-8'))
    )
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({'message': 'Usuario registrado con éxito'}), 201

@app.route('/api/cds', methods=['GET'])
def get_cds():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        query = '''
            SELECT CDs.*, Artistas.Nombre AS ArtistaNombre, Generos.Nombre AS GeneroNombre
        FROM CDs
        JOIN Artistas ON CDs.idArtista = Artistas.idArtista
        JOIN Generos ON CDs.idGenero = Generos.idGenero
        '''
        cursor.execute(query)
        results = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(results)
    except mysql.connector.Error as err:
        print(f"Error en /api/cds: {err}")
        return jsonify({'message': 'Error en base de datos', 'error': str(err)}), 500

@app.route('/api/generos', methods=['GET'])
def obtener_generos():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = "SELECT * FROM Generos"

    try:
        cursor.execute(query)
        generos = cursor.fetchall()
        return jsonify(generos)
    except Exception as e:
        print("Error al obtener los géneros:", e)
        return jsonify({"message": "Error al obtener los géneros"}), 500
    finally:
        cursor.close()
        conn.close()


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

    if not result:
        return jsonify({'message': 'CD no encontrado'}), 404

    return jsonify(result)

# Ruta para registrar pedido y detalle
@app.route('/pedido', methods=['POST'])
def registrar_pedido():
    data = request.get_json()
    idPersona = data.get('idPersona')
    total = data.get('total')
    items = data.get('items')

    if not idPersona or not total or not isinstance(items, list):
        return jsonify({'message': 'Datos incompletos o incorrectos'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Insertar pedido
        cursor.execute('INSERT INTO Pedidos (idPersona, Total) VALUES (%s, %s)', (idPersona, total))
        idPedido = cursor.lastrowid

        # Insertar detalle pedido
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

# Ruta para ver los pedidos del cliente
@app.route('/api/pedidos/<int:idPersona>', methods=['GET'])
def obtener_pedidos_usuario(idPersona):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        query_pedidos = '''
            SELECT * FROM Pedidos
            WHERE idPersona = %s
            ORDER BY FechaPedido DESC
        '''
        cursor.execute(query_pedidos, (idPersona,))
        pedidos = cursor.fetchall()

        for pedido in pedidos:
            cursor.execute('''
                SELECT DetallePedido.*, CDs.Titulo, CDs.ImagenURL
                FROM DetallePedido
                JOIN CDs ON DetallePedido.idCD = CDs.idCD
                WHERE DetallePedido.idPedido = %s
            ''', (pedido['idPedido'],))
            detalles = cursor.fetchall()
            pedido['detalles'] = detalles

        cursor.close()
        conn.close()

        return jsonify(pedidos)
    except Exception as e:
        print("Error al obtener pedidos:", e)
        return jsonify({'message': 'Error al obtener pedidos', 'error': str(e)}), 500


@app.route('/')
def home():
    return 'Servidor Flask activo y funcionando!'


if __name__ == '__main__':
    print("Iniciando servidor")
    if test_db_connection():
        print("Iniciando servidor Flask...")

        app.run(port=5000, debug=True)
    else:
        print("No se pudo establecer conexión con la base de datos. Revisa la configuración.")
