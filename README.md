# 🚀 ProjectHub API

API REST para gerenciamento de usuários, projetos e tarefas.

Desenvolvida com Node.js, Express, Sequelize e MySQL.
Inclui autenticação com JWT e criptografia de senha com Bcrypt.

---

## 🛠 Tecnologias

- Node.js
- Express
- Sequelize (ORM)
- MySQL
- JWT
- Bcrypt
- Docker

---

## 📌 Funcionalidades

✔ Registro e login de usuários  
✔ Autenticação com JWT  
✔ CRUD completo de Projetos  
✔ CRUD completo de Tasks  
✔ Relacionamentos entre entidades  
✔ Estrutura organizada em arquitetura MVC  

---

## 🗂 Modelagem do Banco

```mermaid
erDiagram
    USERS ||--o{ PROJECTS : "gerencia"
    PROJECTS ||--o{ TASKS : "contém"
    USERS ||--o{ TASKS : "atribuído a"

    USERS {
        int id PK
        string name
        string email
        string password
    }
    PROJECTS {
        int id PK
        string name
        text description
        int user_id FK
    }
    TASKS {
        int id PK
        string title
        enum status
        int project_id FK
        int assigned_user_id FK
    }
