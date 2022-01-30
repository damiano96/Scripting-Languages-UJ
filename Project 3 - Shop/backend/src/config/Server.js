import App from "../App.js";
import ProductsRouter from "../routes/ProductsRouter.js";

const appPort = 3001;
const routers = [
    new ProductsRouter()
];

const application = new App(appPort, routers);
application.listen();