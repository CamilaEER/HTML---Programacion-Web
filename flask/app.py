from flask import Flask, render_template, request
from flask_mysqldb import MySQL

app = Flask(__name__)

# Configuración de conexión a MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root2'  # Cambia esto si tu usuario es diferente
app.config['MYSQL_PASSWORD'] = '1212313'  # Pon tu contraseña aquí
app.config['MYSQL_DB'] = 'bdprueba'

mysql = MySQL(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/insert', methods=['POST'])
def insert():
    if request.method == 'POST':
        nombre = request.form['nombre']
        edad = request.form['edad']
        cursor = mysql.connection.cursor()
        cursor.execute("INSERT INTO personas(nombre, edad) VALUES (%s, %s)", (nombre, edad))
        mysql.connection.commit()
        cursor.close()
        return 'Persona insertada exitosamente'

if __name__ == "__main__":
    app.run(debug=True)
