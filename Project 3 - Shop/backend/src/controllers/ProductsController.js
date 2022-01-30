import Category from "../model/Category.js";
import Item from "../model/Item.js";

class ProductsController {
    constructor() { }

    async getAllProducts(request) {
        try {
            return await Item.findAll(
                {
                    include   : [{
                        model     : Category,
                        required  : true,
                        attributes: ['name']
                    }],
                    attributes: ['id', 'title', 'price']
                })
        } catch (error) {
            await Promise.reject(error);
        }

    }

    async getCategories(request) {
        try {
            return await Category.findAll();
        } catch (error) {
            await Promise.reject(error);
        }
    }

    async getProductsByCategory(request) {
        const category = request.params.category;
        try {
            return await Item.findAll(
                {
                    include   : [{
                        model     : Category,
                        required  : true,
                        attributes: ['name'],
                        where     : {
                            name: category
                        }
                    }],
                    attributes: ['id', 'title', 'price']
                })
        } catch (error) {
            await Promise.reject(error);
        }
    }

    async addProduct(request) {
        const {title, price, chosenCategory} = request.body;
        try {
            await Item.create({
                title      : title,
                price      : price,
                category_id: chosenCategory
            })
        } catch (error) {
            await Promise.reject(error);
        }
    }
}

export default ProductsController;