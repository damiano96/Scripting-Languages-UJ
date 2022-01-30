import express from 'express';
import { Sequelize } from "sequelize";
import Database from "./config/database.js";
import Item from "./model/Item.js";
import Category from "./model/Category.js";

class App {
    constructor(port, routers) {
        this.app = express();
        this.port = port;
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.setHeader('Content-Type', 'application/json');
            next();
        });

        process.env.PWD = process.cwd()
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.routes(routers);
        this.connectDatabase();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App working on the port ${this.port}`);
        })
    }

    routes(routers) {
        routers.forEach(router => {
            this.app.use("/", router.router);
        });
    }

    async connectDatabase() {
        const sequelize = Database.getSequelize();

        try {
            await sequelize.authenticate();
            await Database.initializeModels();
            await sequelize.sync();
        } catch( e ) {
            console.log("Something gone wrong", e)
        }
    }
}

export default App;