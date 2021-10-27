# Authorization with JWT 

This simple app aims to use jwt for authorization in AdonisJs. There is only one endpoint, that is `\me`. 
The endpoint aims to get information about user with parsing JWT in authorization header. 

This app (for now) only validate jwt issued by  https://sso.digitalservice.jabarprov.go.id/auth/realms/jabarprov. So, if you need to try this app, please contact ITDEV team for getting new account.

## Pre-Requisites
* [node 16.10.0](https://nodejs.org/en/download/)
* [npm 7.24.0](https://www.npmjs.com/package/download)
* [AdonisJS CLI](https://www.npmjs.com/package/@adonisjs/cli)
* [Postman](https://www.postman.com/downloads/) 

## Run Test
```
adonis test
```

## Run App
* Clone this repository
``` 
git clone https://github.com/jabardigitalservice/servicedesk-backend 
```
* Install dependencies
``` 
npm install 
```
* Run app
```
adonis serve --dev
```

App will running on port http://localhost:3333. So, go to  http://localhost:3333/me and input your JWT. Good luck! 

---

If there are any inputs, please contact us through email (selvyfiriani@gmail.com, anti_rei@yahoo.com) Thanks!
