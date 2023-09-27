from jose import jwt
from datetime import datetime, timedelta

#Config

SECRET_KEY = 'db96ff26706a1a3d595ecb67266c2d94'
ALGORITHM = 'HS256'
EXPIRES_IN_MIN = 3000 

def create_access_token(data: dict):
    dados = data.copy()
    expirate = datetime.utcnow() + timedelta(minutes=EXPIRES_IN_MIN)

    dados.update({'exp': expirate})

    token_jwt = jwt.encode(dados, SECRET_KEY, algorithm=ALGORITHM)
    return token_jwt

def verify_access_token(token: str):
    carga = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    return carga.get('sub')

