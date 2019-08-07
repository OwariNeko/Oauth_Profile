'use strict';
 import KcAdminClient from 'keycloak-admin';
import config from '../config/config'
import mongoose  from '../util/mongoose.js';
import profileModels from '../models/profile';

 let server=config.server+"/auth"
// console.log(server)
 let options = {
  baseUrl: server,
  realmName: 'master',
};
 
async function register(body){
  return new Promise(async function (resolve, reject) {
  const kcAdminClient= new KcAdminClient(options);
  await kcAdminClient.auth({
  username: config.usernameAdmin,
  password: config.passwordAdmin,
  grantType: 'password',
  clientId: 'admin-cli',})
  // let users= await kcAdminClient.users.find()
  // console.log(users)
 var id = await kcAdminClient.users.create({
      realm: 'master',
      enabled:true,
      username: body.username,
      email: body.email,
      credentials : [ 
        { type: "password" ,
          temporary: "false" ,
          value: body.password 
        }] 
    })
    console.log(id)
      var profile = {
          identity: id.id,
          companyName: body.companyName,
          txid: body.txid,
          birthDay: body.birthDay,
          address: body.address,
          zipcode: body.zipcode
      }
      const models = new profileModels(profile)
      // add user in mongoDB
      await models.save()
      
      console.debug(`Add productObject to mongoDB: ${JSON.stringify(profile)}`)

      resolve(profile)
  })
     
}
  
// // Authorize with username / password
//  kcAdminClient.auth({
//   username: 'adminnimble',
//   password: '1234566',
//   grantType: 'password',
//   clientId: 'admin-cli',
// }).then(()=>{
//   //  kcAdminClient.users.find().then((users)=>{
//   //   console.log(users)
//   //  });
 
// //   kcAdminClient.setConfig({
// //   realmName: 'another-realm',
// // });
// //   //  kcAdminClient.groups.find().then((users)=>{
// //   //   console.log(users)
// //   //  });

//   // kcAdminClient.users.del({
//   //   id: 'e551de1e-c4d5-4b9c-b19a-f9e744654323',
//   //   }).then(()=>{
//   //  });
//   // kcAdminClient.users.del({
//   //   id: 'e551de1e-c4d5-4b9c-b19a-f9e744654323',
//   //   }).then(()=>{
//   //  });
 
// })
module.exports = {
  register:register
}


