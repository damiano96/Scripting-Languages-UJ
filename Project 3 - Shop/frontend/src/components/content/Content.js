import {Route, Routes} from 'react-router-dom'
import './style.css';

import Items from "./items/Items";
import ShoppingCart from "./shoppingCart/ShoppingCart";
import AddItem from "./addItems/AddItem";

const Content = (props) => {
    return (
        <div className='container content pt-5 pb-5'>
            <Routes>
                <Route path="/" element={<Items />} />
                <Route path="/:categoryName" element={<Items />} />
                <Route path="/add-item" element={<AddItem />} />
                <Route path="/card" element={<ShoppingCart />} />
            </Routes>
        </div>
    )
}

export default Content;