import ItemCard from "./ItemCard";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAllItems} from "../../../api/ApiController";

const Items = () => {
    const [items, setItems] = useState([]);
    const {categoryName} = useParams();

    useEffect(() => {
        async function fetchItems() {
            const itemsResponse = await getAllItems(categoryName);
            setItems(itemsResponse);
        }
        fetchItems();
    }, [categoryName]);


    return (
        <>
            <h1 className="display-6 text-center mb-5">Lokalne produkty, dodawaj nowe i kupuj istniejące!</h1>
            <div className="row row-cols-md-3 g-3">
                {items && items.map((item, index) =>
                    <ItemCard
                        key={index}
                        id={item.id}
                        title={item.title}
                        category={item.Category.name}
                        price={item.price}
                        count={item.count}
                    />
                )}
            </div>
        </>

    )
}

export default Items;