require('dotenv').config()
const CustomError = require('../../errors/custom-error');
const DialogController = require('../../controllers/dialog.controller');
const AuditController = require('../../controllers/audit');
const { logger } = require('../../services/logger')

//para debug> deshabilitar quitando el nombre del debug en el .env
var createDebug = require('debug');
const debug = createDebug('conversation')

var AssistantV2 = require('ibm-watson/assistant/v2'); // watson sdk
var WATSON_ASSISTANT_INSTANCES = [];


const createInstance = (version, username, password, url, timeout, headers, region) => {
    try {
        WATSON_ASSISTANT_INSTANCES.push(
            ({
                "region": region,
                "assistant_id": ASSISTANT_ID_DALLAS,
                "assistant": new AssistantV2({
                    version,
                    username,
                    password,
                    url,
                    timeout,
                    headers,
                })
            })
        )
    } catch(error) {
        logger.log('error', `file:conversation -function: assistantInstant - error: ${error}`);
    }
}

// #Watson assistant Environment variables Dallas
createInstance('2018-11-08', process.env.ASSISTANT_USERNAME, process.env.ASSISTANT_PASSWORD_DALLAS, process.env.ASSISTANT_URL_DALLAS, 12 * 1000, {'X-Watson-Learning-Opt-Out': 'false'})

// #Watson assistant Environment variables Sydney
createInstance('2018-11-08', process.env.ASSISTANT_USERNAME, process.env.ASSISTANT_PASSWORD_SYDNEY, process.env.ASSISTANT_URL_SYDNEY, 8 * 1000, {'X-Watson-Learning-Opt-Out': 'false'})

// #Watson assistant Environment variables Frankfurt
createInstance('2018-11-08', process.env.ASSISTANT_USERNAME, process.env.ASSISTANT_PASSWORD_FRANKFURT, process.env.ASSISTANT_URL_FRANKFURT, 8 * 1000, {'X-Watson-Learning-Opt-Out': 'false'})

// #Watson assistant Environment variables London
createInstance('2018-11-08', process.env.ASSISTANT_USERNAME, process.env.ASSISTANT_PASSWORD_LONDON, process.env.ASSISTANT_URL_FRANKFURT, 8 * 1000, {'X-Watson-Learning-Opt-Out': 'false'})

// #Watson assistant Environment variables Tokyo
createInstance('2018-11-08', process.env.ASSISTANT_USERNAME, process.env.ASSISTANT_PASSWORD_TOKYO, process.env.ASSISTANT_URL_TOKYO, 8 * 1000, {'X-Watson-Learning-Opt-Out': 'false'})

// #Watson assistant Environment variables Washington DC
createInstance('2018-11-08', process.env.ASSISTANT_ID_WASHINGTON, process.env.ASSISTANT_PASSWORD_WASHINGTON, process.env.ASSISTANT_URL_WASHINGTON, 8 * 1000, {'X-Watson-Learning-Opt-Out': 'false'})

console.log("WATSON_ASSISTANT_INSTANCES:", WATSON_ASSISTANT_INSTANCES);

/**
 * Generar una instancia de watson assistant segun la region
 * @param {String} region la region actual para la cual se genero una instancia de WA
 */
const getActualInstance = (region) => {
  let instance = WATSON_ASSISTANT_INSTANCES.find((element) => {
    return element.region == region;
  });


  if (instance) {
    return {
      "actualRegion": region,
      "assistant": instance["assistant"],
      "assistant_id": instance["assistant_id"]
    };
  } else if (WATSON_ASSISTANT_INSTANCES.length) {
    return {
      "actualRegion": region,
      "assistant": WATSON_ASSISTANT_INSTANCES[0]["assistant"],
      "assistant_id": WATSON_ASSISTANT_INSTANCES[0]["assistant_id"]
    };
  }
  else {
    return {
      "actualRegion": region,
      "assistant": null,
      "assistant_id": null
    };
  }
}

/**
 * Genera una instancia de watson assistant con las credenciales de la siguiente region en caso que la anterior no responda
 * @param {String} actualRegion region actual de la cual se creo una instancia de WA
 */
