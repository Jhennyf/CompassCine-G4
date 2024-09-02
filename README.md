# 2º Desafio | Node.JS + AWS_JUL24
**Compacine** este projeto consiste no desenvolvimento de um software que controle e organize as operações de uma bilheteria de cinema, desde o cadastro de filmes, sessões e até a venda de ingressos.
Este projeto foi idealizado durante o estágio na empresa **Compass UOL** no programa de bolsas de **Back-end Journey (Node.js) - AWS Cloud Context.**

Para este projeto foi determinado o uso de algumas tecnologias e padronização de código, visando tornar o projeto o mais sofisticado possível, atendendo as normas de boas práticas de programação e um padrão de excelência.


### Documentação da API
##### **Módulo: Filmes**

<details>
 <summary><code>GET</code> <code><b>/movies</b></code> <code>(Este endpoint retorna ao usuário uma lista de todos os filmes cadastrados no sistema.)</code></summary>

##### Parameters
> None

> N/A
##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`        | `OK`                                |
> | `404`         | `application/json`                | `Dados não encontrados`                            |

##### Exemplo de Response
 ```json
	[
  {
    "id": 1,
    "image": "url_da_imagem",
    "name": "nome_do_filme",
    "description": "descricao_do_filme",
    "actors": ["ator1", "ator2", "ator3"],
    "genre": "genero_do_filme",
    "release_date": "03/06/2024",
    "sessions": [
      {
        "id": 1,
        "movie_id": 1,
        "room": "nome_da_sala",
        "capacity": 100,
        "day": "03/06/2024",
        "time": "14:23:00"
        "tickets": [
          {
            "id": 1,
            "session_id": 1,
            "chair": "b1",
            "value": 10
          }
        ]
      },
      {
        "id": 2,
        "movie_id": 1,
        "room": "nome_da_sala",
        "capacity": 100,
        "day": "03/06/2024",
        "time": "14:23:00"
        "tickets": [
          {
            "id": 2,
            "session_id": 2,
            "chair": "b1",
            "value": 20
          }
        ]
      }
    ]
  }
]
```
</details>


<details>
 <summary><code>GET</code> <code><b>/movies/:id</b></code> <code>(Este endpoint busca um filme específico no db e retorna as informações deste filme.)</code></summary>

##### Parameters
> ID
##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`        | `OK`                                |
> | `404`         | `application/json`                | `Dado não encontrado`                            |

##### Exemplo de Response
 ```json
[
  {
    "id": 1,
    "image": "url_da_imagem",
    "name": "nome_do_filme",
    "description": "descricao_do_filme",
    "actors": ["ator1", "ator2", "ator3"],
    "genre": "genero_do_filme",
    "release_date": "03/06/2024",
    "sessions": []
  }
]
```
</details>

<details>
 <summary><code>POST</code> <code><b>/movies</b></code> <code>(Este endpoint cria um novo filme no sistema.)</code></summary>

##### Parameters
> None

> N/A
##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`        | `OK`                                |
> | `404`         | `application/json`                | `Dado não encontrado`                            |

##### Exemplo de Request Body
 ```json
[
  {
    "id": 1,
    "image": "url_da_imagem",
    "name": "nome_do_filme",
    "description": "descricao_do_filme",
    "actors": ["ator1", "ator2", "ator3"],
    "genre": "genero_do_filme",
    "release_date": "03/06/2024",
    "sessions": []
  }
]
```

##### Exemplo de Response
 ```json
{
	"id": 1
  	"image": "url_da_imagem",
  	"name": "nome_do_filme",
  	"description": "descricao_do_filme",
  	"actors": ["ator1", "ator2", "ator3"],
  	"genre": "genero_do_filme",
  	"release_date": "10/03/2024"
}


```
</details>

<details>
 <summary><code>PUT</code> <code><b>/movies/:id</b></code> <code>(Este endpoint atualiza os dados de um filme já cadastrado.)</code></summary>

##### Parameters
> ID

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`        | `OK`                                |
> | `404`         | `application/json`                | `Dado não encontrado`                            |

##### Exemplo de Request Body
 ```json
[
  {
    "id": 1,
    "image": "url_da_imagem",
    "name": "nome_do_filme",
    "description": "descricao_do_filme",
    "actors": ["ator1", "ator2", "ator3"],
    "genre": "genero_do_filme",
    "release_date": "03/06/2024",
    "sessions": []
  }
]
```

##### Exemplo de Response
 ```json
{
	"id": 1
  	"image": "url_da_imagem",
  	"name": "nome_do_filme",
  	"description": "descricao_do_filme",
  	"actors": ["ator1", "ator2", "ator3"],
  	"genre": "genero_do_filme",
  	"release_date": "10/03/2024"
}


