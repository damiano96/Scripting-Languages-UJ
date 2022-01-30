import React, { useContext } from 'react';
import Context from "../../../context/Context";

const ItemCard = ({id, title, price, category}) => {
    const context = useContext(Context);

    const addItemToCart = () => {
        const item = {
            id, title, price, category
        }
        context.addItemToCart({item});
    }

    return (
        <div className="col pt-1 p-1">
            <div className="card h-100">
                <div className="card-body">
                    <div className="row">
                        <div className="col-8">
                            <h5 className="card-title">{title}</h5>
                        </div>
                        <div className="col">
                            <span className="card-title">{category}</span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="text-muted"><em>Cena: {price} zł</em></div>
                    </div>
                    <div className="card-footer">
                        <div className="btn-group btn-group-sm pt-3">
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={addItemToCart}
                            >
                                Dodaj do koszyka
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemCard;