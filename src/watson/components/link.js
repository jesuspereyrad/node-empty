module.exports = (payload) => ({
    component: {
        type:  payload.type,
        url: payload.url,
        label: payload.label,
        placeholder: payload.placeholder,
    } 
})