import { useContext } from "react";
import Context from "../../../context/Context";

const ShoppingCartItem = ({id, title, category, price, quantity}) => {
    const context = useContext(Context);

    const reduceCountOfItem = (event) => {
        context.reduceCountOfItem({itemId: id})
    }

    const increaseCountOfItem = (event) => {
        context.increaseCountOfItem({itemId: id});
    }

    return (
        <div className="row border-top">
            <div className="row main align-items-center pt-2 pb-2">
                <div className="col-2">
                    <div className="row text-muted">{category}</div>
                </div>
                <div className="col">
                    <div className="row">{title}</div>
                </div>
                <div className="col">
                    <span className="plus-minus-buttons" onClick={reduceCountOfItem}>-</span>
                    <span> {quantity} </span>
                    <span className="plus-minus-buttons" onClick={increaseCountOfItem}>+</span>
                </div>
                <div className="col">
                    {price} zł
                </div>
                <div className="col-1">
                    <button className="btn-close" onClick={() => context.removeItemFromCart({itemId: id})} />
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartItem;