# Importación de las librerías necesarias
from flask import Flask, render_template, request, redirect, url_for  # Importa Flask y funciones auxiliares
import mysql.connector  # Librería para conectarse a MySQL

# Crear una instancia de la aplicación Flask
app = Flask(__name__)

# Configuración de la base de datos MySQL
db_config = {
    'host': 'localhost',  # Dirección del servidor de base de datos
    'user': 'root2',  # Nombre de usuario de la base de datos
    'password': '1212313',  # Contraseña del usuario de la base de datos
    'database': 'bdprueba'  # Nombre de la base de datos a la que nos conectamos
}

# Función para obtener la conexión con la base de datos
def get_db_connection():
    # Establece la conexión con la base de datos utilizando las credenciales proporcionadas
    conn = mysql.connector.connect(**db_config)
    return conn

# Ruta principal (home) que muestra la lista de personas en la base de datos
@app.route('/')
def index():
    conn = get_db_connection()  # Establece la conexión con la base de datos
    cursor = conn.cursor(dictionary=True)  # Crea un cursor para ejecutar consultas y obtener resultados como diccionarios
    cursor.execute('SELECT * FROM personas')  # Consulta todos los registros de la tabla 'personas'
    personas = cursor.fetchall()  # Obtiene todos los resultados de la consulta
    cursor.close()  # Cierra el cursor
    conn.close()  # Cierra la conexión con la base de datos
    return render_template('index.html', personas=personas)  # Renderiza la plantilla 'index.html' y pasa los datos de personas

# Ruta para agregar una nueva persona a la base de datos
@app.route('/add', methods=['POST'])  # Solo acepta solicitudes POST
def add_persona():
    # Obtiene los datos del formulario (nombre y edad)
    nombre = request.form['nombre']
    edad = request.form['edad']
    
    # Establece la conexión con la base de datos
    conn = get_db_connection()
    cursor = conn.cursor()
    # Ejecuta una consulta para insertar los nuevos datos en la tabla 'personas'
    cursor.execute('INSERT INTO personas (nombre, edad) VALUES (%s, %s)', (nombre, edad))
    conn.commit()  # Realiza el commit para guardar los cambios
    cursor.close()  # Cierra el cursor
    conn.close()  # Cierra la conexión con la base de datos
    return redirect(url_for('index'))  # Redirige a la página principal para mostrar la lista actualizada

# Ruta para actualizar los datos de una persona específica
@app.route('/update/<int:idpersonas>', methods=['GET', 'POST'])  # Acepta GET para mostrar el formulario y POST para guardar los cambios
def update_persona(idpersonas):
    # Establece la conexión con la base de datos
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    if request.method == 'POST':  # Si la solicitud es POST (cuando se envían los datos del formulario)
        nombre = request.form['nombre']
        edad = request.form['edad']
        # Ejecuta la consulta para actualizar los datos de la persona con el id especificado
        cursor.execute('UPDATE personas SET nombre = %s, edad = %s WHERE idpersonas = %s', (nombre, edad, idpersonas))
        conn.commit()  # Realiza el commit para guardar los cambios
        return redirect(url_for('index'))  # Redirige a la página principal para mostrar la lista actualizada
    
    # Si la solicitud es GET (cuando se carga la página de actualización)
    cursor.execute('SELECT * FROM personas WHERE idpersonas = %s', (idpersonas,))  # Obtiene los datos de la persona a actualizar
    persona = cursor.fetchone()  # Obtiene el primer registro (único, ya que estamos buscando por id)
    cursor.close()  # Cierra el cursor
    conn.close()  # Cierra la conexión con la base de datos
    return render_template('update.html', persona=persona)  # Renderiza el formulario con los datos de la persona

# Ruta para eliminar una persona de la base de datos
@app.route('/delete/<int:idpersonas>', methods=['GET'])  # Acepta solicitudes GET para eliminar el registro
def delete_persona(idpersonas):
    # Establece la conexión con la base de datos
    conn = get_db_connection()
    cursor = conn.cursor()
    # Ejecuta la consulta para eliminar el registro de la persona con el id especificado
    cursor.execute('DELETE FROM personas WHERE idpersonas = %s', (idpersonas,))
    conn.commit()  # Realiza el commit para guardar los cambios
    cursor.close()  # Cierra el cursor
    conn.close()  # Cierra la conexión con la base de datos
    return redirect(url_for('index'))  # Redirige a la página principal para mostrar la lista actualizada

# Inicia la aplicación Flask en modo de desarrollo (debug)
if __name__ == '__main__':
    app.run(debug=True)
