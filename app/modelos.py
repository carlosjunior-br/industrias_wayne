from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from app.banco_dados import Base

class Usuario(Base):
    __tablename__ = 'usuarios'
    
    id = Column(Integer, primary_key=True, index=True)
    nome_usuario = Column(String(50), unique=True, index=True, nullable=False)
    senha = Column(String(100), nullable=False)
    papel = Column(String(20), nullable=False)  # funcionario, gerente, administrador

    registros_acesso = relationship("RegistroAcesso", back_populates="usuario", cascade="all, delete-orphan")

class Recurso(Base):
    __tablename__ = 'recursos'
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), index=True, nullable=False)
    descricao = Column(String(250))
    tipo = Column(String(30), nullable=False)  # equipamento, veiculo, dispositivo de seguranca

class RegistroAcesso(Base):
    __tablename__ = 'registros_acesso'
    
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey('usuarios.id'), nullable=False)
    data_hora_acesso = Column(DateTime, nullable=False)

    usuario = relationship("Usuario", back_populates="registros_acesso")