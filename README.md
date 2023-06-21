Este é um projeto Django que utiliza um ambiente virtual Python e Docker para gerenciar dependências e o banco de dados. Este guia irá ajudá-lo a configurar e executar o projeto em sua máquina local.

Pré-requisitos

Antes de prosseguir, verifique se o seu sistema possui os seguintes requisitos:

Python instalado (versão 3.8)
Docker instalado

Clonando o repositório

Primeiro, clone o repositório do GitHub em sua máquina local usando o seguinte comando:

    git clone https://github.com/venchiarutti/chess-tournaments-management.git

Configurando o ambiente virtual Python

Agora, vamos configurar um ambiente virtual Python para isolar as dependências do projeto. Siga as etapas abaixo:

Navegue para o diretório do projeto:

    cd chess-tournaments-management

Crie um ambiente virtual:

    python3.8 -m venv venv

Ative o ambiente virtual:

    No Linux/macOS:

    source venv/bin/activate

    No Windows (PowerShell):

    .\venv\Scripts\Activate.ps1

Instale as dependências do projeto:

    pip install -r requirements.txt

Configurando e iniciando o Docker para o banco de dados

Este projeto utiliza o Docker para executar o banco de dados. Siga as etapas abaixo para configurar e iniciar o Docker:

Certifique-se de ter o Docker instalado em sua máquina.

Dentro da pasta incial do repositório inicie o Docker Compose para construir e executar o ambiente:

    docker-compose up -d

Aguarde até que o Docker baixe as imagens e inicie o banco de dados.

Criando tabelas e inserindo dados

Antes de executar o projeto, vamos criar as tabelas necessárias e inserir alguns dados de exemplo. Siga as etapas abaixo:

    Todos os comandos necessários para criar o banco de dados no Mysql e inserir dados de exemplo estão presentes no arquivo import.sql na raiz do projeto

Executando o projeto

Agora, você está pronto para executar o projeto e acessá-lo localmente. Siga as etapas abaixo:

Certifique-se de que o Docker e o ambiente virtual Python estejam ativos.

Execute o servidor de desenvolvimento Django da raiz do projeto:

    python3.8 crud/manage.py runserver localhost:8000

Abra um navegador da web e acesse o seguinte endereço:

    http://localhost:8000

Você deverá ver a página inicial do projeto.