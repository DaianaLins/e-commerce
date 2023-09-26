from fastapi import APIRouter

from models.category import Category
from config.db import conn
from schemas.category import categoryEntity, categoriesEntity
from bson import ObjectId

category = APIRouter()


@category.get('/')
async def find_all_categories():
    print(conn.local.category.find())
    print(categoriesEntity(conn.local.category.find()))
    return categoriesEntity(conn.local.category.find())

@category.post('/')
async def create_category(category: Category):
    conn.local.category.insert_one(dict(category))
    return categoriesEntity(conn.local.category.find())

@category.put('/{id}')
async def update_category(id, category: Category):
    conn.local.category.find_one_and_update({"_id":ObjectId(id)}, {"$set":dict(category)})
    return categoryEntity(conn.local.category.find_one({"_id":ObjectId(id)}))

@category.delete('/{id}')
async def delete_category(id, category: Category):
    return categoryEntity(conn.local.category.find_one_and_delete({"_id":ObjectId(id)}))
