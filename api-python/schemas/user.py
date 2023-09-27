from fastapi import HTTPException, status
from sqlalchemy import select
from models.user import User, Login 

def userEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "email": item["email"],
        "password": item["password"]
    }

def usersEntity(entity) -> list:
    return [userEntity(item) for item in entity]

# def obter_por_email(self, email) -> Login:
#     query = self.find_one({"email": email})
#     return self.session.execute(query).scalars.first()
    


