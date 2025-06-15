from .app import db
from datetime import datetime, timezone
from flask_sqlalchemy import SQLAlchemy


class User(db.Model):
    __tablename__ = 'users' 

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    

    def __repr__(self):
        return f'<User {self.username}, {self.email}, {self.full_name}>'


class BlackListToken(db.Model):
    __tablename__ = "blacklist_tokens"

    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(40), nullable=True, index=True)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), nullable=True)

