from utils.auth_utils import get_user
from models.user import SimpleUser
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, Form

from models.product import Product
from config.db import conn
from schemas.product import productEntity, productsEntity
from bson import ObjectId
import uuid
from pydantic import BaseModel, Json
from typing import Annotated
from fastapi.responses import FileResponse
import os
from random import randint
import uuid
 

product = APIRouter()
IMAGEDIR = "images/"

@product.get('/')
async def find_all_produtcs():
    return productsEntity(conn.local.product.find())

@product.post('/create')
async def create_product(product: Annotated[Json[Product], Form()], file: UploadFile = None):
    file.filename = f"{uuid.uuid4()}.jpg"
    contents = await file.read()
 
    with open(f"{IMAGEDIR}{file.filename}",  'wb') as f:
        f.write(contents)
        files = os.listdir(IMAGEDIR)
        random_index = randint(0, len(files) - 1)
 
        path = f"{IMAGEDIR}{files[random_index]}"
        product.image = path

        conn.local.product.insert_one(dict(product))
        return "Produto cadastrado com sucesso" 


@product.put('/{id}')
async def update_product(id, product: Product, user:SimpleUser = Depends(get_user)):
    conn.local.product.find_one_and_update({"_id":ObjectId(id)}, {"$set":dict(product)})
    return productEntity(conn.local.product.find_one({"_id":ObjectId(id)}))

@product.delete('/{id}')
async def delete_product(id, product: Product, user:SimpleUser = Depends(get_user)):
    return productEntity(conn.local.product.find_one_and_delete({"_id":ObjectId(id)}))

@product.get('/images/{file}')
async def images(file: str):
        files = os.listdir(IMAGEDIR)
        random_index = randint(0, len(files) - 1)
        
        path = f"{IMAGEDIR}{file}"
     
        return FileResponse(path)