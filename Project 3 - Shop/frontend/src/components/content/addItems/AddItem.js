import {useEffect, useState} from "react";
import {addItemToDatabase, getCategories} from "../../../api/ApiController";
import './styles.css';

const AddItem = () => {
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [chosenCategory, setChosenCategory] = useState('null');
    const [displayError, setDisplayError] = useState(false);
    const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);

    useEffect(() => {
        async function fetchCategories() {
            const categoriesResponse = await getCategories();
            setCategories(categoriesResponse);
        }
        fetchCategories();
    }, [])

    const handleOnSelect = (event) => {
        const handledValue = event.target.value;
        if (handledValue !== 'null') {
            setChosenCategory(handledValue)
        }
    }

    const resetForm = () => {
        setTitle('');
        setPrice('');
        setChosenCategory('');
    }

    const handleAddItem = () => {
        if (title && price && chosenCategory) {
            addItemToDatabase({title, price, chosenCategory});
            setDisplaySuccessMessage(true);
            setDisplayError(false);
            resetForm();
        } else {
            setDisplayError(true)
            setDisplaySuccessMessage(false);
        }
    }

    const renderSuccessAddItem = () => {
        return (
            <div className="alert alert-success" role="alert">
                Pomyslnie dodano produkt
            </div>
        )
    }

    const renderErrorAddItem = () => {
        return (
            <div className="alert alert-danger" role="alert">
                Wypełnij wszystkie pola!
            </div>
        )
    }

    return (
        <div className='container add-item-container'>
            <h1 className='display-6'>Dodaj nowy produkt</h1>
            <div className="row g-3 mt-4">
                {displayError && renderErrorAddItem()}
                {displaySuccessMessage && renderSuccessAddItem()}
                <div className="col-md-6">
                    <label htmlFor="inputTitle" className="form-label">Nazwa</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputTitle"
                        onChange={(event) => setTitle(event.target.value)}
                        value={title}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputPrice" className="form-label">Cena</label>
                    <input
                        type="number"
                        className="form-control"
                        id="inputPrice"
                        onChange={(event) => setPrice(event.target.value)}
                        value={price}
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="selectCategory" className="form-label">Kategoria</label>
                    <select className="form-select" id="selectCategory" value={chosenCategory} onChange={handleOnSelect}>
                        <option value={''} selected>Wybierz kategorie</option>
                        {categories && categories.map((el, index) =>
                            <option key={index} value={el.id}>{el.name}</option>
                        )}
                    </select>
                </div>
                <button className="btn btn-primary mt-5" onClick={handleAddItem}>Dodaj produkt</button>
            </div>
        </div>
    )
}

export default AddItem;