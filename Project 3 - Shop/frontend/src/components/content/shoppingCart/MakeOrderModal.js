import { useContext, useEffect, useRef, useState } from "react";
import { Modal } from 'bootstrap'
import Context from "../../../context/Context";

const MakeOrderModal = ({isOpened, name, surname, address}) => {
    const [makeOrderModal, setMakeOrderModal] = useState(null);
    const [openOrderModal, setOpenOrderModal] = useState(false);
    const context = useContext(Context);

    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpened) {
            setOpenOrderModal(isOpened)
        }
    }, [isOpened])

    useEffect(() => {
        const modal = new Modal(modalRef.current,  { backdrop: 'static' });
        setMakeOrderModal(modal);
    }, []);

    useEffect(() => {
        if (openOrderModal) {
            makeOrderModal?.show();
        } else {
            makeOrderModal?.hide();
        }
    }, [openOrderModal]);

    const handleCloseModal = () => {
        setOpenOrderModal(false);
        setTimeout(() => {
            context.clearShopCart();
        }, 1)
    }

    const getModalBody = () => {
        return (
            <div className="alert alert-success mb-0" role="alert">
                <h4 className="alert-heading">Gratulacje!</h4>
                <p>Gratulacje <b>{name} {surname}</b>, udało Ci się złożyć zamowienie.</p>
                <div>Twoje zamówienie: </div>
                {context.shopCart.map(item =>
                    <div><b>{item.title}</b> sztuk: {item.quantity}</div>
                )}
                <p>Twoje zamowienie zostanie dostarczone na adres: <b>{address}</b></p>
                <button type="button" class="btn btn-success" onClick={handleCloseModal}>Zamknij</button>
            </div>
        )
    }

    return (
        <>
            <div ref={modalRef} className="modal fade">
                <div className="modal-dialog modal modal-dialog-centered">
                    <div className="modal-content">
                        {getModalBody()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MakeOrderModal;