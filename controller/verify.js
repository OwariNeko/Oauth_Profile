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
    let id =data.content.sub
     console.log( id)
        var profile =  await new mongoose().get({ identity:id }, 'profile');
        if(profile.error){
          console.error(profile.error)
            reject(profile)
        }
        console.debug(`get profile form mongoDB: ${JSON.stringify(profile)}`)
        console.log(profile)
        console.log(profile)
         var user = await Keycloak.findUser(id)
         var jsonProfile={}
         for(let data of profile )
         {
          jsonProfile.identity = data.identity
          jsonProfile.address =data.address
          jsonProfile.zipcode = data.zipcode
          jsonProfile.txid = data.txid
          jsonProfile.companyName =data.companyName
          jsonProfile.birthDay =data.birthDay
      
         }
         jsonProfile.username= user.username
         jsonProfile.email= user.email
         console.log(jsonProfile)
        var arrayProfile=[]
        arrayProfile.push(jsonProfile)
        console.log(arrayProfile)

        resolve(arrayProfile)
    
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
async function resetPassword (body)
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
          let id =data.content.sub
               var password = await Keycloak.resetPassword(id,body.newPassword)

      
              resolve(password)
          
          })
      }
module.exports = {
  getProfile:getProfile,
  getToken:getToken,
  resetPassword:resetPassword
}
