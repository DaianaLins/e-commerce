from jose import jwt
from datetime import datetime, timedelta
import base64
import json


#Config

SECRET_KEY = 'db96ff26706a1a3d595ecb67266c2d94'
ALGORITHM = 'HS256'
EXPIRES_IN_MIN = 3000 

def create_access_token(data: dict):
    dados = data.copy()
    expirate = datetime.utcnow() + timedelta(EXPIRES_IN_MIN)

    dados.update({'exp': expirate})

    token_jwt = jwt.encode(dados, SECRET_KEY, algorithm=ALGORITHM)
    return token_jwt

def verify_access_token(token: str):
    parts = token.split(".")
    if len(parts) != 3:
        raise Exception("Incorrect id token format")
    payload = parts[1]
    padded = payload + "=" * (4 - len(payload) % 4)
    decoded = base64.b64decode(padded)
    return json.loads(decoded)
