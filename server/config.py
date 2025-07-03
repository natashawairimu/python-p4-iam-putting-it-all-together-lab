import os
from flask_bcrypt import Bcrypt

# Initialize bcrypt (used in models for password hashing)
bcrypt = Bcrypt()

# Configuration class
class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL") or "sqlite:///app.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get("SECRET_KEY") or b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
