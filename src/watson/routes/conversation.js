

const ConversationStart = require('../middleware/dialog/conversationStart');
const ConversationMessage = require('../middleware/dialog/conversationMessage');
const ConversationEnd = require('../middleware/dialog/conversationEnd');
const ConversationHistory = require('../middleware/dialog/conversationHistory');
// const Interaction = require('../middleware/interaction/interaction');
// const Evaluate = require('../middleware/evaluate/evaluate');
// const Correction = require('../middleware/correction/correction');
// const DialogController = require('../controllers/dialog.controller');
const SecurityUtil = require("../services/securityUtil");
const AesUtil = require("../services/AesUtil");
const express = require('express')
const router = express.Router();
var mung = require('express-mung');

//middleware to access response body object
//intercepta y aplica esta funcion para todos los endpoints en /middleware
router.use(mung.json(
    function transform(body, req, res) {
        if (process.env.ENCRIPTION_ENABLE == "1") {
            body = AesUtil.encrypt(JSON.stringify(body), process.env.AES_KEY, process.env.AES_IV);
            res.contentType('text/plain');
        }

        return body;
    }
));

/**
 * Usar una sola funcion para desactivar mas facilmente
 */
const applySecutiry = (req, res, next) => {
    if (process.env.ENCRIPTION_ENABLE == "1") {
        SecurityUtil.decryptData(req, res, next);
    } else {
        next();
    }
}

/**
 * Detail: Endpoint necesario para iniciar una conversación con el asistente
 */
router.post('/conversation-start', applySecutiry, ConversationStart.validate('conversationStart'), ConversationStart.conversationStart);


/*
* Datail: Endpoint necesario para manejar las interacciones principales entre el usuario y el asistente, esto una vez se ha iniciado una conversación.
*/
router.post('/conversation-message', applySecutiry, ConversationMessage.validate('conversationMessage'), ConversationMessage.conversationMessage);

/**
 * Detail: Endpoint necesario para finalizar una conversación con el asistente
 */
router.post('/conversation-end', applySecutiry, ConversationEnd.validate('conversationEnd'), ConversationEnd.conversationEnd);

/**
 * Detail: Endpoint que tiene el objetivo de retornar el historial de interacciones de una conversación por medio del sessionId y parámetros de paginación
 */
router.post('/conversation-history', applySecutiry, ConversationHistory.validate('conversationHistory'), ConversationHistory.conversationHistory);

/**
 * Detail: Endpoint que tiene el objetivo guardar los datos en todas las instancias de una aplicacion de IBM cloud foundry
 */
router.post('/refresh-data', ConversationStart.validate('refreshData'), ConversationStart.refreshData);


/**
 * Detail: servicio web necesario para tomar feedback o corrección de una interacción por parte de un usuario
 */
// router.post('/correction', Correction.addCorrection);

/**
 * Detail: servicio web necesario para guardar el feedback dado por el usuario
 */
// router.post('/feedback', Interaction.getInteractionsBySession_ID);

/**
 * Detail: servicio web necesario para guardar la evaluación de un flujo o intención por parte del usuario
 */
// router.post('/evaluate', Evaluate.create);

/**
 * Detail: servicio web para finalizar sesiones y enviar correo de la conversación
 */
// router.post('/endsession', DialogController.finishSession);

module.exports = router;
