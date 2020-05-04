module.exports = (payload) => ({
    component: {
        type:  payload.type,
        cardType: payload.cardType,
        cards: payload.cards,
        page: payload.page,
        limit: payload.limit,
        filters: payload.filters,
        showMoreButton: payload.showMoreButton,
        color: payload.color,
        showArrows: payload.showArrows,

    } 
})