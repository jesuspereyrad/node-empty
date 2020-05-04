const connector = require('../api');
const assistant = connector.WatsonAssistantConnection();
const CONFIG = require('../config');

  /**
 * Conversation end Controller
 * 
 * Get the session id and converstation to end a conversation, then call conversation end service
 * to handle the request action.
 */
exports.module = (req, res) => {
    const { sessionId = undefined, conversationId = undefined} = req.body;

    if(sessionId && conversationId) {
        return services.conversation.endService(sessionId, conversationId)
            .then((data) => {
                return res.send(data)
            })
            .catch((err) => {
                return res.status(err.code).send(err)
            })
    }
    return res.status(500).send("Request data not found");
}