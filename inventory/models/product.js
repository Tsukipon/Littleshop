var db = require("../settings/database");
const { DataTypes } = require('sequelize');
const condition = ["new", "occasion", "renovated"];
process.env.NODE_ENV === "development" ? db = db.sequelizeDev : db = db.sequelizeTest

const Product = db.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100), allowNull: false, unique: "compositePK"
    },
    label: {
        type: DataTypes.STRING(100), allowNull: false
    },
    condition: {
        type: DataTypes.ENUM(condition), allowNull: false, defaultValue: condition[0]
    },
    description: {
        type: DataTypes.TEXT, allowNull: false
    },
    unitPrice: {
        type: DataTypes.FLOAT, allowNull: false
    },
    availableQuantity: {
        type: DataTypes.INTEGER, allowNull: false
    },
    sellerId: {
        type: DataTypes.INTEGER, allowNull: false, unique: "compositePK"
    },
    onSale: {
        type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true
    },
    averageRating: {
        type: DataTypes.FLOAT, allowNull: false, defaultValue: 0
    }
},
    {
        freezeTableName: true,
        tableName: "product",
        createdAt: "created_at",
        updatedAt: "updated_at"
    });

module.exports = Product;