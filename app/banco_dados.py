import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

# Pegando a URL do banco de dados de uma variável de ambiente, com fallback para SQLite
URL_BANCO_DADOS = os.getenv("DATABASE_URL", "sqlite:///./industrias_wayne.db")

# Habilitar log de SQL em ambiente de desenvolvimento (opcional)
engine = create_engine(
    URL_BANCO_DADOS, 
    connect_args={"check_same_thread": False} if "sqlite" in URL_BANCO_DADOS else {},
    echo=True if os.getenv("DEBUG") == "1" else False  # Log SQL se DEBUG for 1
)

SessaoLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependência para obter a sessão do banco de dados
def obter_db():
    db = SessaoLocal()
    try:
        yield db
    except Exception as e:
        print(f"Erro durante a sessão do banco de dados: {e}")
        raise
    finally:
        db.close()