"use strict";

module.exports = function (sequelize, DataTypes) {
    var ProductStock = sequelize.define("ProductStock", {
        ProductID: {
            type: DataTypes.INTEGER
            , unique: 'compositeIndex'
        },
        MRP: {
            type: DataTypes.DECIMAL
            , unique: 'compositeIndex'
        },
        RackID: {
            type: DataTypes.STRING
            , unique: 'compositeIndex'
        },
        CurrentStock: {
            type: DataTypes.INTEGER
        },
        RackStock: {
            type: DataTypes.INTEGER
        }
    }, { freezeTableName: true, timestamps: false });

    ProductStock.removeAttribute('id');
    return ProductStock;
};