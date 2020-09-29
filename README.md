# Arkademy Task Rest API - Hiring Apps 

[![Arkademy](https://www.metranet.co.id/wp-content/uploads/2019/08/arkademy.png)](https://https://www.arkademy.com/)

[![Express.js](https://camo.githubusercontent.com/7cbc9dc51685ae8974c974e1a1f0f137ddc77caa/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f457870726573732e6a732d342e782d6f72616e67652e7376673f7374796c653d726f756e6465642d737175617265)](https://expressjs.com/en/starter/installing.html) [![Node.js](https://camo.githubusercontent.com/e7f50cd316f69b3eb3d6b8796af1e894f1066493/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f64652e6a732d762e31322e31332d677265656e2e7376673f7374796c653d726f756e6465642d737175617265)](https://nodejs.org/)


### Installation

requires [Node.js](https://nodejs.org/)  to run.

Install the dependencies and devDependencies and start the server.

```bash
$ npm install --save
```

Install dotenv
```bash
$ npm install dotenv --save
```
and Make Your .env 

### Start

```bash
$ nodemon index.js
```

### Postman Request
- Register User Recruiter/Worker

    |HTTP Verb      | Path | Action  | Info |
    |---------------|------|---------|------|
    | POST| /account_recruiter/register|create|register account recruiter|
    | POST| /account_recruiter/login|login|login account recruiter|
    
- Register User Worker

    |HTTP Verb      | Path | Action  | Info |
    |---------------|------|---------|------|
    | POST| /account_worker/register|create|register account worker|
    | POST| /account_worker/login|login|login account worker|
    
- Profile Recruiter

    |HTTP Verb      | Path | Action  | Info |
    |---------------|------|---------|------|
    | GET| /recruiter/|index|Show all recruiter|
    | GET| /recruiter/:id|show|Show recruiter by id recruiter|
    | POST| /recruiter/|create| Create Profile recruiter|
    | PATCH / PUT| /recruiter/:id|Update|Update Profile Recruiter by id recruiter|
    | DELETE| /recruiter/:id|Delete|Delete Profile Recruiter by id recruiter|
    
- Profile Worker

    |HTTP Verb      | Path | Action  | Info |
    |---------------|------|---------|------|
    | GET| /worker/|index|Show all worker|
    | GET| /worker/:id|show|Show worker by id worker|
    | POST| /worker/|create| Create Profile worker|
    | PATCH / PUT| /worker/:id|Update|Update Profile Worker by id worker|
    | DELETE| /worker/:id|Delete|Delete Profile Worker by id worker|
    

