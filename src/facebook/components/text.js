//////////////////////////
// Sending helpers
//////////////////////////
module.exports = (recipientId, messageText) => ({
      recipient: {
        id: recipientId
      },
      message: {
        text: messageText
      }
})