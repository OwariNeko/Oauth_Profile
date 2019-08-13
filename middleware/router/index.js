const router = require('express').Router();
const keycloak = require("../../controller/keycloakAdmin")
const token = require("../../controller/verify")
router.post('/register', (req, res, next) => {

    let functionName = '[API: POST /api/v1/register]';
  
    keycloak.register(req.body).then((profile) => {
      res.status(201);
    //   appendHeader(res)
    res.json(profile)
    })
      .catch((error) => {
        console.error(`${functionName} Failed : ${error}`);
        // res.status(error.error.status);
        res.json({
          code: "500",
          message: `Failed `
        });
      });
  });
 
router.post('/getProfile', (req, res, next) => {
  let functionName = '[API: POST /api/v1/getProfile]';
  token.getProfile(req.body).then((profile) => {
    res.status(201);
  //   appendHeader(res)
  res.json(profile)
  })
    .catch((error) => {
      console.error(`${functionName} Failed : ${error.message}`);
      res.status(401);
      res.json({
        code: error.status,
        message: error.message
      });
    });
});
router.post('/getToken', (req, res, next) => {
  let functionName = '[API: POST /api/v1/getToken]';
  keycloak.getToken(req.body).then((Atoken) => {
    res.status(201);
    console.log(Atoken)
  //   appendHeader(res)
  res.json(Atoken)
  })
    .catch((error) => {
      console.error(`${functionName} Failed : ${error}`);
      // res.status(error.error.status);
      res.json({
        code: "500",
        message: `Failed `
      });
    });
});
router.post('/getNewToken', (req, res, next) => {
  let functionName = '[API: POST /api/v1/getNewToken]';
  keycloak.getNewToken(req.body).then((Atoken) => {
    res.status(201);
    console.log(Atoken)
  //   appendHeader(res)
  res.json(Atoken)
  })
    .catch((error) => {
      console.error(`${functionName} Failed : ${error}`);
      // res.status(error.error.status);
      res.json({
        code: "500",
        message: `Failed `
      });
    });
});
router.post('/resetPassword', (req, res, next) => {
  let functionName = '[API: POST /api/v1/resetPassword]';
  token.resetPassword(req.body).then((Password) => {
    res.status(201);
    console.log(Password)
  //   appendHeader(res)
  res.json(Password)
  })
    .catch((error) => {
      console.error(`${functionName} Failed : ${error}`);
      // res.status(error.error.status);
      res.json({
        code: "500",
        message: `Failed `
      });
    });
});
module.exports = router;