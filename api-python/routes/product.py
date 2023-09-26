from fastapi import APIRouter

from models.product import Product
from config.db import conn
from schemas.product import productEntity, productsEntity
from bson import ObjectId

product = APIRouter()


@product.get('/')
async def find_all_produtcs():
    print(conn.local.product.find())
    print(productsEntity(conn.local.product.find()))
    return productsEntity(conn.local.product.find())

@product.post('/')
async def create_product(product: Product):
    conn.local.product.insert_one(dict(product))
    return productsEntity(conn.local.product.find())

@product.put('/{id}')
async def update_product(id, product: Product):
    conn.local.product.find_one_and_update({"_id":ObjectId(id)}, {"$set":dict(product)})
    return productEntity(conn.local.product.find_one({"_id":ObjectId(id)}))

@product.delete('/{id}')
async def delete_product(id, product: Product):
    return productEntity(conn.local.product.find_one_and_delete({"_id":ObjectId(id)}))
