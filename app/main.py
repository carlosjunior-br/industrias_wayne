from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, HTMLResponse
from app import modelos
from app.banco_dados import engine
import webbrowser
import uvicorn
import threading
import os
from app.rotas import login, usuarios, usuarios_outras_rotas, recursos, registros_acesso  # Importa as rotas

# Cria as tabelas no banco de dados ao iniciar o servidor
try:
    modelos.Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"Erro ao criar as tabelas no banco de dados: {e}")

app = FastAPI()

# Monta a pasta front-end para servir arquivos estáticos
app.mount("/front-end", StaticFiles(directory="front-end"), name="front-end")

# Endpoint para servir favicon.ico
@app.get("/favicon.ico")
async def favicon():
    return FileResponse("front-end/images/favicon.ico")

# Endpoint para servir documentacao.html
@app.get("/documentacao", response_class=HTMLResponse)
async def get_documentacao():
    file_path = "documentacao.html"
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        return HTMLResponse(content=content)
    else:
        return HTMLResponse(content="<h1>Documentação não encontrada</h1>", status_code=404)

# Configuração de CORS (opcional) e para não usar cache
app.add_middleware(GZipMiddleware)  # Comprime as respostas
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.middleware("http")
async def add_cache_control_header(request: Request, call_next):
    response = await call_next(request)
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response

# Incluindo as rotas
app.include_router(login.router, prefix="/login", tags=["login"])
app.include_router(usuarios.router, prefix="/usuarios", tags=["usuarios"])
app.include_router(usuarios_outras_rotas.router, prefix="/usuarios_outras_rotas", tags=["usuarios_outras_rotas"])
app.include_router(recursos.router, prefix="/recursos", tags=["recursos"])
app.include_router(registros_acesso.router, prefix="/registros_acesso", tags=["registros_acesso"])

def run_server():
    uvicorn.run(app, host="127.0.0.1", port=8000)

if __name__ == "__main__":
    # Inicia o servidor em uma nova thread
    server_thread = threading.Thread(target=run_server)
    server_thread.start()

    # Espera um pequeno tempo para garantir que o servidor esteja iniciado
    import time
    time.sleep(2)  # Ajuste o tempo conforme necessário

    # Abre o navegador
    webbrowser.open('http://127.0.0.1:8000/front-end/index.html')