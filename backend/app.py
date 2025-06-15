import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt, get_jti, verify_jwt_in_request
from flask_bcrypt import Bcrypt
from datetime import datetime, timezone, timedelta


load_dotenv()

app = Flask(__name__)
CORS(app)



app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy()
from .models import User, BlackListToken

db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


app.config["JWT_SECRET_KEY"] = "nuestra_clave_secreta"


with app.app_context():
    db.create_all()




@jwt.token_in_blocklist_loader
def handle_revoked_token(jwt_header, jwt_payload):
    jti = jwt_payload['jti']

    token = db.session.execute(
        db.select(BlackListToken).filter_by(jti=jti)).scalar()
    return token is not None



@app.route("/createUser", methods=["POST"])
def create_user():
    data = request.get_json(silent=True)
    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Datos inválidos"}), 400

    if db.session.execute(db.select(User).filter_by(email=data["email"])).scalar_one_or_none():
        return jsonify({"error": "Usuario ya existe"}), 409

    pw_hash = bcrypt.generate_password_hash(data["password"]).decode('utf8')
    date = datetime.now(timezone.utc)

    user = User(
        fullname=data["fullname"],
        email=data["email"],
        password=pw_hash,
        created_at=date
    )

    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "Usuario registrado"}), 201




# backend/app.py

# ... (tus imports y configuraciones anteriores) ...

# ... (tus rutas /create_db_manual, /register, /login) ...

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_list = []
    for user in users:
        users_list.append({
            "id": user.id,
            "fullname": user.fullname,
            "email": user.email,

        })


    return jsonify(users_list), 200



if __name__ == '__main__':
    # Si quieres crear las tablas automáticamente al inicio del servidor de desarrollo
    # Es más seguro usar la ruta /create_db o un script de migración en producción
    # with app.app_context():
    #     db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)



