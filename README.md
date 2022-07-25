# Stock Simulator

## Rodando o projeto localmente:

Para rodar o projeto local, clone o repositorio e instale as dependências com: 

`yarn install`
`npm install`

O projeto usa prisma para acessar o banco de dados, confira o arquivo `.env.example` e faça as modificações
necessárias para conectar com o mesmo. Nesse arquivo, configure também a porta desejada para a aplicação ouvir
as futuras requisições.
Se preferir, o projeto acompanha um arquivo `docker-compose.yml` que pode ser usado como comando:

`docker compose up -d`

Após ter um banco de dados conectado, faça as migrações necessárias utilizando:

`yarn run migrate`
`npm run migrate`

Após termos o banco de dados rodando e conectado, e rodar as migrações, a aplicação deve estar acessível na porta
designada no `.env` ou por padrão na porta 3000.
Inicie a aplicação com o comando:
`yarn run dev`ou `npm run dev`

# Rotas da aplicação

As rotas serão descritas e agrupadas por funcionalidades. Atente-se às rotas que pedem autenticação.

## USER

Rotas destinadas ao usuário não necessitam autenticação.

### `POST` /createuser

Essa rota espera receber no corpo da requisição:

```
{
	"email": "user@gmail.com",
	"password": "password"
}
```

> - email deve ser um email válido
> - password é um string de no mínimo 6 caracteres

Esse endpoint em caso de sucesso nos enviará:
```
{
	"clientId": "2ebbb569-dcc8-49ca-a339-058a4904d644",
	"token": "eyJhbGciOiJIUzI1NiJ9.MmViYmI1NjktZGNjOC00OWNhLWEzMzktMDU4YTQ5MDRkNjQ0.-kGWnZGp6btEwNN-XG_CMiYBHzR8XCbsBGkCa8vyzjk"
}
```

O `token` será necessário para acessar outras funcionalidades da aplicação, juntamente com o `clientId`

## `POST` /login

Essa rota espera receber no corpo da requisição:

```
{
	"email": "user@gmail.com",
	"password": "password"
}
```

> os dados do usuário precisão ser válidos.

O retorno desta requisição será exatamente o mesmo do endpoint /createuser. Use-o para resgatar ou revalidar token.

## WALLET

Rotas destinadas as seguintes funcionalidades: consultar saldo, saques, depósitos e transferências.

## `GET`/wallet/{clientId}

Requisição espera receber como parametro o clientId retornado no login ou criação do usuário.

Como resposta, o endpoint entrega: 

```
{
	"walletId": "df2f0b60-2fad-43e8-bc75-bd57891120a2",
	"clientId": "4df3537c-c870-4610-a01a-bee4409f2e83",
	"balance": 999.99
}
```
## `POST`/wallet/withdraw

Como corpo da requisição, é esperado:
```
{
  "clientId": "4df3537c-c870-4610-a01a-bee4409f2e83",
	"amount":1
}
```

A resposta será, em caso de sucesso:

```
{
	"walletId": "df2f0b60-2fad-43e8-bc75-bd57891120a2",
	"clientId": "4df3537c-c870-4610-a01a-bee4409f2e83",
	"balance": 998.99
}
```

> - clientId precisa ser um string
> - amount: um número inteiro não negativo

## `POST`/wallet/deposit

Como corpo da requisição, é esperado:
```
{
  "clientId": "4df3537c-c870-4610-a01a-bee4409f2e83",
	"amount":1
}
```

A resposta será, em caso de sucesso:

```
{
	"walletId": "df2f0b60-2fad-43e8-bc75-bd57891120a2",
	"clientId": "4df3537c-c870-4610-a01a-bee4409f2e83",
	"balance": 998.99
}
```

> - "clientId" precisa ser um string
> - "amount": um número inteiro não negativo

## `POST`/wallet/transfer

Funcionalidade para transferir fundos a outra conta.

Como corpo da requisição, é esperado:
```
{
	"clientId": "4df3537c-c870-4610-a01a-bee4409f2e83",
	"to": "12d74f1e-2a42-4d01-9565-31fd4cff1eec",
	"amount": 2
}
```

A resposta será, em caso de sucesso:

```
{
	"message": "You transferred R$ 2 to 12d74f1e-2a42-4d01-9565-31fd4cff1eec",
	"balance": "Your new balance is R$ 330.9340000000001"
}
```

> - "clientId" precisa ser um string
> - "to" precisa ser o clientId da conta a receber o dinheiro
> - amount: um número inteiro não negativo

## `GET`/wallet/assets/{clientId}

Esse endpoint retorna a quantidade de ações que o client possue na carteira.

Em caso de sucesso, seu retorno será:
```
[
	{
		"assetQtty": 13,
		"clientId": "4df3537c-c870-4610-a01a-bee4409f2e83",
		"assetId": "178ca6d7-88f7-4a29-896e-efbd709183d2",
		"Asset": {
			"assetId": "178ca6d7-88f7-4a29-896e-efbd709183d2",
			"assetName": "KLBN11",
			"value": 51.312,
			"assetQtty": 986
		}
	},
	{
		"assetQtty": 89,
		"clientId": "4df3537c-c870-4610-a01a-bee4409f2e83",
		"assetId": "1c98e13b-1927-4ca2-a692-124e82ec33d5",
		"Asset": {
			"assetId": "1c98e13b-1927-4ca2-a692-124e82ec33d5",
			"assetName": "PETR4",
			"value": 3.34,
			"assetQtty": 910
		}
	}
]
```







