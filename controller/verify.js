const mongoose = require('../util/mongoose.js');
const profileModels =require('../models/profile');
const config =require('../config/config')


async function getProfile (body)
{
  return new Promise(async function (resolve, reject) {

const keycloak = require('keycloak-backend')({
    "realm": "master",
    "auth-server-url": config.server,
    "client_id": "admin-cli",
    "username": config.usernameAdmin,
    "password": config.passwordAdmin
  });
  // keycloak.accessToken.get().then((accessToken)=>{
    var data= await  keycloak.jwt.verify(body.accessToken)
     console.log( data.content.sub)
        var profile =  await new mongoose().get({ identity: data.content.sub }, 'profile');
        if(profile.error){
          console.error(profile.error)
            reject(profile)
        }
        console.debug(`get profile form mongoDB: ${JSON.stringify(profile)}`)

        resolve(profile)
    
    })

  // })
}
module.exports = {
  getProfile:getProfile
}