```
</details>


<details>
 <summary><code>DELETE</code> <code><b>/movies/:id</b></code> <code>(Este endpoint exclui o filme cadastrado.)</code></summary>

##### Parameters
> ID

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `204`         | `application/json`        | `No content`                                |
> | `404`         | `application/json`                | `Dado não encontrado`                            |

</details>


##### **Módulo: Sessões**

<details>
 <summary><code>POST</code> <code><b>/movies/{movie_id}/sessions</b></code> <code>(Este endpoint cria uma nova sessão relacioanda a um filme já cadastrado.)</code></summary>

##### Parameters
> MOVIE_ID

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`        | `OK`                                |
> | `404`         | `application/json`                | `Dados não encontrados`                            |

##### Exemplo de Request Body
 ```json
{
  "room": "nome_da_sala",
  "capacity": 100,
  "day": "03/06/2024",
  "time": "14:23:00"
}
```

##### Exemplo de Response
 ```json
{
  	"id": 1,
  	"movie_id": 1,
  	"room": "nome_da_sala",
  	"capacity": 100,
  	"day": "03/06/2024",
  	"time": "14:23:00"
}
```
</details>

<details>
 <summary><code>PUT</code> <code><b>/movies/{movie_id}/sessions/:id</b></code> <code>(Este endpoint atualiza os dados de uma sessão.)</code></summary>

##### Parameters
> MOVIE_ID

> SESSION_ID : id

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`        | `OK`                                |
> | `404`         | `application/json`                | `Dados não encontrados`                            |

##### Exemplo de Request Body
 ```json
{
  "room": "nome_da_sala",
  "capacity": 100,
  "day": "03/06/2024",
  "time": "14:23:00"
}
```

##### Exemplo de Response
 ```json
{
  	"id": 1,
  	"movie_id": 1,
  	"room": "nome_da_sala",
  	"capacity": 100,
  	"day": "03/06/2024",
  	"time": "14:23:00"
}
```
</details>


<details>
 <summary><code>DELETE</code> <code><b>/movies/{movie_id}/sessions/:id</b></code> <code>(Este endpoint deleta uma sessão.)</code></summary>

##### Parameters
> MOVIE_ID
> SESSION_ID : id

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `204`         | `application/json`        | `No content`                                |
> | `404`         | `application/json`                | `Dados não encontrados`                            |

</details>

##### **Módulo: Ingressos**

<details>
 <summary><code>POST</code> <code><b>/movies/{movie_id}/sessions/{session_id}/tickets</b></code> <code>(Este endpoint cria um ingresso a uma sessão que está relacionada a um filme.)</code></summary>

##### Parameters
> MOVIE_ID

> SESSSION_ID

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`        | `OK`                                |
> | `404`         | `application/json`                | `Dados não encontrados`                            |

##### Exemplo de Request Body
 ```json
{
  "chair": "b1",
  "value": 10
}
```

##### Exemplo de Response
 ```json
{
  "id": 1,
  "session_id": 1,
  "chair": "b1",
  "value": 10
}
```
</details>


<details>
 <summary><code>PUT</code> <code><b>/movies/{movie_id}/sessions/{session_id}/tickets/:id</b></code> <code>(Este endpoint atualiza os dados de um ingresso.)</code></summary>

##### Parameters
> MOVIE_ID

> SESSSION_ID

> TICKET_ID : ID

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`        | `OK`                                |
> | `404`         | `application/json`                | `Dados não encontrados`                            |

##### Exemplo de Request Body
 ```json
{
  "chair": "b1",
  "value": 10
}
```

##### Exemplo de Response
 ```json
{
  "id": 1,
  "session_id": 1,
  "chair": "b1",
  "value": 10
}
```
</details>


<details>
 <summary><code>DELETE</code> <code><b>/movies/{movie_id}/sessions/{session_id}/tickets/:id</b></code> <code>(Este endpoint exclui um ingresso.)</code></summary>

##### Parameters
> MOVIE_ID

> SESSSION_ID

> TICKET_ID : ID

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `204`         | `application/json`        | `No content`                                |
> | `404`         | `application/json`                | `Dados não encontrados`                            |


</details>
### Principais Tecnologias

[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/docs/)

[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/pt)

[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/pt-br/)

[![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)](https://swagger.io/)

[![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
## Instalação

Instale my-project com npm

```bash
  npm install my-project
  cd my-project
```


### Equipe

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/iuricode">
        <img src="https://avatars3.githubusercontent.com/u/35975751" width="100px;" alt="Foto do Iuri Silva no GitHub"/><br>
        <sub>
          <b>Erek C. Santos</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/iuricode">
        <img src="https://avatars3.githubusercontent.com/u/106535940" width="100px;" alt="Foto do Iuri Silva no GitHub"/><br>
        <sub>
          <b>Felipe Ribeiro</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/iuricode">
        <img src="https://avatars3.githubusercontent.com/u/102433765" width="100px;" alt="Foto do Iuri Silva no GitHub"/><br>
        <sub>
          <b>Jhennyf Lima</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/iuricode">
        <img src="https://avatars3.githubusercontent.com/u/130326199" width="100px;" alt="Foto do Iuri Silva no GitHub"/><br>
        <sub>
          <b>Hugo Symon</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
