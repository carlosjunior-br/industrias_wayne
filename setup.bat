@echo off
echo Iniciando o processo de configuracao...

REM Cria um ambiente virtual
echo Criando um ambiente virtual...
python -m venv venv
if %errorlevel% neq 0 (
    echo Erro ao criar o ambiente virtual. Verifique se o Python está instalado corretamente.
    exit /b 1
) else (
    echo Ambiente virtual criado com sucesso.
)

REM Ativa o ambiente virtual
echo Ativando o ambiente virtual...
call venv\Scripts\activate
if %errorlevel% neq 0 (
    echo Erro ao ativar o ambiente virtual. Verifique se o caminho está correto.
    exit /b 1
) else (
    echo Ambiente virtual ativado.
)

REM Atualiza o pip
echo Atualizando o pip...
python -m pip install --upgrade pip
if %errorlevel% neq 0 (
    echo Erro ao atualizar o pip. Verifique se o Python está instalado corretamente.
    exit /b 1
) else (
    echo pip atualizado com sucesso.
)

REM Instala as dependências do requirements.txt
if exist requirements.txt (
    echo Instalando dependencias do requirements.txt...
    pip install -r requirements.txt
    if %errorlevel% neq 0 (
        echo Erro ao instalar as dependencias. Verifique o arquivo requirements.txt e tente novamente.
        exit /b 1
    ) else (
        echo Dependencias instaladas com sucesso.
    )
) else (
    echo Arquivo requirements.txt nao encontrado. Certifique-se de que ele esta no diretorio atual.
)

echo Processo de configuracao concluido com sucesso!
pause