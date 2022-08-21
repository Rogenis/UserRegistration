# UserRegistration


### INstalação

**Dependências**
- Docker version 20.10.7
- Docker-compose version 1.25.0

**Passos para rodar localmente**

Obs: O processo do Postgres roda na porta 5432, desse modo, antes de executar os comandos abaixo, é recomendado verificar se possui algum processo  vinculado à porta 5432. Isto pode ser feito atraves do comando `lsof -i tcp:5432`, e caso tenha algum processo sendo executado, use `kill {pid}` para parar o processo. Após isso, execute os comandos abaixo:

1. Instale as depedências citadas acima. 
2. Execute o comando `make build`, dentro do diretório (Irá subir os containers).
3. Execute o comando `make db-build`, irá construir o banco de dados. 
4. Após isso, acesse através do browser ou por ferramentas de requisições (ex: insomnia) o endpoint `localhost:3000/health`.  
5. Desse modo, é esperado que seja retornado um resultado JSON: 
```
{
  "status": "OK"
}
```
