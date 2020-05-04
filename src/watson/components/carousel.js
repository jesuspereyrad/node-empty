module.exports = (payload) => ({
    component: {
        type:  payload.type,
        label: payload.label,
        color: payload.color,
        butonType: payload.buttonType,
        actions: payload.actions,
        size: payload.size,
    } 
})