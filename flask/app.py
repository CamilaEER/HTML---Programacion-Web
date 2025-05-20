from flask import Flask, render_template, request
from flask_mysqldb import MySQL

# Crear una instancia de la aplicación Flask
app = Flask(__name__)

# Configuración de la conexión a la base de datos MySQL
app.config['MYSQL_HOST'] = 'localhost'      
app.config['MYSQL_USER'] = 'root2'           
app.config['MYSQL_PASSWORD'] = '1212313'     
app.config['MYSQL_DB'] = 'bdprueba'           

mysql = MySQL(app)

# Definir la ruta principal '/' que responde a peticiones GET
@app.route('/')
def index():
    return render_template('index.html')

# Definir la ruta '/insert' que solo acepta solicitudes POST para insertar datos
@app.route('/insert', methods=['POST'])
def insert():
    # Verificar que el método de la petición sea POST
    if request.method == 'POST':
        # Obtener los valores enviados en el formulario por el usuario
        nombre = request.form['nombre'] 
        edad = request.form['edad']      

        # Crear un cursor para ejecutar comandos SQL en la conexión MySQL
        cursor = mysql.connection.cursor()
        cursor.execute("INSERT INTO personas(nombre, edad) VALUES (%s, %s)", (nombre, edad))
        # Confirmar los cambios en la base de datos (hacer persistentes los datos insertados)
        mysql.connection.commit()
        cursor.close()
        return 'Persona insertada exitosamente'

# Si se ejecuta este archivo directamente, iniciar el servidor Flask en modo debug
if __name__ == "__main__":
    app.run(debug=True)
