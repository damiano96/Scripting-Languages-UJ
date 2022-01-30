import MakeOrderModal from "./MakeOrderModal";
import {useState} from "react";

const ShoppingCartSummary = ({totalCost}) => {
    const [madeOrder, setMadeOrder] = useState(false);
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [address, setAddress] = useState(null);
    const [displayError, setDisplayError] = useState(false);

    const createOrder = () => {
        if (name && surname && address) {
            setMadeOrder(true);
            setDisplayError(false)
        } else {
            setDisplayError(true)
        }
    }

    const renderErrorAddItem = () => {
        return (
            <div className="alert alert-danger" role="alert">
                Wypełnij wszystkie pola!
            </div>
        )
    }

    return (
        <div className="col summary-shopping-cart p-4">
            <div className="row mb-4 border-bottom">
                <h4>Podsumowanie</h4>
            </div>
            <div className="row summary-form">
                {displayError && renderErrorAddItem()}
                <div className="row mb-1">
                    <label htmlFor="inputName" className="col-sm-2 me-3 col-form-label">Imię</label>
                    <div className="col-9">
                        <input type="name" className="form-control" id="inputName" onChange={(event) => setName(event.target.value)} />
                    </div>
                </div>
                <div className="row mb-1">
                    <label htmlFor="inputSurname" className="col-sm-2 me-3 col-form-label">Nazwisko</label>
                    <div className="col-9">
                        <input type="surname" className="form-control" id="inputSurname" onChange={(event) => setSurname(event.target.value)}/>
                    </div>
                </div>
                <div className="row mb-1">
                    <label htmlFor="inputAddress" className="col-sm-2 me-3 col-form-label">Adres</label>
                    <div className="col-9">
                        <input type="address" className="form-control" id="inputAddress" onChange={(event) => setAddress(event.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="row border-top summary-cost">
                <div className="col">
                    <h6>Suma: </h6>
                </div>
                <div className="col">
                    <h6>{totalCost} zl</h6>
                </div>
            </div>
            <div className="btn-group btn-group-sm checkout-order">
                <button type="button" className="btn btn-secondary" onClick={createOrder}>Złóż zamówienie </button>
            </div>

            <MakeOrderModal
                isOpened={madeOrder}
                name={name}
                surname={surname}
                address={address}
            />
        </div>
    )
}

export default ShoppingCartSummary;