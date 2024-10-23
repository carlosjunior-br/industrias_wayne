from sqlalchemy.orm import Session
from sqlalchemy import func
from app import modelos, esquemas

# Funções para usuários

def existe_usuarios(db: Session) -> bool:
    return db.query(modelos.Usuario).count() > 0

def obter_usuario(db: Session, usuario_id: int):
    return db.query(modelos.Usuario).filter(modelos.Usuario.id == usuario_id).first()

def obter_usuario_por_nome(nome_usuario: str, db: Session):
    return db.query(modelos.Usuario).filter(modelos.Usuario.nome_usuario == nome_usuario).first()

def obter_usuarios(db: Session):
    return db.query(modelos.Usuario).all()

def criar_usuario(db: Session, usuario: esquemas.UsuarioCriar):
    # Verifica se o nome de usuário já existe
    usuario_existente = obter_usuario_por_nome(usuario.nome_usuario, db)
    if usuario_existente:
        raise ValueError("Nome de usuário já existe.")
    # Cria o novo usuário sem criptografar a senha
    db_usuario = modelos.Usuario(nome_usuario=usuario.nome_usuario, senha=usuario.senha, papel=usuario.papel)
    # Adiciona à sessão e faz commit
    db.add(db_usuario)
    try:
        db.commit()
        db.refresh(db_usuario)
    except Exception as e:
        db.rollback()
        raise RuntimeError(f"Erro ao criar o usuário: {e}")
    return db_usuario

def deletar_usuario(db: Session, usuario_id: int):
    try:
        usuario = obter_usuario(db, usuario_id)
        if usuario:
            db.delete(usuario)
            db.commit()
        else:
            raise ValueError("Usuário não encontrado.")
    except Exception as e:
        db.rollback()
        raise RuntimeError(f"Erro ao excluir usuário: {e}")
    
def atualizar_usuario(db: Session, usuario_id: int, usuario: esquemas.UsuarioAtualizar):
    try:
        db_usuario = obter_usuario(db, usuario_id)
        if not db_usuario:
            return None  # Usuário não encontrado
        # Atualiza os atributos do usuário
        if usuario.nome_usuario:
            db_usuario.nome_usuario = usuario.nome_usuario
        db.commit()
        db.refresh(db_usuario)
        return db_usuario
    except Exception as e:
        db.rollback()
        raise RuntimeError(f"Erro ao atualizar usuário: {e}")

def verificar_nome_usuario_existe(db: Session, nome_usuario: str) -> bool:
    return db.query(modelos.Usuario).filter(func.lower(modelos.Usuario.nome_usuario) == func.lower(nome_usuario)).first() is not None

# Funções para recursos

def obter_recursos(db: Session):
    return db.query(modelos.Recurso).all()

def obter_recurso_por_nome(nome_recurso: str, db: Session):
    return db.query(modelos.Recurso).filter(modelos.Recurso.nome == nome_recurso).first()

def obter_recurso(db: Session, recurso_id: int):
    return db.query(modelos.Recurso).filter(modelos.Recurso.id == recurso_id).first()

def criar_recurso(db: Session, recurso: esquemas.RecursoCriar):
    # Verifica se o recurso com o mesmo nome já existe
    recurso_existente = obter_recurso_por_nome(recurso.nome, db)
    if recurso_existente:
        raise ValueError("Recurso já existe com esse nome.")
    # Cria o novo recurso
    db_recurso = modelos.Recurso(**recurso.model_dump())
    db.add(db_recurso)
    try:
        db.commit()
        db.refresh(db_recurso)
    except Exception as e:
        db.rollback()
        raise RuntimeError(f"Erro ao criar o recurso: {e}")
    return db_recurso
  
def deletar_recurso(db: Session, recurso_id: int):
    try:
        recurso = obter_recurso(db, recurso_id)
        if recurso:
            db.delete(recurso)
            db.commit()
        else:
            raise ValueError("Recurso não encontrado.")
    except Exception as e:
        db.rollback()
        raise RuntimeError(f"Erro ao excluir recurso: {e}")

def verificar_nome_recurso_existe(db: Session, nome: str) -> bool:
    return db.query(modelos.Recurso).filter(func.lower(modelos.Recurso.nome) == func.lower(nome)).first() is not None

def atualizar_recurso(db: Session, recurso_id: int, recurso: esquemas.RecursoAtualizar):
    try:
        db_recurso = obter_recurso(db, recurso_id)
        if not db_recurso:
            return None  # Recurso não encontrado
        # Atualiza todos os atributos do recurso, se fornecidos
        if recurso.nome:
            db_recurso.nome = recurso.nome
        if recurso.descricao:
            db_recurso.descricao = recurso.descricao
        if recurso.tipo:
            db_recurso.tipo = recurso.tipo
        db.commit()
        db.refresh(db_recurso)
        return db_recurso
    except Exception as e:
        db.rollback()
        raise RuntimeError(f"Erro ao atualizar recurso: {e}")

# Funções para registro de acessos

def registrar_acesso(db: Session, usuario_id: int):
    from datetime import datetime
    novo_registro = modelos.RegistroAcesso(usuario_id=usuario_id, data_hora_acesso=datetime.now())
    db.add(novo_registro)
    try:
        db.commit()
        db.refresh(novo_registro)
    except Exception as e:
        db.rollback()
        raise RuntimeError(f"Erro ao registrar o acesso: {e}")
    return novo_registro

def obter_registros_acesso_por_usuario(db: Session, usuario_id: int):
    return db.query(modelos.RegistroAcesso).filter(modelos.RegistroAcesso.usuario_id == usuario_id).all()

def obter_registros_acesso(db: Session):
    return db.query(modelos.RegistroAcesso).all()

def deletar_todos_acessos(db: Session):
    try:
        acessos = db.query(modelos.RegistroAcesso).all()
        if acessos:
            for acesso in acessos:
                db.delete(acesso)
            db.commit()
        else:
            raise ValueError("Nenhum registro de acesso encontrado para excluir.")
    except Exception as e:
        db.rollback()
        raise RuntimeError(f"Erro ao excluir todos os registros de acesso: {e}")