const getNextInstance = (actualRegion) => {

  if (actualRegion) {
    let currentPosition = WATSON_ASSISTANT_INSTANCES.findIndex((element) => {
      return element.region == actualRegion;
    });

    debug("getNextInstance currentPosition: ", currentPosition);

    if (WATSON_ASSISTANT_INSTANCES.length > (currentPosition + 1)) {
      return {
        "actualRegion": WATSON_ASSISTANT_INSTANCES[(currentPosition + 1)]["region"],
        "assistant": WATSON_ASSISTANT_INSTANCES[(currentPosition + 1)]["assistant"],
        "assistant_id": WATSON_ASSISTANT_INSTANCES[(currentPosition + 1)]["assistant_id"]
      };//retorna la siguiente posicion
    }
    else {//si no retornar null
      return {
        "actualRegion": actualRegion,
        "assistant": null,
        "assistant_id": null
      };
    }
  } else if (WATSON_ASSISTANT_INSTANCES.length) {//por defecto obtener la primera posici'on si existe
    return {
      "actualRegion": WATSON_ASSISTANT_INSTANCES[0]["region"],
      "assistant": WATSON_ASSISTANT_INSTANCES[0]["assistant"],
      "assistant_id": WATSON_ASSISTANT_INSTANCES[0]["assistant_id"]
    };
  } else {
    return {
      "actualRegion": actualRegion,
      "assistant": null,
      "assistant_id": null
    };
  }
}


/**
 * Funcionalidad para crear una sesion en watson assistant
 * @param {strint} region la region actual para la cual se desea hacer la peticion a WA
 * @param {strint} assistant_id watson assistant id
 * @param {Objext} assistant instancia de watson assistant
 */
const createSession = (region, assistant_id, assistant, conversationId) => {

  return new Promise((resolve, reject) => {
    debug("Petición a watson assistant createSession: assistant_id: ", assistant_id, " assistant:", assistant);

    assistant.createSession({
      assistant_id: assistant_id
    }, async function (error, response) {
      if (error) {
        logger.log('error', `region:${region} - conversationId:${conversationId}  - file:conversation -function: createSession - error: ${error}`);
        debug("error first createSession: ", error);
        assistantInstance = getNextInstance(region);
        let maxIterations = 6;
        let iteraction = 1;

        while (assistantInstance.assistant) {

          if (iteraction > maxIterations) {
            return reject(null);
          }
          let successResponse = null;

          debug("Petición a watson assistant createSession: assistant_id: ", assistantInstance.assistant_id, " assistant:", assistantInstance.assistant);

          await new Promise((resolve, reject) => {
            assistantInstance.assistant.createSession({
              assistant_id: assistantInstance.assistant_id
            }, function (error, response) {
              if (error) {
                logger.log('error', `region:${assistantInstance.actualRegion} - conversationId:${conversationId}  - file:conversation -function: createSession - error: ${error}`);

                debug("error createSession: ", error);
                return reject(error);
              } else {
                return resolve({
                  "actualRegion": assistantInstance.actualRegion,
                  "assistant": assistantInstance.assistant,
                  "session_id": response.session_id,
                  "assistant_id": assistantInstance.assistant_id
                });
              }
            });
          }).then((response) => {
            successResponse = response;
          }).catch((error) => {
            debug(" createSession region: ", assistantInstance.actualRegion, " failed");
          });
          if (successResponse) {
            return resolve(successResponse);
          }

          assistantInstance = getNextInstance(assistantInstance.actualRegion);
          iteraction += 1;
        }
        return reject(error);
      }
      else if (!response.session_id) {
        return reject(null);
      }
      else {
        return resolve({
          "actualRegion": region,
          "assistant": assistant,
          "session_id": response.session_id,
          "assistant_id": assistant_id
        });
      }
    });
  });
}


/**
 * Enviar petición al servicio de watson assistant, ya sea en el inicio de conversación o para continuar la conversación.
 * @param {string} text input del usuario
 * @param {string} conversationId id de la conversación generada
 * @param {string} waSessionId id de sesion activo de watson assistant
 * @param {string} region region de donde se creo la sesion de assistant
 * @param {string} assistant instancia de watson assistant según la región
 * @param {string} lastContext el contexto de la conversación
 * @param {Object} contextVariables objeto con variables de contexto que se desean pasar en la peticion inicial
 */
