from pydantic import BaseModel, Field
from typing import Literal, Optional

class UsuarioBase(BaseModel):
    nome_usuario: str = Field(..., max_length=50)  # Limite de 50 caracteres
    papel: Literal['funcionario', 'gerente', 'administrador']  # Definindo os valores permitidos

class UsuarioCriar(UsuarioBase):
    senha: str = Field(..., min_length=8, max_length=12)  # Mínimo de 8 caracteres

class Usuario(UsuarioBase):
    id: int
    class ConfigDict:
      from_attributes = True

class UsuarioAtualizar(BaseModel):
    nome_usuario: Optional[str] = None
    class Config:
        from_attributes = True

class RecursoBase(BaseModel):
    nome: str = Field(..., max_length=100)  # Limite de 100 caracteres
    descricao: str = Field(None, max_length=255)  # Limite de 255 caracteres, opcional
    tipo: Literal['equipamento', 'veiculo', 'dispositivo_seguranca']  # Definindo os valores permitidos

class RecursoCriar(RecursoBase):
    pass

class Recurso(RecursoBase):
    id: int
    class ConfigDict:
      from_attributes = True

class RecursoAtualizar(BaseModel):
    nome: Optional[str] = None
    descricao: Optional[str] = None
    tipo: Optional[str] = None
    class Config:
        from_attributes = True

class RegistroAcessoBase(BaseModel):
    usuario_id: int

class RegistroAcessoCriar(RegistroAcessoBase):
    pass

class RegistroAcesso(RegistroAcessoBase):
    id: int
    class ConfigDict:
      from_attributes = True

class UsuarioLogin(BaseModel):
    nome_usuario: str = Field(..., max_length=50)
    senha: str = Field(..., min_length=8, max_length=100)  # Mínimo de 8 caracteres