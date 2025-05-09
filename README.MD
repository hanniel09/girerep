# Projeto GireRep - Iteração 2

## Como rodar o projeto

### Pré-requisitos

- Java 17
- Node.js 18+
- MySQL
- Maven

### Backend

```bash
cd backend
mvn install
./mvnw spring-boot:run
```

#### Referencia da api

##### Register um usuario

```SHELL
  POST /auth/register
```

| Parametro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `Username, Password, Role` | `Json` | **Required**. Server esteja em funcionamento. |

##### Login

```SHELL
  POST /auth/login
```

| Parametro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `Username, Password` | `Json` | **Required**. Server esteja em funcionamento e usuario exista. |

##### Ver todos os clientes 

```SHELL
  GET /clients
```

| Parametro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `Token` | `Bearer` | **Required**. Server esteja em funcionamento e o usuario esteja logado via token bearer. |

##### Ver clientes por id

```SHELL
  GET /clients/{id}
```

| Parametro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `Token, id` | `Bearer, UUID` | **Required**. Server esteja em funcionamento e o usuario esteja logado via token bearer. |

##### Ver clientes por pesquisa direta

```SHELL
  GET /clients/query?=hva
```

| Parametro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `Token, query` | `Bearer, String` | **Required**. Server esteja em funcionamento e o usuario esteja logado via token bearer. |

##### Criar um cliente

```SHELL
  POST /clients
```

| Parametro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `Token, dados` | `Bearer, Json` | **Required**. Server esteja em funcionamento e o usuario esteja logado via token bearer. |

##### Atualizar um cliente

```SHELL
  PUT /clients/{id}
```

| Parametro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `Token, dados` | `Bearer, Json` | **Required**. Server esteja em funcionamento e o usuario esteja logado via token bearer. |

##### Deletar um cliente

```SHELL
  DELETE /clients/{id}
```

| Parametro | Tipo     | Descrição                |
| :-------- | :------- | :------------------------- |
| `Token` | `Bearer` | **Required**. Server esteja em funcionamento e o usuario esteja logado via token bearer. |


### Frontend

```
cd frontend
npm install
npm run dev

#acessar
localhost:3000 
localhost:3000/home
```
