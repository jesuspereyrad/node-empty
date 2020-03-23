//////////////////////////
// Option template
//////////////////////////

const renderButton = (title, value=undefined) => ({
    content_type: "text",
    title: title,
    payload: '<POSTBACK_PAYLOAD>',
})

module.exports = (recipientId, optionObject) => {
    console.log('asd', optionObject.options.map(option => renderButton(option.label, option.value)))
    return ({
    recipient:{
        id: recipientId
    },
    messaging_type: "RESPONSE",
    message: {
        text: optionObject.title,
        quick_replies: optionObject.options.map(option => renderButton(option.label))
    }})
}
