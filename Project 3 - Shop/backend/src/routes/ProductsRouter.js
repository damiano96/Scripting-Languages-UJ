import express from "express";
import ProductsController from "../controllers/ProductsController.js";

class ProductsRouter {
    constructor() {
        this.router = express.Router();
        this.productsController = new ProductsController();
        this._initializeRouters();
    }

    _initializeRouters() {
        this.router.route('/products')
            .get(this._getProducts.bind(this))
            .post(this._addProduct.bind(this));
        this.router.route('/categories')
            .get(this._getCategories.bind(this));
        this.router.route('/products/:category')
            .get(this._getProductsByCategory.bind(this))
    }

    async _getProducts(request, response) {
        try {
            const result = await this.productsController.getAllProducts(request);
            response.status(200).send(JSON.stringify(result, null, 4))
        } catch( error ) {
            response.status(404).send(error)
        }
    }

    async _getCategories(request, response) {
        try {
            const result = await this.productsController.getCategories(request);
            response.status(200).send(JSON.stringify(result, null, 2))
        } catch( error ) {
            response.status(404).send("Some error 404")
        }
    }

    async _getProductsByCategory(request, response) {
        try {
            const result = await this.productsController.getProductsByCategory(request);
            response.status(200).send(JSON.stringify(result, null, 2))
        } catch( error ) {
            response.status(404).send("Some error 404")
        }
    }

    async _addProduct(request, response) {
        try {
            await this.productsController.addProduct(request);
            response.status(200).send("Pomyslnie dodano produkt")
        } catch (error) {
            response.status(404).send("Some error 404")
        }
    }
}

export default ProductsRouter;