# Auth Boilerplate

Este repositório contém uma aplicação backend desenvolvida com o framework [NestJS](https://nestjs.com/). A aplicação inclui funcionalidades como cadastro e login de usuários, autenticação JWT, verificação de email, recuperação de senha, autenticação de dois fatores e tarefas agendadas para manutenção de usuários.

## ✨ Funcionalidades

- **Cadastro de Usuário**: Implementação com verificação de email.
- **Login de Usuário**: Login com autenticação JWT.
- **Logout de Usuário**: Logout com invalidação do token JWT.
- **Verificação de Email**: Envio de email de verificação para confirmar propriedade do email.
- **Recuperação de Senha**: Recuperação de senha via email com token de redefinição.
- **Alteração de Senha Autenticada**: Alteração de senha informando a senha antiga.
- **Criação de Tarefas**: Serviço para remover usuários não verificados após um período.
- **Bloqueio de Conta**: Bloqueio temporário após várias tentativas de login falhas.
- **Autenticação de Dois Fatores**: Ativação e desativação de 2FA (Two-Factor Authentication).
- **Papéis (Roles)**: Proteção de rotas específicas

---

## 🛠️ Instalação

1. Instale as dependências:

    ```bash
    $ npm install
    ```

2. Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

    ```bash
    NODE_ENV=development
    PORT=3000

    DATABASE_URL=postgres://<usuário>:<senha>@<host>:<porta>/<nomedobanco>
    REDIS_URL=redis://<usuário>:<senha>@<host>:<porta>/<database>

    JWT_SECRET=COLOQUE UMA CHAVE SECRETA AQUI
    JWT_EXPIRES_IN=1d

    EMAIL_USER=EMAIL QUE VAI SER USADO PARA ENVIAR OS EMAILS
    EMAIL_PASS=SENHA DO EMAIL QUE VAI SER USADO PARA ENVIAR OS EMAILS

    MAX_FAILED_ATTEMPTS=5
    LOCK_TIME=3600000

    BASE_URL_FRONTEND=http://localhost:5173
    MAIN_ADMIN=EMAIL DO ADMINISTRADOR PRINCIPAL
    ```

## 🚀 Executando a Aplicação

1. Inicie o servidor no modo de desenvolvimento:

    ```bash
    $ npm run start:dev
    ```

## 📚 Documentação da API

A documentação da API estará disponível em http://localhost:3000/api enquanto a aplicação estiver rodando no modo de desenvolvimento.

## 🔗 Recursos Úteis

Aqui estão alguns links úteis para trabalhar com NestJS:

- [Documentação do NestJS](https://docs.nestjs.com/)
- [Canal do Discord](https://discord.com/invite/nestjs)
- [Cursos Oficiais](https://nestjs.com/courses)
- [NestJS Devtools](https://docs.nestjs.com/devtools/overview)
