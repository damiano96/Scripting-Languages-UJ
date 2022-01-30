import { useReducer } from "react";
import Context from "./Context";
import reducer from "./reducer";

const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <Context.Provider
            value={{
                shopCart: state,
                addItemToCart: ({item}) => dispatch({ type: "ADD", item }),
                removeItemFromCart: ({itemId}) => dispatch({type: "REMOVE", itemId}),
                increaseCountOfItem: ({itemId}) => dispatch({type: "INCREASE", itemId}),
                reduceCountOfItem: ({itemId}) => dispatch({type: "REDUCE", itemId}),
                clearShopCart: () => dispatch({type: "CLEAR"})
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default Provider;