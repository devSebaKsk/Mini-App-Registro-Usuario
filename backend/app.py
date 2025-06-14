import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy

load_dotenv()

app = Flask(__name__)
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy()
from .models import User



db.init_app(app)

with app.app_context():
    db.create_all()




# Ruta para obtener todos los usuarios
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify(users), 200

if __name__ == '__main__':
    # Si quieres crear las tablas automáticamente al inicio del servidor de desarrollo
    # Es más seguro usar la ruta /create_db o un script de migración en producción
    # with app.app_context():
    #     db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)



