from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import crud, esquemas
from ..banco_dados import obter_db

router = APIRouter()

@router.post("/", response_model=esquemas.Recurso)
async def criar_recurso(recurso: esquemas.RecursoCriar, db: Session = Depends(obter_db)):
    try:
        return crud.criar_recurso(db=db, recurso=recurso)
    except ValueError as e:
        # Se o recurso já existir, retornamos um erro 400
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.get("/", response_model=list[esquemas.Recurso])
async def ler_recursos(db: Session = Depends(obter_db)):
    return crud.obter_recursos(db)

@router.get("/{recurso_id}", response_model=esquemas.Recurso)
async def ler_recurso(recurso_id: int, db: Session = Depends(obter_db)):
    recurso = crud.obter_recurso(db, recurso_id)
    if recurso is None:
        raise HTTPException(status_code=404, detail="Recurso não encontrado")
    return recurso

@router.get("/verificar/{nome}", response_model=bool)
async def verificar_recurso(nome: str, db: Session = Depends(obter_db)):
    existe = crud.verificar_nome_recurso_existe(db, nome)
    return existe

@router.delete("/{recurso_id}", status_code=status.HTTP_204_NO_CONTENT)
async def deletar_recurso(recurso_id: int, db: Session = Depends(obter_db)):
    try:
        crud.deletar_recurso(db=db, recurso_id=recurso_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    
@router.put("/{recurso_id}", response_model=esquemas.Recurso)
async def atualizar_recurso(recurso_id: int, recurso: esquemas.RecursoAtualizar, db: Session = Depends(obter_db)):
    try:
        recurso_atualizado = crud.atualizar_recurso(db=db, recurso_id=recurso_id, recurso=recurso)
        if not recurso_atualizado:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Recurso não encontrado")
        return recurso_atualizado
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))