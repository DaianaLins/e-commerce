import uvicorn
from fastapi import FastAPI
from fastapi import FastAPI
from fastapi_socketio import SocketManager

from fastapi.middleware.cors import CORSMiddleware
from sockets import sio_app

from routes.user import user
from routes.product import product
from routes.category import category

app = FastAPI()

app.include_router(user, prefix="/user", tags=["Users"])
app.include_router(category, prefix="/category", tags=["Categories"])
app.include_router(product, prefix="/product", tags=["Products"])

app.mount('/', app=sio_app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if __name__ == '__main__':
    uvicorn.run('index:app', reload=True)
