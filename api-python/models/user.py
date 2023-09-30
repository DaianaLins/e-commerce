from pydantic import BaseModel

class User(BaseModel):
    name: str
    email: str
    password: str

class SimpleUser(BaseModel):
    name: str
    email: str

class Login(BaseModel):
    email: str
    password: str    
    