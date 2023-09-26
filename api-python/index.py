from fastapi import FastAPI
from routes.user import user
from routes.product import product
from routes.category import category

app = FastAPI()

app.include_router(user, prefix="/User", tags=["Users"])
app.include_router(category, prefix="/Category", tags=["Categories"])
app.include_router(product, prefix="/Product", tags=["Products"])