'use strict';
import KcAdminClient from 'keycloak-admin';
import config from '../config/config'
import mongoose from '../util/mongoose.js';
import profileModels from '../models/profile';
import {Issuer} from 'openid-client';

let server = config.server + "/auth"
let server2 = config.server + "/auth/realms/master"

// console.log(server)
let options = {
  baseUrl: server,
  realmName: 'master',
};

async function register(body) {
  return new Promise(async function (resolve, reject) {
    const kcAdminClient = new KcAdminClient(options);
    await kcAdminClient.auth({
      username: config.usernameAdmin,
      password: config.passwordAdmin,
      grantType: 'password',
      clientId: 'admin-cli',
    })
    // let users= await kcAdminClient.users.find()
    // console.log(users)
    var id = await kcAdminClient.users.create({
      realm: 'master',
      enabled: true,
      username: body.username,
      email: body.email,
      credentials: [
        {
          type: "password",
          temporary: "false",
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
async function findUser(userid) {
  return new Promise(async function (resolve, reject) {
    const kcAdminClient = new KcAdminClient(options);
    await kcAdminClient.auth({
      username: config.usernameAdmin,
      password: config.passwordAdmin,
      grantType: 'password',
      clientId: 'admin-cli',
    })
    let id = {id:userid}
    console.log(id)

   let users = await kcAdminClient.users.findOne(id)
    console.log(users.username)
    console.log(users.email)
    // let users= await kcAdminClient.users.find()
    // console.log(users)
    resolve(users)
  })

}
async function getToken(body) {
  return new Promise(async function (resolve, reject) {

    const keycloakIssuer = await Issuer.discover(
      server2,
    );

    const client = new keycloakIssuer.Client({
      client_id: body.client_id, // Same as `clientId` passed to client.auth()
    });

    // Use the grant type 'password'
    console.log(body)

    let tokenSet = await client.grant({
      grant_type: body.grant_type,
      username: body.username,
      password: body.password,
      client_id: body.client_id,
      client_secret: body.client_secret,
    });
    const refreshToken = tokenSet.refresh_token;
    const accessToken = tokenSet.access_token;

    // tokenSet = await client.refresh(refreshToken);
    // console.log(refreshToken)
    // Periodically using refresh_token grant flow to get new access token here
    resolve(
      {
        refreshToken: refreshToken,
        accessToken: accessToken

      }
    )

  })
}
async function getNewToken(body) {
  return new Promise(async function (resolve, reject) {

    const keycloakIssuer = await Issuer.discover(
      server2,
    );

    const client = new keycloakIssuer.Client({
      client_id:  body.client_id, // Same as `clientId` passed to client.auth()
      client_secret: body.client_secret
    });
    console.log(body)
    // Use the grant type 'password'

    // let tokenSet = await client.grant({
    //   grant_type: body.grant_type,
    //   refresh_token: body.refreshToken,
    //   client_id: body.client_id,
    //   client_secret: body.client_secret,
    // });
    // const refreshToken = tokenSet.refresh_token;
    let tokenSet = await client.refresh(body.refreshToken);
    // console.log(refreshToken)
    // Periodically using refresh_token grant flow to get new access token here
    resolve(
      {
        accessToken: tokenSet.access_token

      }
    )

  })
}
async function resetPassword(userid,newPassword) {
  return new Promise(async function (resolve, reject) {
    const kcAdminClient = new KcAdminClient(options);
    await kcAdminClient.auth({
      username: config.usernameAdmin,
      password: config.passwordAdmin,
      grantType: 'password',
      clientId: 'admin-cli',
    })
    await  kcAdminClient.users.resetPassword({
      id:userid,
      credential :  
        { temporary: false ,
          type: "password" ,
          value: newPassword
        } 
    })
    // let users= await kcAdminClient.users.find()
    // console.log(users)
    resolve(newPassword)
  })

}
module.exports = {
  register: register,
  getToken: getToken,
  getNewToken:getNewToken,
  findUser:findUser,
  resetPassword:resetPassword
}


