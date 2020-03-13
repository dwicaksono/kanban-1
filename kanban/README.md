# Kanban list API

Link Hosting: 

```
https://kanban-dwicaksono.firebaseapp.com
```

Link Server :

```
https://kanban-dimas.herokuapp.com
```

#### Before you do anything else..

```
$ npm install
```



## .ENV Tempelates

```
SECRET="Bissmillah"
DEFAULT_PASS="1234567"
GOOGLE_ID="362042157345-lkhu4o1p6f96kacjqad7ff0gd27uff82.apps.googleusercontent.com"
```



## Database

- Postgres 
- Sequelize 



## Main Routes Todos

| Routes |
| :----: |
| /tasks |



## Todos Routes

| Routes  | Method | Body                                                         |      | Descriptions                        |
| ------- | ------ | ------------------------------------------------------------ | ---- | ----------------------------------- |
| /       | get    |                                                              |      | returns all tasks on db             |
| /       | post   | title:<string><br/> status:<string><br/> description:<string><br/> |      | Create tasks                        |
| /:id    | get    |                                                              |      | returns a kansan based on params id |
| /:patch | put    | Category:<string><br>                                        |      | update a category                   |
| /:id    | delete |                                                              |      | delete based on params id           |



## Main Routes Users

| Routes |      |
| ------ | ---- |
| /users |      |



## Users Routes

| Routes    | Method | Descriptions                                                 |
| --------- | ------ | ------------------------------------------------------------ |
| /register | post   | register user with username (string)<br> email (string)<br>email(string)<br> |
| /login    | post   | login user data form email(string)<br> password(string)      |
|           |        |                                                              |

# Middlewares

This app uses 2 middlewares **Authentication** and **ErrorHandler**



### Postman API Documentasi :

```
https://documenter.getpostman.com/view/3757275/SzKPV1eK
```

