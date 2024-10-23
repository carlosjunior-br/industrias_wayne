from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import select
from .. import crud, esquemas, modelos
from ..banco_dados import obter_db

router = APIRouter()

@router.get("/")
async def ler_registros_acesso(db: Session = Depends(obter_db)):
    # Realizando a consulta
    query = (
        select(modelos.RegistroAcesso, modelos.Usuario.nome_usuario, modelos.Usuario.papel)
        .join(modelos.Usuario, modelos.RegistroAcesso.usuario_id == modelos.Usuario.id)
    )
    results = db.execute(query).all()
    # Formatando a resposta
    acessos = [
        {
            "usuario_id": acesso.id,
            "nome_usuario": nome_usuario,
            "papel": papel,
            "data_hora_acesso": acesso.data_hora_acesso
        }
        for acesso, nome_usuario, papel in results
    ]
    return {"acessos": acessos}

@router.get("/{usuario_id}/acessos/", response_model=list[esquemas.RegistroAcesso])
async def ler_registro_acesso(usuario_id: int, db: Session = Depends(obter_db)):
    registros = crud.obter_registros_acesso_por_usuario(db, usuario_id)
    if registros is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Registros de acesso não encontrados")
    return registros

@router.delete("/", response_model=dict)
async def excluir_registro_acesso(db: Session = Depends(obter_db)):
    try:
        crud.deletar_todos_acessos(db)
        return {"detail": "Todos os registros de acesso foram excluídos com sucesso."}
    except ValueError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhum registro de acesso encontrado para excluir.")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))