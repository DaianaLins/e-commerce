from fastapi import APIRouter, Depends, HTTPException, status
from pydantic_core import to_json

from models.user import User, Login, SimpleUser
from config.db import conn
from schemas.user import userEntity, usersEntity
from bson import ObjectId
import json 
from sqlalchemy.orm import Session
from config.db import conn
from providers.hash_provider import gerar_hash, verificar_hash
from providers.token_provider import create_access_token
from utils.auth_utils import get_user

user = APIRouter()


@user.get('/')
async def find_all_users():
    print(conn.local.user.find())
    print(usersEntity(conn.local.user.find()))
    return usersEntity(conn.local.user.find())

# @user.get('/{id}')
# async def find_one_user(id):
#     return userEntity(conn.local.user.find_one({"_id":ObjectId(id)}))

@user.post('/create')
async def create_user(user: User):
    user_found = conn.local.user.find_one({"name": user.name, "email": user.email})
    if user_found:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Já existe um usuário com este nome ou email')

    user.password = gerar_hash(user.password)
    conn.local.user.insert_one(dict(user))
    return {'msg': 'Usuário criado com sucesso. Bem vindo(a)'} 

@user.put('/{id}')
async def update_user(id, user: User):
    conn.local.user.find_one_and_update({"_id":ObjectId(id)}, {"$set":dict(user)})
    return userEntity(conn.local.user.find_one({"_id":ObjectId(id)}))

@user.delete('/{id}')
async def delete_user(id, user: User):
    return userEntity(conn.local.user.find_one_and_delete({"_id":ObjectId(id)}))

@user.post('/token')
def login(login_data: Login):
    password = login_data.password
    email = login_data.email
    user = userEntity(conn.local.user.find_one({"email":email}))

    print(user)

    
    if not user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Email ou senha incorretos')
    
    password_valid = verificar_hash(text=password, hash=user['password'])
    if not password_valid:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Email ou senha incorretos')
    # # Gerar jwt
    token = create_access_token({'sub': user})
    return {'user': user, 'access_token': token}


@user.get('/me', response_model=SimpleUser)
def me(user:SimpleUser = Depends(get_user)):
    #decodificador
    return user
       
