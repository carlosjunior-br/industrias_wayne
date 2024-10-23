from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import esquemas, crud
from ..banco_dados import obter_db

router = APIRouter()

@router.post("/")
async def login(usuario: esquemas.UsuarioLogin, db: Session = Depends(obter_db)):
    db_usuario = crud.obter_usuario_por_nome(usuario.nome_usuario, db)
    if not db_usuario or db_usuario.senha != usuario.senha:
        raise HTTPException(status_code=401, detail="Usuário ou senha incorretos")
    # Registrar o acesso após login bem-sucedido
    try:
        crud.registrar_acesso(db=db, usuario_id=db_usuario.id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao registrar acesso: {str(e)}")
    
    return {
            "message": "Login realizado com sucesso",
            "papel": db_usuario.papel
            }