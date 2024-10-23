import random
from datetime import datetime, timedelta
from app.banco_dados import obter_db, Base
from app import modelos

# Função para cadastrar usuários no banco de dados
def cadastrar_usuarios(db):
    usuarios = [
        {"nome_usuario": "Batman", "senha": "12345678", "papel": "administrador"},
        {"nome_usuario": "Alfred", "senha": "12345678", "papel": "administrador"},
        {"nome_usuario": "Lucius", "senha": "12345678", "papel": "administrador"},
        {"nome_usuario": "Barbara_Gordon", "senha": "12345678", "papel": "gerente"},
        {"nome_usuario": "Robin", "senha": "12345678", "papel": "gerente"},
        {"nome_usuario": "Jason_Todd", "senha": "12345678", "papel": "gerente"},
        {"nome_usuario": "Selina_Kyle", "senha": "12345678", "papel": "funcionario"},
        {"nome_usuario": "Tim_Drake", "senha": "12345678", "papel": "funcionario"},
        {"nome_usuario": "Leslie_Thompkins", "senha": "12345678", "papel": "funcionario"},
        {"nome_usuario": "Coringa", "senha": "12345678", "papel": "funcionario"},
    ]

    for usuario in usuarios:
        novo_usuario = modelos.Usuario(
            nome_usuario=usuario["nome_usuario"],
            senha=usuario["senha"],
            papel=usuario["papel"]
        )
        db.add(novo_usuario)
        print(f"Usuário '{usuario['nome_usuario']}' cadastrado com sucesso!")

# Função para cadastrar recursos no banco de dados
def cadastrar_recursos(db):
    recursos = [
        {"nome": "Batsuit", "tipo": "equipamento", "descricao": "Traje de combate do Batman."},
        {"nome": "Batcomputador", "tipo": "equipamento", "descricao": "Computador avançado para análise de dados e monitoramento."},
        {"nome": "Gancho de Escalada", "tipo": "equipamento", "descricao": "Ferramenta de escalada e transporte."},
        {"nome": "Bat-sinal", "tipo": "equipamento", "descricao": "Sinalizador para chamar o Batman em emergências."},
        {"nome": "Dispositivo EMP", "tipo": "equipamento", "descricao": "Dispositivo para desativar eletrônicos temporariamente."},
        {"nome": "Óculos de Visão Noturna", "tipo": "equipamento", "descricao": "Óculos de visão noturna."},
        {"nome": "Pelotas de Fumaça", "tipo": "equipamento", "descricao": "Pelotas de fumaça para evasão."},
        {"nome": "Dispositivo de Rastreamento", "tipo": "equipamento", "descricao": "Dispositivo de rastreamento para localizar pessoas ou objetos."},
        {"nome": "Kit Forense", "tipo": "equipamento", "descricao": "Conjunto de ferramentas para análise forense."},
        {"nome": "Batmoto", "tipo": "veiculo", "descricao": "Motocicleta de alta velocidade do Batman."},
        {"nome": "Batwing", "tipo": "veiculo", "descricao": "Aeronave de combate e vigilância."},
        {"nome": "Batmóvel", "tipo": "veiculo", "descricao": "Veículo icônico do Batman equipado com tecnologia avançada."},
        {"nome": "Tumbler", "tipo": "veiculo", "descricao": "Veículo todo-terreno blindado."},
        {"nome": "Batlancha", "tipo": "veiculo", "descricao": "Embarcação para operações aquáticas."},
        {"nome": "Câmeras de Vigilância", "tipo": "dispositivo_seguranca", "descricao": "Sistema de monitoramento em tempo real."},
        {"nome": "Alarmes de Intrusão", "tipo": "dispositivo_seguranca", "descricao": "Sistemas de alerta para acessos não autorizados."},
        {"nome": "Sensores de Movimento", "tipo": "dispositivo_seguranca", "descricao": "Dispositivos que detectam movimento em áreas restritas."},
        {"nome": "Cartões de Acesso", "tipo": "dispositivo_seguranca", "descricao": "Cartões magnéticos para controle de entrada."},
        {"nome": "Portões Automáticos", "tipo": "dispositivo_seguranca", "descricao": "Portões que se abrem mediante autorização."},
        {"nome": "Iluminação de Segurança", "tipo": "dispositivo_seguranca", "descricao": "Sistemas de iluminação que ativam à noite."},
        {"nome": "Controle de Acesso Biométrico", "tipo": "dispositivo_seguranca", "descricao": "Sistemas que utilizam impressão digital ou reconhecimento facial."},
        {"nome": "Dispositivos de Comunicações Seguras", "tipo": "dispositivo_seguranca", "descricao": "Equipamentos para comunicação entre a equipe de segurança."},
    ]

    for recurso in recursos:
        novo_recurso = modelos.Recurso(
            nome=recurso["nome"],
            tipo=recurso["tipo"],
            descricao=recurso["descricao"]
        )
        db.add(novo_recurso)
        print(f"Recurso '{recurso['nome']}' cadastrado com sucesso!")

# Função para cadastrar registros de acesso no banco de dados
def cadastrar_acessos(db):
    usuarios_ids = range(1, 11)  # IDs de usuários de 1 a 10
    registros = []

    # Calcular a data de um ano atrás e um dia antes da data atual
    data_atual = datetime.now()
    data_futura = data_atual - timedelta(days=1)  # Um dia antes da data atual
    data_passada = data_atual - timedelta(days=365)  # Um ano atrás

    for usuario_id in usuarios_ids:
        for _ in range(20):  # Adicionar 20 registros para cada usuário
            # Gerar uma data aleatória no intervalo especificado
            data_aleatoria = data_passada + (data_futura - data_passada) * random.random()

            # Criar o registro de acesso
            novo_registro = modelos.RegistroAcesso(usuario_id=usuario_id, data_hora_acesso=data_aleatoria)
            registros.append(novo_registro)
            print(f"Registro de acesso para o usuário ID '{usuario_id}' cadastrado com sucesso!")

    # Adicionar todos os registros à sessão de banco de dados
    db.add_all(registros)

# Executar o script
if __name__ == "__main__":
    db = next(obter_db())
    try:
        # Criar as tabelas no banco de dados se não existirem
        Base.metadata.create_all(db.bind)

        print("Iniciando o cadastro de usuários...")
        cadastrar_usuarios(db)

        print("\nIniciando o cadastro de recursos...")
        cadastrar_recursos(db)

        print("\nIniciando o cadastro de registros de acesso...")
        cadastrar_acessos(db)

        db.commit()
        print("\nTodos os cadastros realizados com sucesso!")

    except Exception as e:
        db.rollback()
        print(f"Ocorreu um erro: {e}")

    finally:
        db.close()