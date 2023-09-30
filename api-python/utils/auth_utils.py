from schemas.user import userEntity
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from config.db import conn
from providers import token_provider
from jose import JWTError
from bson import ObjectId

oauth2_schema = OAuth2PasswordBearer(tokenUrl="token")

def get_user(token: str= Depends(oauth2_schema)):
    try:
        email = token_provider.verify_access_token(token)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))
    
    if not email:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Token invalido não email')
    
    user = conn.local.user.find_one({"_id":ObjectId(email['sub']['id'])})


    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Token invalido, usuário não localizado')
    

    return user