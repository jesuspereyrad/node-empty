//////////////////////////
// Sending helpers
//////////////////////////
module.exports = (recipientId, imageUrl) => ({
    recipient:{
        id: recipientId
    },
    message: {
        attachment: {
            type: "image",
            payload: {
                url: imageUrl,
                is_reusable: true,
            }
        }
    } 
})