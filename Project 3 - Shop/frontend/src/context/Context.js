import { createContext } from "react";

const Context = createContext({
    shopCart           : [],
    addItemToCart      : item => {},
    removeItemFromCart : itemId => {},
    increaseCountOfItem: itemId => {},
    reduceCountOfItem  : itemId => {},
    clearShopCart  : () => {}
});

export default Context;