const sendMessage = (text, conversationId, waSessionId, region, assistant_id, assistant, lastContext, contextVariables) => {

  var newContext = {
    global: {
      system: {
        turn_count: 0
      }
    },
    "skills": {
      "main skill": {
        "user_defined": {//colocar las variables de contexto con las que se desee iniciar
          "conversationId": conversationId
        }
      }
    }
  };

  //anadir variables de contexto iniciales
  if (contextVariables) {
    for (const key in contextVariables) {
      if (contextVariables.hasOwnProperty(key)) {
        const contextVar = contextVariables[key];
        newContext["skills"]["main skill"]["user_defined"][key] = contextVar;//agregar la variable
      }
    }
  }

  //si ya había un context lo envía, sino crea uno nuevo
  lastContext = lastContext ? lastContext : newContext;

  if (lastContext && ("global" in lastContext)) {//aumentar el registro de peticiones 
    lastContext.global.system.turn_count += 1;
  }

  //la primera vez no se envía un texto
  var input = (text) ? text : "";

  //evaluar restart del dialog
  var restartDialog = (("skills" in lastContext) && ("restartDialog" in lastContext["skills"]["main skill"]["user_defined"])) ? lastContext["skills"]["main skill"]["user_defined"].restartDialog : false;

  //evaluar la primera interacción para nodos de tipo slot
  if (("skills" in lastContext) && ("firstInteraction" in lastContext["skills"]["main skill"]["user_defined"])) {
    if (lastContext["skills"]["main skill"]["user_defined"].firstInteraction == true || lastContext["skills"]["main skill"]["user_defined"].firstInteraction == null) {//si esta en true ponerlo en false
      lastContext["skills"]["main skill"]["user_defined"].firstInteraction = false;
    }

  }

  var payload = {
    assistant_id: assistant_id,
    session_id: waSessionId,
    context: lastContext,
    input: {
      message_type: 'text',
      text: input,
      options: {
        debug: true,
        restart: restartDialog,
        alternate_intents: true,
        return_context: true
      }
    }
  };

  debug("message assistant_id: ", assistant_id, " -- waSessionId: ", waSessionId);

  return new Promise((resolve, reject) => {
    debug("Petición a watson assistant message:");
    assistant.message(payload, async function (error, data) {
      if (error) {
        debug("assistant message : ", error);

        const status = (error.code !== undefined && error.code > 0) ? error.code : 500;
        //validar si el code es 404 y el message Invalid Session, esto para crear otra sesion
        if (status == 404 || (error.message && error.message.toLowerCase() == "invalid session")) {
          //crear la sesión de watson assistant
          await createSession(region, assistant_id, assistant, conversationId).then((response) => {
            if (!response) {
              throw new CustomError("Error al crear la sesion de watson assistant", 500, []);
            } else {
              waSession = response;
            }
          }).catch((error) => {
            throw new CustomError("Error al crear la sesion de watson assistant", 500, []);
          });
          if (!waSession) {
            throw new CustomError("Error al crear la sesion de watson assistant", 500, ["createSession"]);
          }

          //y llamar nuevamente al servicio
          var sendMessageResponse = await sendMessage(text, conversationId, waSession.session_id, waSession.actualRegion, waSession.assistant_id, waSession.assistant, lastContext);
          if (sendMessageResponse) {
            return resolve(sendMessageResponse);
          } else {
            return reject(null);
          }
        } else {
          //intentar con la siguiente region
          assistantInstance = getNextInstance(region);
          if (assistantInstance.assistant) {//hacer la siguiente peticion
            //crear la sesión de watson assistant con la nueva region
            await createSession(assistantInstance.actualRegion, assistantInstance.assistant_id, assistantInstance.assistant, conversationId).then((response) => {
              if (!response) {
                throw new CustomError("Error al crear la sesion de watson assistant", 500, ["createSession"]);
              } else {
                waSession = response;
              }
            }).catch((error) => {
              throw new CustomError("Error al crear la sesion de watson assistant", 500, ["createSession"]);
            });
            if (!waSession) {
              throw new CustomError("Error al crear la sesion de watson assistant", 500, ["createSession"]);
            }
            //y llamar nuevamente al servicio
            var sendMessageResponse = await sendMessage(text, conversationId, waSession.session_id, waSession.actualRegion, waSession.assistant_id, waSession.assistant, lastContext);
            if (sendMessageResponse) {
              return resolve(sendMessageResponse);
            } else {
              return reject(null);
            }

          } else {//si es la ultima instancia simplemene retornar
            logger.log('error', `conversationId: ${conversationId} - file:conversation -function: sendMessage - error: ${error}`);
            return reject(null);
          }
        }
      } else {
        debug("conversationResult", JSON.stringify(data, null, 2));
        if (data.context && ("skills" in data.context) && ("user_defined" in data.context["skills"]["main skill"])) {//poner el restart en false 
          data.context["skills"]["main skill"]["user_defined"].restartDialog = false;
        }

        let assistanResponse = updateMessage(payload, data);
        assistanResponse = Object.assign(assistanResponse, { waSessionId, region });
        return resolve(assistanResponse);
      }
    });
  });
}


/**
 * Updates the response text using the intent confidence
 * @param  {Object} input The request to the Conversation service
 * @param  {Object} response The response from the Conversation service
 * @return {Object}          The response with the updated message
 */
function updateMessage(input, response) {
  if (!response.output) {
    response.output = {};
  } else {
    return response;
  }
}


module.exports = {
  getActualInstance,
  getNextInstance,
  createSession,
  sendMessage
}