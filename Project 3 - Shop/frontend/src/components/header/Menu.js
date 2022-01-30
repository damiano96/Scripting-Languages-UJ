import React from 'react';
import {Link} from "react-router-dom";

const Menu = ({categories}) => {
    const getCategory = ({categoryName, index}) => {
        return (
            <div className='col header-item' key={index}>
                <Link to={`${categoryName}`}>{categoryName}</Link>
            </div>
        )
    }

    return (
        <div className='row'>
            {categories && categories.map((el, index) => (
                getCategory({categoryName: el, index})
            ))}
        </div>
    )
}

export default Menu;