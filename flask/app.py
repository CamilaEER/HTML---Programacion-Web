from flask import Flask, render_template, request, redirect, url_for
from flask_mysqldb import MySQL

# Crear la aplicación Flask
app = Flask(__name__)

# Configuración para conectar con la base de datos MySQL
app.config['MYSQL_HOST'] = 'localhost'          # Host donde está corriendo MySQL
app.config['MYSQL_USER'] = 'root'              # Usuario de MySQL
app.config['MYSQL_PASSWORD'] = 'D@vid2003'        # Contraseña de MySQL
app.config['MYSQL_DB'] = 'bdprueba'              # Nombre de la base de datos

# Inicializar la extensión MySQL para usarla con Flask
mysql = MySQL(app)

# Ruta principal que muestra la lista de personas (función READ del CRUD)
@app.route('/')
def index():
    # Crear un cursor para ejecutar consultas SQL
    cursor = mysql.connection.cursor()
    # Ejecutar consulta para obtener todos los registros de la tabla personas
    cursor.execute("SELECT * FROM personas")
    # Obtener todos los resultados en una lista de tuplas
    data = cursor.fetchall()
    # Cerrar el cursor para liberar recursos
    cursor.close()
    # Renderizar la plantilla HTML 'index.html' y pasar la lista de personas
    return render_template('index.html', personas=data)

# Ruta para agregar una persona (función CREATE del CRUD)
@app.route('/add', methods=['GET', 'POST'])
def add_persona():
    # Si el método es POST, significa que el formulario fue enviado
    if request.method == 'POST':
        # Obtener datos del formulario
        nombre = request.form['nombre']
        edad = request.form['edad']
        # Crear cursor para insertar en la base de datos
        cursor = mysql.connection.cursor()
        # Insertar nueva persona usando query parametrizada para evitar SQL injection
        cursor.execute("INSERT INTO personas(nombre, edad) VALUES (%s, %s)", (nombre, edad))
        # Confirmar cambios en la base de datos
        mysql.connection.commit()
        # Cerrar cursor
        cursor.close()
        # Redirigir a la página principal (lista de personas)
        return redirect(url_for('index'))
    # Si es GET, simplemente mostrar el formulario para agregar persona
    return render_template('add_persona.html')

# Ruta para editar una persona existente (función UPDATE del CRUD)
@app.route('/edit/<int:idpersonas>', methods=['GET', 'POST'])
def edit_persona(idpersonas):
    cursor = mysql.connection.cursor()

    if request.method == 'POST':
        # Si recibimos datos desde el formulario, actualizamos la persona
        nombre = request.form['nombre']
        edad = request.form['edad']
        # Ejecutar consulta de actualización
        cursor.execute("UPDATE personas SET nombre = %s, edad = %s WHERE idpersonas = %s",
                       (nombre, edad, idpersonas))

        # Confirmar cambios
        mysql.connection.commit()
        # Cerrar cursor
        cursor.close()
        # Redirigir a la lista principal
        return redirect(url_for('index'))

    # Si el método es GET, obtener los datos actuales para mostrar en el formulario
    cursor.execute("SELECT * FROM personas WHERE idpersonas = %s", (idpersonas,))
    persona = cursor.fetchone()  # Obtener un solo registro

    cursor.close()

    # Renderizar formulario de edición pasando los datos de la persona
    return render_template('edit_persona.html', persona=persona)

# Ruta para eliminar una persona (función DELETE del CRUD)
@app.route('/delete/<int:idpersonas>', methods=['GET'])
def delete_persona(idpersonas):
    cursor = mysql.connection.cursor()
    # Ejecutar consulta para eliminar el registro por id
    cursor.execute("DELETE FROM personas WHERE idpersonas = %s", (idpersonas,))
    # Confirmar cambios
    mysql.connection.commit()
    # Cerrar cursor
    cursor.close()
    # Redirigir a la lista principal
    return redirect(url_for('index'))

# Punto de entrada para ejecutar la aplicación
if __name__ == "__main__":
    # Ejecutar servidor en modo debug para desarrollo (recarga automática)
    app.run(debug=True)
