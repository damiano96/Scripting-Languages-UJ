import { DataTypes, Model } from "sequelize";
import Item from "./Item.js";

class Category extends Model {
    static initialize(sequelize) {
        const attributes = {
            id  : {
                type         : DataTypes.INTEGER,
                allowNull    : false,
                field        : "id",
                autoIncrement: true,
                primaryKey   : true
            },
            name: {
                type : DataTypes.STRING,
                field: "name"
            }
        };

        return this.init(attributes, {
            sequelize, modelName: 'Category', tableName: 'Categories', timestamps: false
        });
    }
}

export default Category;