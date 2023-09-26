from fastapi import APIRouter, Depends, HTTPException, status

from models.user import User
from config.db import conn
from schemas.user import userEntity, usersEntity
from bson import ObjectId
import json 
from sqlalchemy.orm import Session
from config.db import conn
from providers.hash_provider import gerar_hash

user = APIRouter()


@user.get('/')
async def find_all_users():
    print(conn.local.user.find())
    print(usersEntity(conn.local.user.find()))
    return usersEntity(conn.local.user.find())

@user.get('/')
async def find_one_user(name, password):
    return userEntity(conn.local.user.find_one({"name":name, "password": password}))

@user.post('/create')
async def create_user(user: User):
    user_found = conn.local.user.find_one({"name": user.name, "email": user.email})
    print(user_found)
    if user_found:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Já existe um usuário com este nome ou email')

    user.password = gerar_hash(user.password)
    conn.local.user.insert_one(dict(user))
    return user 

@user.put('/{id}')
async def update_user(id, user: User):
    conn.local.user.find_one_and_update({"_id":ObjectId(id)}, {"$set":dict(user)})
    return userEntity(conn.local.user.find_one({"_id":ObjectId(id)}))

@user.delete('/{id}')
async def delete_user(id, user: User):
    return userEntity(conn.local.user.find_one_and_delete({"_id":ObjectId(id)}))

# @user.post('/token')
# def login(login_data: User, session: Session = Depends(conn)):
#     pass
