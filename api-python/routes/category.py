from models.user import SimpleUser
from fastapi import APIRouter, Depends

from models.category import Category
from config.db import conn
from schemas.category import categoryEntity, categoriesEntity
from bson import ObjectId

category = APIRouter()
from utils.auth_utils import get_user


@category.get('/')
async def find_all_categories(user:SimpleUser = Depends(get_user)):
    return categoriesEntity(conn.local.category.find())

@category.post('/')
async def create_category(category: Category, user:SimpleUser = Depends(get_user)):
    conn.local.category.insert_one(dict(category))
    return categoriesEntity(conn.local.category.find())

@category.put('/{id}')
async def update_category(id, category: Category, user:SimpleUser = Depends(get_user)):
    conn.local.category.find_one_and_update({"_id":ObjectId(id)}, {"$set":dict(category)})
    return categoryEntity(conn.local.category.find_one({"_id":ObjectId(id)}))

@category.delete('/{id}')
async def delete_category(id, category: Category, user:SimpleUser = Depends(get_user)):
    return categoryEntity(conn.local.category.find_one_and_delete({"_id":ObjectId(id)}))
