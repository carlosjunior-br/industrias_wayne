from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import crud, esquemas
from ..banco_dados import obter_db

router = APIRouter()

# Endpoint para verificar se existem usuários cadastrados
@router.get("/verificar/", response_model=bool)
async def verificar_usuarios(db: Session = Depends(obter_db)):
    return crud.existe_usuarios(db)

# Endpoint para criar o primeiro usuário administrador
@router.post("/cadastrar-admin/", response_model=esquemas.Usuario)
async def cadastrar_admin(usuario: esquemas.UsuarioCriar, db: Session = Depends(obter_db)):
    try:
        return crud.criar_usuario(db=db, usuario=usuario)
    except ValueError as e:
        # Se o nome de usuário já existir, retornamos um erro 400
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))