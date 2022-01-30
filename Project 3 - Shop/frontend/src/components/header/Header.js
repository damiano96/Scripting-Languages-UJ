import React, { useContext, useEffect, useState } from 'react';
import Menu from "./Menu";
import {Link} from "react-router-dom";
import Context from "../../context/Context";
import {getCategories} from "../../api/ApiController";
import './style.css';

const Header = (props) => {
    const [categories, setCategories] = useState([]);
    const context = useContext(Context);

    useEffect(() => {
        async function fetchCategories() {
            const categoriesResponse = await getCategories();
            const categories = categoriesResponse.map(category => category.name);
            setCategories(categories);
        }

        fetchCategories();
    }, [])

    return (
        <header className="container-fluid shadow">
            <div className="row header-body">
                <div className="col">
                    <Menu categories={categories} />
                </div>
                <div className="col-3 logo-header">
                    <span><h3 className='display-6'><Link to="/">LocalShopping</Link></h3></span>
                </div>
                <div className="col right-side-header">
                    <div className='row'>
                        <div className='col header-item text-center'>
                            <Link to="/add-item">Dodaj produkt</Link>
                        </div>
                        <div className='col header-item text-center'>
                            <Link to="/card">Koszyk ({context.shopCart.length})</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;