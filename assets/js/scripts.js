// Selecionar a Seção About
const about = document.querySelector('#about');
// Selecionar o Formulário
const formulario = document.querySelector('#formulario');

// Expressão regular para validar e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

// Função para buscar dados no GitHub
async function getGitHubApi() {
  try{
    // Fazer uma requisição GET para a API do GitHub
    const dadosPerfil = await fetch('https://api.github.com/users/sofia-araujo');

    // Passo 2: Converter a resposta da API para JSON
    const perfilJson = await dadosPerfil.json();

    // Passo 3: Criar o HTML/CSS com os dados do perfil
    let conteudo = `
        <!-- FOTO DO PERFIL -->
            <figure class="about_image">
                <img
                    src="${perfilJson.avatar_url}"
                    alt="Foto do perfil do GitHub - ${perfilJson.name}."
                >
            </figure>
 
            <!-- CONTEÚDO DO PERFIL -->
            <article class="about_content">
 
                <h2>Sobre mim</h2>
                <p>Desenvolvedora Fullstack formada pelo SENAI e cursando o programa da Generation. Tenho experiência no desenvolvimento de projetos utilizando linguagens como Java e JavaScript. Vivência em tecnologias como Spring Boot, Node.js, React.js, Express.js, SQL, MySql, HTML, CSS.Atuei como secretária Administrativa na Ademicon realizando atividades como divulgação de vagas de emprego, atendimento da carteira de clientes vinculada à gestão e acompanhamento de indicadores de desempenho.</p>
                <p>Minha paixão por tecnologia começou na adolescência, quando comecei a explorar o mundo da programação.</br>
                💻 Trabalhar com tecnologia é sobre inovação, mas o verdadeiro impacto está em resolver problemas de forma inteligente e eficiente.</p>
 
                <div class="about_stats">
                    <a href="${perfilJson.html_url}" target="_blank" class="botao">Ver GitHub</a>
              
                    <div class="stats-wrapper">
                        <div class="stat-item">
                            <p class="stat-number">${perfilJson.followers}</p>
                            <p class="stat-label">Seguidores</p>
                        </div>
                        <div class="stat-item">
                            <p class="stat-number">${perfilJson.public_repos}</p>
                            <p class="stat-label">Repositórios</p>
                        </div>
                    </div>
 
                </div>
            </article>
 
    `

    // Passo 4: adicionar o HTML dentro da seção About
    about.innerHTML += conteudo;
  }catch(error){
    console.error('Erro ao buscar dados do GitHub:', error);  
  }
}

formulario.addEventListener('submit', function(event){
    event.preventDefault();

    const campoNome = document.querySelector('#nome');
    const txtNome = document.querySelector('#txtNome');
    const campoEmail = document.querySelector('#email');
    const txtEmail = document.querySelector('#txtEmail');
    const campoAssunto = document.querySelector('#assunto');
    const txtAssunto = document.querySelector('#txtAssunto');
    const campoMensagem = document.querySelector('#mensagem');
    const txtMensagem = document.querySelector('#txtMensagem');

    // Nome deve ter pelo menos 3 caracteres
    if(campoNome.value.length < 3){
        txtNome.innerHTML = 'Nome deve ter pelo menos 3 caracteres';
        campoNome.focus();
        return;
    }else{
        txtNome.innerHTML = '';
    }

    // Validação do campo de e-mail
    if(!campoEmail.value.match(emailRegex)){
        txtEmail.innerHTML = 'E-mail inválido';
        campoEmail.focus();
        return;
    }else{
        txtEmail.innerHTML = '';
    }

     //Nome precisa ter pelo menos  caracteres
    if(campoAssunto.value.length < 5){
      txtAssunto.innerHTML = 'O assunto deve ter pelo menos 5 caracteres.';
      campoAssunto.focus();
      return;
    }else{
      txtAssunto.innerHTML = '';
    }
 
    //Se passou por todas as validações, envia o formulário
    formulario.submit();
})
// Chamar a função para buscar os dados do GitHub
getGitHubApi();