from pydantic import BaseModel

class Product(BaseModel):
    name: str
    description: str
    value: float
    category: str
    quantity: int