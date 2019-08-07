const keycloak = require('keycloak-backend')({
    "realm": "master",
    "auth-server-url": "http://54.169.66.243:8080",
    "client_id": "admin-cli",
    "username": "adminnimble",
    "password": "1234566"
  });
  keycloak.accessToken.get().then((accessToken)=>{
    keycloak.jwt.verify(accessToken).then((Token)=>{
        console.log(Token)
    })

  })