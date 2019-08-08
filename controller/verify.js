const mongoose = require('../util/mongoose.js');
const profileModels =require('../models/profile');
const config =require('../config/config')
const Keycloak = require("./keycloakAdmin")

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
	  console.log(body.accessToken)
  // keycloak.accessToken.get().then((accessToken)=>{
    try {
      var data= await  keycloak.jwt.verify(body.accessToken)

    } catch (error) {
      reject({
        status:401,
        message:"Token expire"
      })
      return 0;
    }
     console.log( data.content.sub)
        var profile =  await new mongoose().get({ identity: data.content.sub }, 'profile');
        if(profile.error){
          console.error(profile.error)
            reject(profile)
        }
        console.debug(`get profile form mongoDB: ${JSON.stringify(profile)}`)
         var user = await Keycloak.findUser(data.content.sub)
         profile.username= user.username
         profile.email= user.email

        resolve(profile)
    
    })
}
    async function getToken (body)
    {
      return new Promise(async function (resolve, reject) {
   console.log(body)    
    const keycloak = require('keycloak-backend')({
        "realm": "master",
        "auth-server-url": config.server,
        "client_id": body.client_id,
        "client_secret":body.client_secret,
        "username": body.username,
        "password": body.password
      });
      // keycloak.accessToken.get().then((accessToken)=>{
        var token= await  keycloak.accessToken.get()
console.log(token)
            resolve(token)
        
        })
    
  // })
      }
module.exports = {
  getProfile:getProfile,
  getToken:getToken
}
