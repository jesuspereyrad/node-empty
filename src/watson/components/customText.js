module.exports = (payload) => ({
    component: {
        type:  payload.type,
        title: payload.title,
        subtitle: payload.subtitle,
        description: payload.description,
    } 
})