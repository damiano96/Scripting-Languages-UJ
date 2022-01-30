const addProductToShoppingCart = (item, state) => {
    const actualCart = [...state];
    const findDuplicate = actualCart.findIndex(cart => cart.id === item.id);
    if (findDuplicate >= 0) {
        actualCart[findDuplicate].quantity += 1;
    } else {
        actualCart.push({...item, quantity: 1});
    }
    return [...actualCart];
}

const removeProductFromShoppingCart = (itemId, state) => {
    const actualCart = [...state];
    const itemIndex = actualCart.findIndex(cart => cart.id === itemId);
    actualCart.splice(itemIndex, 1);
    return [...actualCart];
}

const increaseCountOfItem = (itemId, state) => {
    const actualCart = [...state];
    const itemIndex = actualCart.findIndex(cart => cart.id === itemId);
    actualCart[itemIndex].quantity += 1;
    return [...actualCart];
}

const reduceCountOfItem = (itemId, state) => {
    const actualCart = [...state];
    const itemIndex = actualCart.findIndex(cart => cart.id === itemId);
    if (actualCart[itemIndex].quantity > 1) {
        actualCart[itemIndex].quantity -= 1;
    }
    return [...actualCart];
}

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return addProductToShoppingCart(action.item, state);
        case "REMOVE":
            return removeProductFromShoppingCart(action.itemId, state);
        case "INCREASE":
            return increaseCountOfItem(action.itemId, state);
        case "REDUCE":
            return reduceCountOfItem(action.itemId, state);
        case "CLEAR":
            return []
        default:
            return state;
    }
}

export default reducer;