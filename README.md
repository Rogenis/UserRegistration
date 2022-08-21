# UserRegistration

**Dependências**
- Docker version 20.10.7
- Docker-compose version 1.25.0

**Passos para rodar localmente**

1. Adiiconar arquivo .env no diretório, as informações do banco de dado, conforme o .env.example:
```
{
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=clients
  DB_USERNAME=root
  DB_PASSWORD=
}
```

2. Execute o comando `make start`, dentro do diretório (Irá subir os containers).
- Caso as depedências dos projetos não instalem corretamente, basta seguir os passos, que instalará as depedências dos projetos corretamente:
```
  cd backend
  composer insatll
  cd ..
  cd frontend
  npm install
```
3. Construir o banco de dados: 
- docker exec -it shouts-laravel-db mysql -u 'user' -p
- create database clients;
- docker exec -it userregistration_backend_1 sh
- php artisan migrate

4. Acessa localhost:3000

## Comandos
- `make build`: Habilita todos os containers e images necessários para rodar a aplicação.
- `make rebuild`: Desabilita os containers da aplicação, apaga os dados remanescentes e habilita novamente os containers.
- `make start`: Inicializa os containers da aplicação.
- `make stop`: Suspende os containers da aplicação.
- `make logs`: Mostra os logs dos containers relacionados à aplicação.

### Sobre o projeto

Desafio técnico a qual foi implementado features relacionadas a de criação de contas de usuário. 

- A stack de tecnologia utilizada foi deLaravel para o Backend e React para frontEnd.
- Para o banco de dados, foi usado o MySQl, com disto de MariaDB.
- Durante o preenchimento dos campos o usuário deveria apresentar um endereço válido, com isso, também foi utilizado a API do serviço https://viacep.com.br, para validação de endereço do usuário.

#### Implementação:
1. Cadastrar usuário;
2. Listar usuários;
3. Editar usuário;
4. Deletar usuário do banco
5. Cadastro aceita apenas usuários do Amazonas
6. Cadastro não aceita usuários menores de idade.
7. Todos os campos devem ser obrigatórios.
