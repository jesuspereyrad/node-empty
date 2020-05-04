const {refreshService} = require('../../controller/data')
const axios = require('axios');

const refreshData = (req, res, next) => {
    if(data) {
        
    }
    req.getValidationResult() // to get the result of above validate fn
      .then(async () => {
        //resultado de las validaciones iniciales de parámetros
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array() });
        }
        debug("El valor del request: ", req.body);
        try {
          let encryptedData = req.body.data;
          let sessionId = req.body.sessionId;
  
          writeData(sessionId, encryptedData);//escribir la data de forma desatendida
  
          res.status(200).send({ "success": "ok" });
        } catch (error) {
          logger.log('error', `conversationId:${sessionId} - file:conversationStart -function:conversationStart:refreshData - error: ${error}`);
          debug("Error refreshData:", error);
          res.status(500).send({ "error": error });
        }
  
      }).catch(next);
  }