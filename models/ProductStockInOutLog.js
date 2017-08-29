"use strict";

module.exports = function (sequelize, DataTypes) {
    var ProductStockInOutLog = sequelize.define("ProductStockInOutLog", {
        ProductID: {
            type: DataTypes.INTEGER
        },
        MRP: {
            type: DataTypes.DECIMAL
        },
        RackID: {
            type: DataTypes.STRING
        },
        InOutQty: {
            type: DataTypes.INTEGER
        },
        InOut: {
            type: DataTypes.STRING
        },
        ReferenceID: {
            type: DataTypes.STRING
        },
        CurrentStock: {
            type: DataTypes.INTEGER
        },
        RackStock: {
            type: DataTypes.INTEGER
        },
        CreatedBy: {
            type: DataTypes.STRING
        },
        CreatedDate: {
            type: DataTypes.DATE
        }
    }, { freezeTableName: true, timestamps: false });

    ProductStockInOutLog.removeAttribute('id');
    return ProductStockInOutLog;
};