const router = require('express').Router();
const keycloak = require("../../controller/keycloakAdmin")

router.post('/register', (req, res, next) => {

    let functionName = '[API: POST /api/v1/register]';
  
    keycloak.register(req.body).then((profile) => {
      res.status(201);
    //   appendHeader(res)
    res.json(profile)
    })
      .catch((error) => {
        console.error(`${functionName} Failed to Create Invoice: ${error}`);
        // res.status(error.error.status);
        res.json({
          code: "500",
          message: `Failed `
        });
      });
  });
  
module.exports = router;