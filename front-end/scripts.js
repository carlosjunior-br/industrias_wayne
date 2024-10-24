function loadPage() {
    // Placeholder para as futuras funções que sejam necessárias executar antes de todos escutadores

}

function initialize() {
    loadPage()
    // Escutadores e funções aqui
    const urlApi = "http://127.0.0.1:8000"
    // Array com os nomes das imagens de fundo
    const backgrounds = [
        './images/plano-de-fundo-01.jpg',
        './images/plano-de-fundo-02.jpg',
        './images/plano-de-fundo-03.jpg',
        './images/plano-de-fundo-04.jpg'
    ]
    let logadoEmIndustriasWayne = false
    let papelUsuarioLogado = ''
    let textoPadraoTituloDeAcordoComLogin = 'Realize login para ter acesso às funcionalidades.'
    const tituloDeAcordoComLogin = document.getElementById('titulo-de-acordo-com-login')
    tituloDeAcordoComLogin.innerText = textoPadraoTituloDeAcordoComLogin
    const homeDiv = document.getElementById('home')
    const login = document.getElementById('login')
    const cadastroAdmin = document.getElementById('cadastro-admin')
    const gestaoUsuarios = document.getElementById('gestao-usuarios')
    const gestaoRecursos = document.getElementById('gestao-recursos')
    const dashboard = document.getElementById('dashboard')
    const botaoEtextoAdmin = document.getElementById('botao-e-texto-admin')
    const btnExcluirAcessos = document.getElementById('btn-excluir-acessos')
    const formLogin = document.getElementById('form-login')
    const formCadastroAdmin = document.getElementById('form-cadastro-admin')
    const formUsuario = document.getElementById('form-usuario')
    const formEditarUsuario = document.getElementById('form-editar-usuario')
    const formRecurso = document.getElementById('form-recurso')
    const formEditarRecurso = document.getElementById('form-editar-recurso')
    const nomeUsuarioAdmin = document.getElementById('nome-usuario-admin')
    const senhaAdmin = document.getElementById('senha-admin')
    const nomeUsuario = document.getElementById('nome-usuario')
    const senha = document.getElementById('senha')
    const nomeUsuarioNovo = document.getElementById('nome-usuario-novo')
    const senhaNova = document.getElementById('senha-nova')
    const papelUsuario = document.getElementById('papel')
    const nomeEditadoUsuario = document.getElementById('nome-editado-usuario')
    const nomeEditadoRecurso = document.getElementById('nome-editado-recurso')
    const descricaoEditadaRecurso = document.getElementById('descricao-editada-recurso')
    const tipoEditadoRecurso = document.getElementById('tipo-editado-recurso')
    const listaUsuarios = document.getElementById('lista-usuarios')
    const nomeRecurso = document.getElementById('nome-recurso')
    const descricaoRecurso = document.getElementById('descricao-recurso')
    const tipoRecurso = document.getElementById('tipo-recurso')
    const listaRecursos = document.getElementById('lista-recursos')
    const visualizacaoUsuarios = document.getElementById('visualizacao-usuarios')
    const visualizacaoRecursos = document.getElementById('visualizacao-recursos')
    const visualizacaoRegistros = document.getElementById('visualizacao-registros')
    const navbar = document.getElementById('navbar')
    const botaoConfirmarExclusao = document.getElementById('botao-confirmar-exclusao')
    let usuarioIdParaExcluir
    let recursoIdParaExcluir
    let excluirRegistrosAcesso = false
    let usuarioIdParaEditar = null
    let recursoIdParaEditar = null
    
    // Função para verificar se o usuário está logado no sistema
    function verificarLogin() {
        return logadoEmIndustriasWayne
    }
    
    // Função para retornar o papel do usuário formatado
    function formatarPapelUsuario(papel) {
        const papeis = {
            "funcionario": "Funcionário",
            "gerente": "Gerente",
            "administrador": "Administrador"
        }
        return papeis[papel]
    }

    // Função para retornar o tipo de recurso formatado
    function formatarTipoRecurso(tipo) {
        const tipos = {
            "equipamento": "Equipamento",
            "veiculo": "Veículo",
            "dispositivo_seguranca": "Dispositivo de segurança"
        }
        return tipos[tipo]
    }
    
    // Exibe as seções corretas com base no estado de login
    function exibirSecoesComBaseNoLogin() {
        navbar.innerHTML = ''
        login.style.display = 'none'
        cadastroAdmin.style.display = 'none'
        gestaoUsuarios.style.display = 'none'
        gestaoRecursos.style.display = 'none'
        dashboard.style.display = 'none'
        botaoEtextoAdmin.style.display = 'none'
        if (verificarLogin()) {
            navbar.innerHTML += '<li><button type="button" id="logout-button">Logout</button></li>'
            switch (papelUsuarioLogado) {
                case 'administrador':
                    navbar.innerHTML += '<li><a href="#gestao-usuarios">Gestão de Usuários</a></li>'
                    navbar.innerHTML += '<li><a href="#gestao-recursos">Gestão de Recursos</a></li>'
                    navbar.innerHTML += '<li><a href="#dashboard">Dashboard</a></li>'
                    gestaoUsuarios.style.display = 'block'
                    gestaoRecursos.style.display = 'block'
                    dashboard.style.display = 'block'
                    botaoEtextoAdmin.style.display = 'block'
                    carregarUsuarios()
                    carregarRecursos()
                    carregarUsuariosParaDashboard()
                    carregarRecursosParaDashboard()
                    carregarRegistrosDeAcessoParaDashboard()
                    // Carregar dados de registros de acesso para gráfico
                    carregarUsuariosParaFiltro()
                    carregarDadosParaGraficoRegistrosDeAcesso()
                    break
                case 'gerente':
                    navbar.innerHTML += '<li><a href="#gestao-recursos">Gestão de Recursos</a></li>'
                    navbar.innerHTML += '<li><a href="#dashboard">Dashboard</a></li>'
                    gestaoRecursos.style.display = 'block'
                    dashboard.style.display = 'block'
                    carregarRecursos()
                    carregarUsuariosParaDashboard()
                    carregarRecursosParaDashboard()
                    carregarRegistrosDeAcessoParaDashboard()
                    // Carregar dados de registros de acesso para gráfico
                    carregarUsuariosParaFiltro()
                    carregarDadosParaGraficoRegistrosDeAcesso()
                    break
                case 'funcionario':
                    navbar.innerHTML += '<li><a href="#dashboard">Dashboard</a></li>'
                    dashboard.style.display = 'block'
                    carregarUsuariosParaDashboard()
                    carregarRecursosParaDashboard()
                    carregarRegistrosDeAcessoParaDashboard()
                    // Carregar dados de registros de acesso para gráfico
                    carregarUsuariosParaFiltro()
                    carregarDadosParaGraficoRegistrosDeAcesso()
                    break
                default:
                    console.error('Papel de usuário desconhecido:', papelUsuarioLogado)
                    break
            }
        } else {
            verificar_se_existe_usuario()
        }
    }

    // Função que verifica se existe um usuário cadastrado
    async function verificar_se_existe_usuario() {
        try {
            const response = await fetch(`${urlApi}/usuarios_outras_rotas/verificar/`)
            if (response.ok) {
                const existeUsuarios = await response.json()
                if (!existeUsuarios) {
                    // Se não houver usuários, exibe o formulário de cadastro do administrador
                    cadastroAdmin.style.display = 'block'
                    navbar.innerHTML += '<li><a href="#cadastro-admin">Cadastro de administrador</a></li>'
                    alerta('Primeiro acesso ao sistema! Não existe nenhum usuário cadastrado. É necessário efetuar o cadastro de um administrador.')
                } else {
                    // Se houver usuários, exibe a seção de login
                    login.style.display = 'block'
                    navbar.innerHTML += '<li><a href="#login">Login</a></li>'
                }
            } else {
                console.error('Erro ao verificar usuários:', response.statusText)
            }
        } catch (error) {
            console.error('Erro ao acessar a API:', error)
        }
    }
    // Função para cadastrar usuário administrador
    async function cadastrarAdministrador(event) {
        event.preventDefault()
        try {
            // Validação de nome de usuário
            if (!validarNomeUsuario(nomeUsuarioAdmin.value)) {
                throw new Error('O nome de usuário não pode conter espaços ou caracteres especiais.')
            }
            if (!validarNomeTamanho(nomeUsuarioAdmin.value)) {
                throw new Error('O nome de usuário deve ter ao menos 3 caracteres.')
            }
            if (!senhaAdmin.value) {
                throw new Error('A senha não pode estar vazia.')
            }
            if (senhaAdmin.value.length < 8 || senhaAdmin.value.length > 12) {
                throw new Error('A senha deve ter entre 8 e 12 caracteres.')
            }
            // Verificar se o nome de usuário já existe
            const nomeUsuarioTrim = nomeUsuarioAdmin.value.trim()
            const nomeUsuarioJaExiste = await verificarNomeUsuario(nomeUsuarioTrim)
            if (nomeUsuarioJaExiste) {
                throw new Error('Não foi possível cadastrar usuário! O nome informado já existe.')
            }
            const novoUsuario = {
                nome_usuario: nomeUsuarioAdmin.value,
                senha: senhaAdmin.value,
                papel: 'administrador'
            }
            const response = await fetch(`${urlApi}/usuarios_outras_rotas/cadastrar-admin/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoUsuario)
            })
            if (response.ok) {
                alerta('Administrador cadastrado com sucesso!')
                formCadastroAdmin.reset()
                cadastroAdmin.style.display = 'none'
                login.style.display = 'block'
                navbar.innerHTML = '<li><a href="#login">Login</a></li>'
                rolarPraCima()
            } else {
                const errorDetail = await response.json()
                alerta(`Erro ao cadastrar: ${JSON.stringify(errorDetail)}`, function() {
                    nomeUsuarioAdmin.focus()
                })
            }
        } catch (error) {
            console.error('Erro ao cadastrar administrador:', error)
            alerta(error.message || 'Ocorreu um erro ao tentar cadastrar o administrador. Tente novamente.', function() {
                nomeUsuarioAdmin.focus()
            })
        }
    }
    
    // Função para cadastrar usuários
    async function verificarNomeUsuario(nomeUsuario) {
        const response = await fetch(`${urlApi}/usuarios/verificar/${nomeUsuario}`)
        if (!response.ok) {
            throw new Error('Erro ao verificar nome de usuário.')
        }
        return response.json()
    }
    async function cadastrarUsuario(event) {
        event.preventDefault()
        try {
            // Validação de nome de usuário
            if (!validarNomeUsuario(nomeUsuarioNovo.value)) {
                throw new Error('O nome de usuário não pode conter espaços ou caracteres especiais.')
            }
            if (!validarNomeTamanho(nomeUsuarioNovo.value)) {
                throw new Error('O nome de usuário deve ter ao menos 3 caracteres.')
            }    
            // Validação de senha
            if (!senhaNova.value) {
                throw new Error('A senha não pode estar vazia.')
            }
            if (senhaNova.value.length < 8 || senhaNova.value.length > 12) {
                throw new Error('A senha deve ter entre 8 e 12 caracteres.')
            }
            // Verificar se o nome de usuário já existe
            const nomeUsuarioTrim = nomeUsuarioNovo.value.trim()
            const nomeUsuarioJaExiste = await verificarNomeUsuario(nomeUsuarioTrim)
            if (nomeUsuarioJaExiste) {
                throw new Error('Não foi possível cadastrar usuário! O nome informado já existe.')
            }
            // Criar novo usuário
            const novoUsuario = {
                nome_usuario: nomeUsuarioNovo.value,
                senha: senhaNova.value,
                papel: papelUsuario.value
            }
            const response = await fetch(`${urlApi}/usuarios/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoUsuario)
            })

            if (response.ok) {
                alerta('Usuário cadastrado com sucesso!')
                formUsuario.reset()
                carregarUsuarios()
                carregarUsuariosParaDashboard()
            } else {
                const errorDetail = await response.json()
                alerta(`Erro ao cadastrar: ${JSON.stringify(errorDetail)}`, function() {
                    nomeUsuarioNovo.focus()
                })
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error)
            alerta(error.message || 'Ocorreu um erro ao tentar cadastrar o usuário. Tente novamente.', function() {
                nomeUsuarioNovo.focus()
            })
        }
    }
    
    // Funções para excluir usuário
    function confirmarExclusaoUsuario(usuarioId) {
        usuarioIdParaExcluir = usuarioId
        var modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'), {
            backdrop: 'static'
        })
        modal.show()
    }
    async function excluirUsuario(usuarioId) {
        try {
            const response = await fetch(`${urlApi}/usuarios/${usuarioId}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                alerta('Usuário excluído com sucesso!')
                carregarUsuarios()
                carregarUsuariosParaDashboard()
            } else {
                const errorDetail = await response.json()
                alerta(`Erro ao excluir: ${JSON.stringify(errorDetail)}`)
            }
        } catch (error) {
            console.error('Erro ao excluir usuário:', error)
            alerta('Ocorreu um erro ao tentar excluir o usuário. Tente novamente.')
        }
    }
    
    // Função para carregar lista de usuários no html
    async function carregarUsuarios() {
        try {
            const response = await fetch(`${urlApi}/usuarios/`)
            const usuarios = await response.json()
            carregarUsuariosNoHtml(usuarios)
        } catch (error) {
            console.error('Ocorreu um erro ao carregar lista de usuários.')
        }
    }

    // Função para listar usuários no html
    function carregarUsuariosNoHtml(listaDeUsuarios) {
        try {
            listaUsuarios.innerHTML = ''
            listaUsuarios.classList.add('container-fluid')
            listaUsuarios.style.display = 'flex'
            listaUsuarios.style.flexDirection = 'column'
            listaUsuarios.style.alignItems = 'center'
            listaDeUsuarios.forEach(usuario => {
                const row = document.createElement('div')
                row.classList.add('row', 'align-items-center', 'mb-3', 'w-100', 'usuario-container')
                const nomeCol = document.createElement('div')
                nomeCol.classList.add('col', 'col-30')
                nomeCol.style.width = '30%'
                nomeCol.innerText = usuario.nome_usuario
                const papelCol = document.createElement('div')
                papelCol.classList.add('col', 'col-50')
                papelCol.style.width = '50%'
                papelCol.innerHTML = `<strong>Papel:</strong> ${formatarPapelUsuario(usuario.papel)}`
                const excluirCol = document.createElement('div')
                excluirCol.classList.add('col', 'col-10')
                excluirCol.style.width = '10%'
                const excluirButton = document.createElement('button')
                excluirButton.classList.add('btn', 'btn-danger', 'btn-sm', 'w-100')
                excluirButton.innerText = 'Excluir'
                excluirButton.addEventListener('click', function() {
                    confirmarExclusaoUsuario(usuario.id)
                })
                excluirCol.appendChild(excluirButton)
                const editarCol = document.createElement('div')
                editarCol.classList.add('col', 'col-10')
                editarCol.style.width = '10%'
                const editarButton = document.createElement('button')
                editarButton.classList.add('btn', 'btn-primary', 'btn-sm', 'w-100')
                editarButton.innerText = 'Editar'
                editarButton.addEventListener('click', function() {
                    editarUsuarioNoHtml(usuario.id)
                })
                editarCol.appendChild(editarButton)
                // Adicionando as colunas à linha
                row.appendChild(nomeCol)
                row.appendChild(papelCol)
                row.appendChild(excluirCol)
                row.appendChild(editarCol)
                // Adicionando a linha ao container
                listaUsuarios.appendChild(row)
            })
        } catch (error) {
            console.error('Ocorreu um erro ao renderizar usuários.')
        }
    }
    
    // Função para editar usuário
    async function editarUsuarioNoHtml(id) {
        try {
            const response = await fetch(`${urlApi}/usuarios/${id}`)
            const usuario = await response.json()
            usuarioIdParaEditar = id
            // Abrir o modal de edição
            var modal = new bootstrap.Modal(document.getElementById('editUsuarioModal'), {
                backdrop: 'static'
            })
            modal.show()
            nomeEditadoUsuario.value = usuario.nome_usuario
            nomeEditadoUsuario.focus()
        } catch (error) {
            console.error(`Ocorreu um erro ao editar usuário no html. ${error.message}`)
        }
    }
    async function editarUsuario(event) {
        event.preventDefault()
        try {
            // Validação de nome de usuário
            if (!validarNomeUsuario(nomeEditadoUsuario.value)) {
                throw new Error('O nome de usuário não pode conter espaços ou caracteres especiais.')
            }
            if (!validarNomeTamanho(nomeEditadoUsuario.value)) {
                throw new Error('O nome de usuário deve ter ao menos 3 caracteres.')
            }
			// Verificar se o nome de usuário já existe
            const nomeUsuarioTrim = nomeEditadoUsuario.value.trim()
            const nomeUsuarioJaExiste = await verificarNomeUsuario(nomeUsuarioTrim)
            if (nomeUsuarioJaExiste) {
                throw new Error('Não foi possível editar usuário! O nome informado já existe.')
            }
            const usuarioAtualizado = {
                nome_usuario: nomeEditadoUsuario.value
            }
            const response = await fetch(`${urlApi}/usuarios/${usuarioIdParaEditar}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioAtualizado)
            })
            if (response.ok) {
                // Fechar modal da edição após edição
                var modal = bootstrap.Modal.getInstance(document.getElementById('editUsuarioModal'))
                if (modal) {
                    modal.hide()
                }
                alerta('Usuário editado com sucesso!')
                formEditarUsuario.reset()
                carregarUsuarios()
                carregarUsuariosParaDashboard()
            } else {
                const errorDetail = await response.json()
                alerta(`Erro ao editar: ${JSON.stringify(errorDetail)}`, function() {
                    nomeEditadoUsuario.focus()
                })
            }
        } catch (error) {
            console.error('Erro ao editar usuário:', error)
            alerta(error.message || 'Ocorreu um erro ao tentar editar o usuário. Tente novamente.', function() {
                nomeEditadoUsuario.focus()
            })
        }
    }

    // Função para carregar usuários para o filtro dos gráficos
    async function carregarUsuariosParaFiltro() {
        try {
            const response = await fetch(`${urlApi}/usuarios/`)
            const usuarios = await response.json()
            const usuarioFiltro = document.getElementById('usuarioFiltro')
            usuarios.forEach(usuario => {
                const option = document.createElement('option')
                option.value = usuario.nome_usuario
                option.textContent = usuario.nome_usuario
                usuarioFiltro.appendChild(option)
            })
        } catch (error) {
            console.error('Erro ao carregar usuários para filtro:', error)
        }
    }

    // Função para cadastrar recursos
    async function verificarNomeRecurso(nomeRecurso) {
        const response = await fetch(`${urlApi}/recursos/verificar/${nomeRecurso}`)
        if (!response.ok) {
            throw new Error('Erro ao verificar nome do recurso.')
        }
        return response.json()
    }
    async function cadastrarRecurso(event) {
        event.preventDefault()
        try {
            // Validação de nome do recurso
            if (!validarNomeTamanho(nomeRecurso.value)) {
                throw new Error('O nome do recurso deve ter ao menos 3 caracteres.')
            }
            // Verificar se o nome do recurso já existe
            const nomeRecursoTrim = nomeRecurso.value.trim()
            const nomeRecursoJaExiste = await verificarNomeRecurso(nomeRecursoTrim)
            if (nomeRecursoJaExiste) {
                throw new Error('Não foi possível cadastrar recurso! O nome informado já existe.')
            }
            // Criar novo recurso
            const novoRecurso = {
                nome: nomeRecurso.value,
                descricao: descricaoRecurso.value,
                tipo: tipoRecurso.value
            }
            const response = await fetch(`${urlApi}/recursos/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoRecurso)
            })
            if (response.ok) {
                alerta('Recurso cadastrado com sucesso!')
                formRecurso.reset()
                carregarRecursos()
                carregarRecursosParaDashboard()
            } else {
                const errorDetail = await response.json()
                alerta(`Erro ao cadastrar: ${JSON.stringify(errorDetail)}`, function() {
                    nomeRecurso.focus()
                })
            }
        } catch (error) {
            console.error('Erro ao cadastrar recurso:', error)
            alerta(error.message || 'Ocorreu um erro ao tentar cadastrar o recurso. Tente novamente.', function() {
                nomeRecurso.focus()
            })
        }
    }

    // Funções para excluir recurso
    function confirmarExclusaoRecurso(recursoId) {
        recursoIdParaExcluir = recursoId
        var modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'), {
            backdrop: 'static'
        })
        modal.show()
    }
    async function excluirRecurso(recursoId) {
        try {
            const response = await fetch(`${urlApi}/recursos/${recursoId}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                alerta('Recurso excluído com sucesso!')
                carregarRecursos()
                carregarRecursosParaDashboard()
            } else {
                const errorDetail = await response.json()
                alerta(`Erro ao excluir: ${JSON.stringify(errorDetail)}`)
            }
        } catch (error) {
            console.error('Erro ao excluir recurso:', error)
            alerta('Ocorreu um erro ao tentar excluir o recurso. Tente novamente.')
        }
    }

    // Função para carregar lista de recursos
    async function carregarRecursos() {
        try {
            const response = await fetch(`${urlApi}/recursos/`)
            const recursos = await response.json()
            carregarRecursosNoHtml(recursos)
        } catch (error) {
            console.error('Ocorreu um erro ao carregar lista de recursos.')
        }
    }

    // Função para listar recursos no html
    function carregarRecursosNoHtml(listaDeRecursos) {
        try {
            listaRecursos.innerHTML = ''
            listaRecursos.classList.add('card-container')
            listaDeRecursos.forEach(recurso => {
                const col = document.createElement('div')
                col.classList.add('col-md-4', 'mb-4')
        
                const card = document.createElement('div')
                card.classList.add('card', 'card-recurso')
           
                const cardBody = document.createElement('div')
                cardBody.classList.add('card-body')
        
                const cardTitle = document.createElement('h5')
                cardTitle.classList.add('card-title')
                cardTitle.innerText = recurso.nome
        
                const cardText = document.createElement('p')
                cardText.classList.add('card-text')
                cardText.innerText = recurso.descricao

                const cardText2 = document.createElement('p')
                cardText2.classList.add('card-text')
                cardText2.innerHTML = `<strong>Tipo:</strong> ${formatarTipoRecurso(recurso.tipo)}`
        
                const buttonGroup = document.createElement('div')
                buttonGroup.classList.add('button-group', 'card-footer', 'd-flex', 'justify-content-around')
                
                const excluirButton = document.createElement('button')
                excluirButton.classList.add('btn', 'btn-danger', 'btn-sm', 'm-1')
                excluirButton.innerText = 'Excluir'
                excluirButton.addEventListener('click', function() {
                    confirmarExclusaoRecurso(recurso.id)
                })
                const editarButton = document.createElement('button')
                editarButton.classList.add('btn', 'btn-primary', 'btn-sm', 'm-1')
                editarButton.innerText = 'Editar'
                editarButton.addEventListener('click', function() {
                    editarRecursoNoHtml(recurso.id)
                })
                buttonGroup.appendChild(excluirButton)
                buttonGroup.appendChild(editarButton)
    
                cardBody.appendChild(cardTitle)
                cardBody.appendChild(cardText)
                cardBody.appendChild(cardText2)
                card.appendChild(cardBody)
                card.appendChild(buttonGroup)
                col.appendChild(card)
                listaRecursos.appendChild(col)
            })
        } catch (error) {
            console.error('Ocorreu um erro ao renderizar recursos.')
        }
    }

    // Função para editar recurso
    async function editarRecursoNoHtml(id) {
        try {
            const response = await fetch(`${urlApi}/recursos/${id}`)
            const recurso = await response.json()
            recursoIdParaEditar = id
            // Abrir o modal de edição
            var modal = new bootstrap.Modal(document.getElementById('editRecursoModal'), {
                backdrop: 'static'
            })
            modal.show()
            document.getElementById('nome-editado-recurso').value = recurso.nome
            document.getElementById('descricao-editada-recurso').value = recurso.descricao
            document.getElementById('tipo-editado-recurso').value = recurso.tipo
            document.getElementById('nome-editado-recurso').focus()
        } catch (error) {
            console.error(`Ocorreu um erro ao editar recurso no html. ${error.message}`)
        }
    }
    async function editarRecurso(event) {
        event.preventDefault()
        try {
            // Validação de nome do recurso
            if (!validarNomeTamanho(nomeEditadoRecurso.value)) {
                throw new Error('O nome do recurso deve ter ao menos 3 caracteres.')
            }
			// Verificar se o nome do recurso já existe
            const nomeRecursoTrim = nomeEditadoRecurso.value.trim()
            const nomeRecursoJaExiste = await verificarNomeRecurso(nomeRecursoTrim)
            if (nomeRecursoJaExiste) {
                throw new Error('Não foi possível editar recurso! O nome informado já existe.')
            }
            const recursoAtualizado = {
                nome: nomeEditadoRecurso.value,
                descricao: descricaoEditadaRecurso.value,
                tipo: tipoEditadoRecurso.value
            }
            const response = await fetch(`${urlApi}/recursos/${recursoIdParaEditar}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recursoAtualizado)
            })
            if (response.ok) {
                // Fechar modal da edição após edição
                var modal = bootstrap.Modal.getInstance(document.getElementById('editRecursoModal'))
                if (modal) {
                    modal.hide()
                }
                alerta('Recurso editado com sucesso!')
                formEditarRecurso.reset()
                carregarRecursos()
                carregarRecursosParaDashboard()
            } else {
                const errorDetail = await response.json()
                alerta(`Erro ao editar: ${JSON.stringify(errorDetail)}`, function() {
                    nomeEditadoRecurso.focus()
                })
            }
        } catch (error) {
            console.error('Erro ao editar usuário:', error)
            alerta(error.message || 'Ocorreu um erro ao tentar editar o recurso. Tente novamente.', function() {
                nomeEditadoRecurso.focus()
            })
        }
    }

    // Funções para carregar o Dashboard
    
    // Função para carregar lista de registros de acesso para Dashboard
    async function carregarRegistrosDeAcessoParaDashboard() {
        try {
            const response = await fetch(`${urlApi}/registros_acesso/`)
            const { acessos } = await response.json()
            carregarRegistrosDeAcessoNoDashboard(acessos)
        } catch (error) {
            console.error('Ocorreu um erro ao carregar lista de registros de acesso.')
        }
    }

    // Funções para excluir registros de acesso
    function confirmarExclusaoRegistrosDeAcesso() {
        excluirRegistrosAcesso = true
        var modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'), {
            backdrop: 'static'
        })
        modal.show()
    }
    async function excluirRegistrosDeAcesso() {
        try {
            const response = await fetch(`${urlApi}/registros_acesso/`, {
                method: 'DELETE',
            })
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.detail || 'Erro ao excluir registros de acesso.')
            }
            alerta('Todos os registros de acesso foram excluídos com sucesso.')
            carregarRegistrosDeAcessoParaDashboard()
            // Carregar dados de registros de acesso para gráfico
            carregarUsuariosParaFiltro()
            carregarDadosParaGraficoRegistrosDeAcesso()
        } catch (error) {
            console.error('Ocorreu um erro ao excluir registros de acesso:', error.message)
            alerta(error.message)
        }
    }

    // Função para listar registros de acesso no Dashboard
    function carregarRegistrosDeAcessoNoDashboard(listaDeRegistros) {
        try {
            visualizacaoRegistros.innerHTML = ''
    
            const tabela = document.createElement('table')
            tabela.id = 'tabelaRegistros'
            tabela.classList.add('display')
    
            const thead = document.createElement('thead')
            thead.innerHTML = `
                <tr>
                    <th>Nome do Usuário</th>
                    <th>Papel do usuário</th>
                    <th>Data e Hora do Acesso</th>
                </tr>
            `
            tabela.appendChild(thead)
    
            const tbody = document.createElement('tbody')
            listaDeRegistros.forEach(registro => {
                const linha = document.createElement('tr')
    
                const colunaUsuario = document.createElement('td')
                colunaUsuario.innerText = registro.nome_usuario
                linha.appendChild(colunaUsuario)
    
                const colunaPapel = document.createElement('td')
                colunaPapel.innerText = formatarPapelUsuario(registro.papel)
                linha.appendChild(colunaPapel)

                const colunaDataHora = document.createElement('td')
                const dataHoraISO = new Date(registro.data_hora_acesso)
                const dataHoraFormatada = dataHoraISO.toLocaleString('pt-BR', {
                    timeZone: 'America/Sao_Paulo',
                    hour12: false,
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }).replace(',', '')
                const [data, hora] = dataHoraFormatada.split(' ')
                const [horas, minutos, segundos] = hora.split(':')
                colunaDataHora.innerText = `${data} - ${horas}h${minutos}min:${segundos}seg`
                colunaDataHora.setAttribute('data-order', dataHoraISO)
                linha.appendChild(colunaDataHora)
    
                tbody.appendChild(linha)
            })
            tabela.appendChild(tbody)
    
            visualizacaoRegistros.appendChild(tabela)
    
            // Inicializa o DataTables
            $(document).ready(function() {
                $('#tabelaRegistros').DataTable({
                    language: {
                        decimal: ",",
                        thousands: ".",
                        processing: "Processando...",
                        search: "Buscar:",
                        lengthMenu: "Mostrar _MENU_ registros",
                        info: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                        infoEmpty: "Mostrando 0 até 0 de 0 registros",
                        infoFiltered: "(filtrado de _MAX_ registros no total)",
                        loadingRecords: "Carregando...",
                        zeroRecords: "Nenhum registro encontrado",
                        emptyTable: "Nenhum dado disponível nesta tabela",
                        paginate: {
                            first: "Primeiro",
                            previous: "Anterior",
                            next: "Próximo",
                            last: "Último"
                        },
                        aria: {
                            sortAscending: ": ativar para ordenar a coluna em ordem crescente",
                            sortDescending: ": ativar para ordenar a coluna em ordem decrescente"
                        }
                    },
                    columns: [
                        { width: '30%' },
                        { width: '30%' },
                        { width: '40%' }
                    ],
                    order: [[2, 'desc']], // Ordenação decrescente na coluna de data e hora
                    columnDefs: [
                        { type: 'date', targets: 2 } // Define o tipo da coluna 2 como data para melhor ordenação
                    ]
                })
            })
        } catch (error) {
            console.error('Ocorreu um erro ao renderizar registros de acesso no Dashboard.')
        }
    }
        
    // Funções para o gráfico de registros de acessos
    async function carregarDadosParaGraficoRegistrosDeAcesso(filtroUsuario = 'todos', filtroPapel = 'todos', dataInicial = '', dataFinal = '') {
        try {
            const response = await fetch(`${urlApi}/registros_acesso/`)
            const { acessos } = await response.json()
            // Filtrando os dados com base nos parâmetros
            let registrosFiltrados = acessos.filter(registro => {
                const dataRegistro = new Date(registro.data_hora_acesso)
                const dataInicialValida = dataInicial ? new Date(dataInicial + 'T00:00:00') : null
                const dataFinalValida = dataFinal ? new Date(dataFinal + 'T23:59:59') : null
                const usuarioValido = filtroUsuario === 'todos' || registro.nome_usuario === filtroUsuario
                const papelValido = filtroPapel === 'todos' || registro.papel === filtroPapel
                return (
                    usuarioValido &&
                    papelValido &&
                    (!dataInicialValida || dataRegistro >= dataInicialValida) &&
                    (!dataFinalValida || dataRegistro <= dataFinalValida)
                )
            })    
            const tipoGrafico = document.getElementById('tipoGrafico').value; // Obter o valor do seletor
            const totalAcessos = registrosFiltrados.length; // Total geral de acessos
            if (tipoGrafico === 'mensal') {
                // Agrupar por mês
                const registrosMensais = {}
                registrosFiltrados.forEach(registro => {
                    const data = new Date(registro.data_hora_acesso)
                    const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}` // Formato MM/YYYY
                    registrosMensais[mesAno] = (registrosMensais[mesAno] || 0) + 1
                })
                const datesMensais = Object.keys(registrosMensais).sort((a, b) => {
                    const [mesA, anoA] = a.split('/')
                    const [mesB, anoB] = b.split('/')
                    return new Date(anoA, mesA - 1) - new Date(anoB, mesB - 1)
                })
                const countsMensais = datesMensais.map(mesAno => registrosMensais[mesAno])
                criarGraficoRegistroDeAcessos(datesMensais, countsMensais, 'monthly', registrosFiltrados, totalAcessos)
            } else {
                // Agrupar por dia
                const registrosDiarios = {}
                const usuariosDiarios = {}
                registrosFiltrados.forEach(registro => {
                    const data = new Date(registro.data_hora_acesso)
                    const dataFormatada = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`
                    registrosDiarios[dataFormatada] = (registrosDiarios[dataFormatada] || 0) + 1
                    if (!usuariosDiarios[dataFormatada]) {
                        usuariosDiarios[dataFormatada] = []
                    }
                    usuariosDiarios[dataFormatada].push({ nome: registro.nome_usuario, papel: registro.papel })
                })
                const datesDiarios = Object.keys(registrosDiarios).sort()
                const countsDiarios = datesDiarios.map(date => registrosDiarios[date])
                const datesExibicaoDiarios = datesDiarios.map(date => {
                    const [ano, mes, dia] = date.split('-')
                    return `${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}/${ano}`
                })
                criarGraficoRegistroDeAcessos(datesExibicaoDiarios, countsDiarios, 'daily', usuariosDiarios, totalAcessos)
            }
        } catch (error) {
            console.error('Erro ao carregar dados de registros de acesso:', error)
        }
    }
    function criarGraficoRegistroDeAcessos(dates, counts, tipo, usuariosDiarios, totalAcessos) {
        const trace = {
            x: dates,
            y: counts,
            type: tipo === 'monthly' ? 'bar' : 'scatter',
            mode: tipo === 'monthly' ? 'lines' : 'lines+markers',
            marker: {
                color: tipo === 'monthly' ? 'rgba(0, 123, 255, 0.7)' : 'rgba(255, 99, 132, 0.7)',
                size: 8
            },
            line: {
                width: 2
            },
            text: tipo === 'monthly' ? counts.map(count => count.toString()) : [],
            textposition: 'auto',
            hoverinfo: 'text'
        }
        const layout = {
            title: `${tipo === 'monthly' ? 'Número de Acessos por Mês' : 'Número de Acessos por Dia'} - Total: ${totalAcessos}`,
            xaxis: {
                title: tipo === 'monthly' ? 'Mês/Ano' : 'Data',
                showgrid: false,
                zeroline: false
            },
            yaxis: {
                title: 'Número de Acessos',
                showline: false
            },
            hovermode: 'closest'
        }
        if (tipo === 'daily') {
            const maxUsuariosExibir = 5 // Limite de usuários a exibir devido a limitação da tooltip da biblioteca Plotly
            trace.text = dates.map((date, index) => {
                const dataFormatada = date.split('/').reverse().join('-') // Converter para YYYY-MM-DD
                const usuarios = usuariosDiarios[dataFormatada] || []
                const usuariosUnicos = [...new Set(usuarios.map(usuario => `${usuario.nome} (${formatarPapelUsuario(usuario.papel)})`))] // Obter usuários únicos
                const contagemUsuarios = usuariosUnicos.length
                const usuariosText = contagemUsuarios > maxUsuariosExibir 
                    ? `${contagemUsuarios} usuário(s) único(s) (exibindo apenas ${maxUsuariosExibir})<br>${usuariosUnicos.slice(0, maxUsuariosExibir).join('<br>')}<br>... e mais ${contagemUsuarios - maxUsuariosExibir} usuário(s)`
                    : `${contagemUsuarios} usuário(s) único(s): ${usuariosUnicos.join('<br>')}`
                return `Acessos: ${counts[index]}<br>${usuariosText}`; // A linha original permanece a mesma
            })
        }
        Plotly.newPlot('graficoAcessos', [trace], layout).then(() => {
            // Adicionando eventos de clique para o modo mensal
            if (tipo === 'monthly') {
                const graphDiv = document.getElementById('graficoAcessos')
                graphDiv.on('plotly_click', (data) => {
                    const month = data.points[0].x
                    const [mes, ano] = month.split('/')
                    // Preencher data inicial e final
                    const dataInicial = new Date(ano, mes - 1, 1).toISOString().split('T')[0]
                    const dataFinal = new Date(ano, mes, 0).toISOString().split('T')[0] // Último dia do mês
                    document.getElementById('dataInicial').value = dataInicial
                    document.getElementById('dataFinal').value = dataFinal
                })
            }
        })
    }

    // Função para carregar lista de usuários para Dashboard
    async function carregarUsuariosParaDashboard() {
        try {
            const response = await fetch(`${urlApi}/usuarios/`)
            const usuarios = await response.json()
            carregarUsuariosNoDashboard(usuarios)
        } catch (error) {
            console.error('Ocorreu um erro ao carregar lista de usuários.')
        }
    }
    
    // Função para listar usuários no Dashboard
    function carregarUsuariosNoDashboard(listaDeUsuarios) {
        try {
            visualizacaoUsuarios.innerHTML = ''
    
            const tabela = document.createElement('table')
            tabela.id = 'tabelaUsuarios'
            tabela.classList.add('display')
    
            const thead = document.createElement('thead')
            thead.innerHTML = `
                <tr>
                    <th>Nome do Usuário</th>
                    <th>Papel</th>
                </tr>
            `
            tabela.appendChild(thead)
    
            const tbody = document.createElement('tbody')
            listaDeUsuarios.forEach(usuario => {
                const linha = document.createElement('tr')
    
                const colunaNome = document.createElement('td')
                colunaNome.innerText = usuario.nome_usuario
                linha.appendChild(colunaNome)
    
                const colunaPapel = document.createElement('td')
                colunaPapel.innerText = formatarPapelUsuario(usuario.papel)
                linha.appendChild(colunaPapel)
    
                tbody.appendChild(linha)
            })
            tabela.appendChild(tbody)
    
            visualizacaoUsuarios.appendChild(tabela)
    
            // Inicializa o DataTables
            $(document).ready(function() {
                $('#tabelaUsuarios').DataTable({
                    language: {
                        decimal: ",",
                        thousands: ".",
                        processing: "Processando...",
                        search: "Buscar:",
                        lengthMenu: "Mostrar _MENU_ registros",
                        info: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                        infoEmpty: "Mostrando 0 até 0 de 0 registros",
                        infoFiltered: "(filtrado de _MAX_ registros no total)",
                        loadingRecords: "Carregando...",
                        zeroRecords: "Nenhum registro encontrado",
                        emptyTable: "Nenhum dado disponível nesta tabela",
                        paginate: {
                            first: "Primeiro",
                            previous: "Anterior",
                            next: "Próximo",
                            last: "Último"
                        },
                        aria: {
                            sortAscending: ": ativar para ordenar a coluna em ordem crescente",
                            sortDescending: ": ativar para ordenar a coluna em ordem decrescente"
                        }
                    },
                    columns: [
                        { width: '50%' },
                        { width: '50%' }
                    ]
                })
            })
            carregarDadosParaGraficoUsuariosPorPapel()
        } catch (error) {
            console.error('Ocorreu um erro ao renderizar usuários no Dashboard.')
        }
    }
    
    // Funções para o gráfico usuários cadastrados
    async function carregarDadosParaGraficoUsuariosPorPapel() {
        try {
            const response = await fetch(`${urlApi}/usuarios/`)
            const usuarios = await response.json()
            // Contar os papéis de usuários
            const contagemPapeis = {}
            usuarios.forEach(usuario => {
                const papel = formatarPapelUsuario(usuario.papel)
                contagemPapeis[papel] = (contagemPapeis[papel] || 0) + 1
            })
            // Preparar dados para o gráfico
            const labels = Object.keys(contagemPapeis)
            const values = Object.values(contagemPapeis)
            // Criar gráfico de pizza
            const trace = {
                labels: labels,
                values: values,
                type: 'pie',
                textinfo: 'label+percent',
                insidetextorientation: 'radial',
            }
            const layout = {
                title: 'Distribuição de Papéis de Usuários',
            }
            Plotly.newPlot('graficoUsuariosPorPapel', [trace], layout)
        } catch (error) {
            console.error('Erro ao carregar gráfico de usuários por papel:', error)
        }
    }

    // Função para carregar lista de recursos para Dashboard
    async function carregarRecursosParaDashboard() {
        try {
            const response = await fetch(`${urlApi}/recursos/`)
            const recursos = await response.json()
            carregarRecursosNoDashboard(recursos)
            await carregarDadosParaGraficoRecursosPorTipo()
        } catch (error) {
            console.error('Ocorreu um erro ao carregar lista de recursos.')
        }
    }
    
    // Função para listar recursos no Dashboard
    function carregarRecursosNoDashboard(listaDeRecursos) {
        try {
            visualizacaoRecursos.innerHTML = ''
    
            const tabela = document.createElement('table')
            tabela.id = 'tabelaRecursos'
            tabela.classList.add('display')
    
            const thead = document.createElement('thead')
            thead.innerHTML = `
                <tr>
                    <th>Nome do Recurso</th>
                    <th>Descrição</th>
                    <th>Tipo</th>
                </tr>
            `
            tabela.appendChild(thead)
    
            const tbody = document.createElement('tbody')
            listaDeRecursos.forEach(recurso => {
                const linha = document.createElement('tr')
    
                const colunaNome = document.createElement('td')
                colunaNome.innerText = recurso.nome
                linha.appendChild(colunaNome)
    
                const colunaDescricao = document.createElement('td')
                colunaDescricao.innerText = recurso.descricao
                linha.appendChild(colunaDescricao)

                const colunaTipo = document.createElement('td')
                colunaTipo.innerText = formatarTipoRecurso(recurso.tipo)
                linha.appendChild(colunaTipo)
    
                tbody.appendChild(linha)
            })
            tabela.appendChild(tbody)
    
            visualizacaoRecursos.appendChild(tabela)
    
            // Inicializa o DataTables
            $(document).ready(function() {
                $('#tabelaRecursos').DataTable({
                    language: {
                        decimal: ",",
                        thousands: ".",
                        processing: "Processando...",
                        search: "Buscar:",
                        lengthMenu: "Mostrar _MENU_ registros",
                        info: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                        infoEmpty: "Mostrando 0 até 0 de 0 registros",
                        infoFiltered: "(filtrado de _MAX_ registros no total)",
                        loadingRecords: "Carregando...",
                        zeroRecords: "Nenhum registro encontrado",
                        emptyTable: "Nenhum dado disponível nesta tabela",
                        paginate: {
                            first: "Primeiro",
                            previous: "Anterior",
                            next: "Próximo",
                            last: "Último"
                        },
                        aria: {
                            sortAscending: ": ativar para ordenar a coluna em ordem crescente",
                            sortDescending: ": ativar para ordenar a coluna em ordem decrescente"
                        }
                    },
                    columns: [
                        { width: '30%' },
                        { width: '50%' },
                        { width: '20%' }
                    ]
                })
            })
        } catch (error) {
            console.error('Ocorreu um erro ao renderizar recursos no Dashboard.')
        }
    }

    // Funções para o gráfico recursos cadastrados
    async function carregarDadosParaGraficoRecursosPorTipo() {
        try {
            const response = await fetch(`${urlApi}/recursos/`)
            const recursos = await response.json()
            // Contar recursos por tipo
            const contagemTipos = {}
            recursos.forEach(recurso => {
                const tipoFormatado = formatarTipoRecurso(recurso.tipo)
                contagemTipos[tipoFormatado] = (contagemTipos[tipoFormatado] || 0) + 1
            })
            // Preparar dados para o gráfico
            const tipos = Object.keys(contagemTipos)
            const contagens = Object.values(contagemTipos)
            // Criar gráfico
            criarGraficoRecursosPorTipo(tipos, contagens)
        } catch (error) {
            console.error('Erro ao carregar dados de recursos por tipo:', error)
        }
    }
    function criarGraficoRecursosPorTipo(tipos, contagens) {
        const trace = {
            x: tipos,
            y: contagens,
            type: 'bar',
            marker: {
                color: 'rgba(0, 123, 255, 0.7)',
                line: {
                    color: 'rgba(0, 123, 255, 1.0)',
                    width: 1.5
                }
            }
        }
        const layout = {
            title: 'Contagem de Recursos por Tipo',
            xaxis: {
                title: 'Tipo de Recurso',
            },
            yaxis: {
                title: 'Contagem',
            },
            barmode: 'group'
        }
        Plotly.newPlot('graficoRecursosPorTipo', [trace], layout)
    }

    // Função de login
    async function fazer_login(event) {
        event.preventDefault()
        try {
            if (!senha.value) {
                throw new Error('A senha não pode estar vazia.')
            }
            if (senha.value.length < 8 || senha.value.length > 12) {
                throw new Error('A senha deve ter entre 8 e 12 caracteres.')
            }
            const novoLogin = {
                nome_usuario: nomeUsuario.value,
                senha: senha.value
            }
            const response = await fetch(`${urlApi}/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoLogin),
            })
            if (response.ok) {
                const userData = await response.json()
                papelUsuarioLogado = userData.papel
                logadoEmIndustriasWayne = true
                formLogin.reset()
                alerta(`Login realizado com sucesso! Você está logado com perfil ${formatarPapelUsuario(papelUsuarioLogado)}.`)
                tituloDeAcordoComLogin.innerText = `Você está logado com o perfil ${formatarPapelUsuario(papelUsuarioLogado)}.`
                exibirSecoesComBaseNoLogin()
                rolarPraCima()
            } else if (response.status === 401) {
                alerta('Usuário ou senha incorretos!', function() {
                    nomeUsuario.focus()
                })
            } else {
                const errorDetail = await response.json()
                alerta(`Erro ao fazer login: ${errorDetail.message || 'Ocorreu um erro inesperado.'}`, function() {
                    nomeUsuario.focus()
                })
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error)
            alerta(error.message || 'Ocorreu um erro ao tentar fazer o login. Tente novamente.', function() {
                nomeUsuario.focus()
            })
        }
    }

    // Função para o logout
    function logout() {
        logadoEmIndustriasWayne = false
        papelUsuarioLogado = ''
        alerta('Logout realizado com sucesso!')
        tituloDeAcordoComLogin.innerText = textoPadraoTituloDeAcordoComLogin
        exibirSecoesComBaseNoLogin()
        rolarPraCima()
    }
    
    // Emitir alertas com opção de fornecer uma função de callback a ser executada quando o modal for
    // fechado. Configurado para sobrepor outros modais caso existam
    function alerta(mensagem, callback = null) {
        document.getElementById('modalMessage').innerText = mensagem
        var modalElement = document.getElementById('alertModal')
        var modal = new bootstrap.Modal(modalElement, {
            backdrop: 'static'
        })
        // Aumentar o z-index do modal de alerta para garantir que ele esteja acima de outros modais
        var modals = document.querySelectorAll('.modal.show')
        var maxZIndex = 1050
        modals.forEach(function(m) {
            var zIndex = parseInt(window.getComputedStyle(m).zIndex, 10)
            if (zIndex > maxZIndex) {
                maxZIndex = zIndex
            }
        })
        modalElement.style.zIndex = maxZIndex + 10
        modalElement.removeEventListener('hidden.bs.modal', modalElement._callbackHandler)
        modalElement._callbackHandler = function() {
            if (typeof callback === 'function') {
                callback()
            }
        }
        modalElement.addEventListener('hidden.bs.modal', modalElement._callbackHandler)
        modal.show()
    }

    // Função para rolar a tela para o topo
    function rolarPraCima() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    // Função para mudar o fundo
    function mudarPlanoDeFundo() {
        const randomIndex = Math.floor(Math.random() * backgrounds.length)
        // Alterar a imagem de fundo
        homeDiv.style.backgroundImage = `url('${backgrounds[randomIndex]}')`
    }

    // Funções para validar nomes de usuário e recurso
    function validarNomeUsuario(nome) {
        const regex = /^[a-zA-Z0-9_]+$/
        return regex.test(nome)
    }
    function validarNomeTamanho(nome) {
        return nome.length >= 3
    }

    // Configurar os escutadores
    function configurarEscutadores() {
        navbar.addEventListener('click', function(event) {
            if (event.target && event.target.id === 'logout-button') {
                logout()
            }
        })
        btnExcluirAcessos.addEventListener('click', function(event) {
            if (event.target && event.target.id === 'btn-excluir-acessos') {
                confirmarExclusaoRegistrosDeAcesso()
            }
        })
        botaoConfirmarExclusao.addEventListener('click', async function() {
            if (usuarioIdParaExcluir) {
                await excluirUsuario(usuarioIdParaExcluir)
                usuarioIdParaExcluir = null
            } else if (recursoIdParaExcluir) {
                await excluirRecurso(recursoIdParaExcluir)
                recursoIdParaExcluir = null
            } else if (excluirRegistrosAcesso) {
                await excluirRegistrosDeAcesso()
                excluirRegistrosAcesso = false
            }
            var modal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'))
            if (modal) {
                modal.hide()
            }
        })
        
        // Escutador para os botões de manipular máscara de senhas
        document.querySelectorAll('.togglePassword').forEach(button => {
            button.addEventListener('click', function () {
                const senhaInput = this.previousElementSibling // Pega o input anterior ao botão
                const eyeIcon = this.querySelector('i')
                // Alterna o tipo do input entre 'password' e 'text'
                if (senhaInput.type === 'password') {
                    senhaInput.type = 'text' // Mostra a senha
                    eyeIcon.classList.remove('fa-eye') // Troca o ícone
                    eyeIcon.classList.add('fa-eye-slash') // Ícone de olho cortado
                } else {
                    senhaInput.type = 'password' // Oculta a senha
                    eyeIcon.classList.remove('fa-eye-slash') // Troca o ícone
                    eyeIcon.classList.add('fa-eye') // Ícone de olho
                }
            })
        })
        
        // Escutadores para configurar os filtros do gráfico de registro de acessos
        document.getElementById('filtrar').addEventListener('click', () => {
            const usuarioFiltro = document.getElementById('usuarioFiltro').value
            const papelFiltro = document.getElementById('papelFiltro').value
            const dataInicial = document.getElementById('dataInicial').value
            const dataFinal = document.getElementById('dataFinal').value
            carregarDadosParaGraficoRegistrosDeAcesso(usuarioFiltro, papelFiltro, dataInicial, dataFinal)
        })
        // Remover os filtros do gráfico de registros de acessos
        document.getElementById('resetar-filtros').addEventListener('click', () => {
            document.getElementById('usuarioFiltro').value = 'todos'
            document.getElementById('papelFiltro').value = 'todos'
            document.getElementById('dataInicial').value = ''
            document.getElementById('dataFinal').value = ''
            carregarDadosParaGraficoRegistrosDeAcesso()
        })
        // Mudar o tipo de gráfico
        document.getElementById('tipoGrafico').addEventListener('change', function() {
            const filtroUsuario = document.getElementById('usuarioFiltro').value
            const filtroPapel = document.getElementById('papelFiltro').value
            const dataInicial = document.getElementById('dataInicial').value
            const dataFinal = document.getElementById('dataFinal').value
            carregarDadosParaGraficoRegistrosDeAcesso(filtroUsuario, filtroPapel, dataInicial, dataFinal)
        })

        formLogin.addEventListener('submit', fazer_login)
        formCadastroAdmin.addEventListener('submit', cadastrarAdministrador)
        formUsuario.addEventListener('submit', cadastrarUsuario)
        formEditarUsuario.addEventListener('submit', editarUsuario)
        formRecurso.addEventListener('submit', cadastrarRecurso)
        formEditarRecurso.addEventListener('submit', editarRecurso)
    }
    mudarPlanoDeFundo()
    // Trocar o plano de fundo a cada 60 segundos
    setInterval(mudarPlanoDeFundo, 60000)
    exibirSecoesComBaseNoLogin()
    configurarEscutadores()
}

// Espera o DOM estar completamente carregado antes de executar as funções
document.addEventListener("DOMContentLoaded", initialize)