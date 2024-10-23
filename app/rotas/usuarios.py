from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import crud, esquemas
from ..banco_dados import obter_db

router = APIRouter()

@router.post("/", response_model=esquemas.Usuario)
async def criar_usuario(usuario: esquemas.UsuarioCriar, db: Session = Depends(obter_db)):
       if crud.verificar_nome_usuario_existe(db, usuario.nome_usuario):
           raise HTTPException(status_code=400, detail="Nome de usuário já existe")
       return crud.criar_usuario(db=db, usuario=usuario)

@router.get("/", response_model=list[esquemas.Usuario])
async def ler_usuarios(db: Session = Depends(obter_db)):
    return crud.obter_usuarios(db)

@router.get("/{usuario_id}", response_model=esquemas.Usuario)
async def ler_usuario(usuario_id: int, db: Session = Depends(obter_db)):
    usuario = crud.obter_usuario(db, usuario_id)
    if usuario is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return usuario

@router.get("/verificar/{nome_usuario}", response_model=bool)
async def verificar_usuario(nome_usuario: str, db: Session = Depends(obter_db)):
    existe = crud.verificar_nome_usuario_existe(db, nome_usuario)
    return existe

@router.delete("/{usuario_id}", status_code=status.HTTP_204_NO_CONTENT)
async def deletar_usuario(usuario_id: int, db: Session = Depends(obter_db)):
    try:
        crud.deletar_usuario(db=db, usuario_id=usuario_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    
@router.put("/{usuario_id}", response_model=esquemas.Usuario)
async def atualizar_usuario(usuario_id: int, usuario: esquemas.UsuarioAtualizar, db: Session = Depends(obter_db)):
    try:
        usuario_atualizado = crud.atualizar_usuario(db=db, usuario_id=usuario_id, usuario=usuario)
        if not usuario_atualizado:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")
        return usuario_atualizado
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))