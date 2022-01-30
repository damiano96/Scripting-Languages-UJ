import axios from "axios";

const apiUrl = `http://localhost:3001`

export const getAllItems = async (category) => {
    let param = 'products'
    if (category) {
        param = param + `/${category}`
    }

    try {
        const response = await axios.get(`${apiUrl}/${param}`);
        return response.data;
    } catch( error ) {
        return [];
    }
}

export const getCategories = async() => {
    try {
        const response = await axios.get(`${apiUrl}/categories`);
        return response.data;
    } catch (error) {
        return [];
    }
}

export const addItemToDatabase = async(product) => {
    try {
        console.log(product)
        await axios.post(`${apiUrl}/products`, {...product})
        console.log('Pomyslnie dodano')
    } catch (error) {
        console.log(error)
    }
}