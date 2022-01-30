import { DataTypes, Model } from "sequelize";
import Category from "./Category.js";

class Item extends Model {
    static initialize(sequelize) {
        const attributes = {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "id",
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                field: "title"
            },
            price: {
                type: DataTypes.INTEGER,
                field: "price"
            },
            category_id: {
                type: DataTypes.INTEGER,
                field: "category_id",
                references: {
                    model: Category,
                    key: 'id'
                }
            }
        };

        return this.init(attributes, {
            sequelize, modelName: 'Item', tableName: 'Items', timestamps: false
        });
    }

    static associate() {
        this.belongsTo(Category,{foreignKey : 'category_id'})
    }
}

export default Item;