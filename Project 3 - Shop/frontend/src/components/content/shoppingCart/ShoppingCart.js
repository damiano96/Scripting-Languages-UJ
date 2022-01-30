import React, {useContext} from 'react';
import Context from "../../../context/Context";
import ShoppingCartItem from "./ShoppingCartItem";
import ShoppingCartSummary from "./ShoppingCartSummary";
import {useLocation} from "react-router-dom";
import './style.css';

const ShoppingCart = () => {
    const context = useContext(Context);

    const getAllElementsInCart = () => {
        return context.shopCart
            .map(el => el.quantity)
            .reduce((previousValue, currentValue) => {
                return previousValue + currentValue;
            }, 0)
    }

    const calculateTotalSum = () => {
        return context.shopCart
            .map(el => el.quantity * el.price)
            .reduce((previousValue, currentValue) => {
                return previousValue + currentValue;
            }, 0)
    }

    const noItemsInCart = () => {
        return (
            <div className="alert alert-primary">
                Brak przedmiotów w koszyku
            </div>
        )
    }

    return (
        <div className="container-fluid p-0">
            <div className="row">
                <div className="col-8 cart px-4 pt-2">
                    <div className="title">
                        <div className="row">
                            <div className="col">
                                <h4>Koszyk zakupów</h4>
                            </div>
                            <div className="col align-self-center text-right text-muted">Ilosc: {getAllElementsInCart()}</div>
                        </div>
                    </div>
                    {context.shopCart.length > 0 ?
                        context.shopCart.map((el, index) =>
                            <ShoppingCartItem
                                key={index}
                                id={el.id}
                                title={el.title}
                                category={el.category}
                                price={el.price}
                                quantity={el.quantity}
                            />

                    ) :  noItemsInCart()}
                </div>
                {context.shopCart.length > 0
                    && <ShoppingCartSummary totalCost={calculateTotalSum()}/>
                }
            </div>
        </div>
    )
}


export default ShoppingCart;