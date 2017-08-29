const maindb = require('../../models');
const joi = require('joi');
const boom = require('boom');


exports.getProductStock = {
    description: 'Fetching Arcdetail',
    notes: 'Fetch Arcdetail from fetchArcdetail table and return it into the response',
    tags: ['api', 'company'],
    handler: (req, res) => {
        var where = {};
        if (req.query.ProductID != undefined && req.query.ProductID != '') {
            where.ProductID = req.query.ProductID;
        }
        if (req.query.RackID != undefined && req.query.RackID != '') {
            where.RackID = req.query.RackID;
        }
        return maindb.ProductStock
            .findAll({
                where: where
            })
            .then((ProductStock) => {
                req.log(['debug', 'status'], ProductStock);
                if (!ProductStock) {
                    return res("Error  1");
                }
                return res(ProductStock);
            })
            .catch((error) => {
                console.log(error);
                return res("Error  2", error);
            });

    }
};


exports.AddProductStock = {
    description: 'Fetching Arcdetail',
    notes: 'Fetch Arcdetail from fetchArcdetail table and return it into the response',
    tags: ['api', 'company'],
    validate: {
        payload: {
            ProductID: joi.number().integer().min(1).required().error(new Error('Please Provide Valid ProductID!')),
            RackID: joi.string().required().error(new Error('Please Provide Valid RackID!')),
            Quantity: joi.number().integer().min(1).required().error(new Error('Please Provide Valid Quantity!')),
            MRP: joi.number().required().error(new Error('Please Provide Valid MRP!')),
            ReferenceID: joi.string().required().error(new Error('Please Provide Valid ReferenceID!')),
            CreatedBy: joi.string().required().error(new Error('Please Provide Valid CreatedBy!'))
        }
        , options: { abortEarly: false }
    },
    handler: (req, res) => {
        return maindb.ProductStock
            .findOne({
                where: {
                    ProductID: req.body.ProductID, RackID: req.body.RackID
                    , MRP: req.body.MRP
                }
            })
            .then(function (obj) {
                if (obj) { // update
                    return obj.update({
                        CurrentStock: obj.CurrentStock + req.payload.Quantity
                        , RackStock: obj.RackStock + req.payload.Quantity
                    })
                        .then((result) => {
                            return maindb.ProductStockInOutLog.
                                create({
                                    ProductID: req.payload.ProductID, MRP: req.payload.MRP
                                    , RackID: req.payload.RackID
                                    , CurrentStock: obj.CurrentStock + req.payload.Quantity
                                    , RackStock: obj.RackStock + req.payload.Quantity
                                    , ReferenceID: req.payload.ReferenceID
                                    , InOutQty: req.payload.Quantity, InOut: 'IN'
                                    , CreatedBy: req.payload.CreatedBy
                                    , CreatedDate: maindb.sequelize.fn('NOW')
                                })
                                .then((result) => {
                                    return res('Stock added successfully!');
                                })
                                .catch((ex) => {
                                    console.log('error');
                                    return res(boom.expectationFailed(ex));
                                });
                        })
                        .catch((ex) => {
                            console.log(ex);
                            return res(boom.expectationFailed(ex));
                        });
                }
                else { // insert
                    console.log(req.payload.ProductID);
                    return maindb.ProductStock.
                        create({
                            ProductID: req.payload.ProductID, MRP: req.payload.MRP, RackID: req.payload.RackID
                            , CurrentStock: req.payload.Quantity, RackStock: req.payload.Quantity
                        })
                        .then((result) => {
                            return maindb.ProductStockInOutLog.
                                create({
                                    ProductID: req.payload.ProductID, MRP: req.payload.MRP
                                    , RackID: req.payload.RackID
                                    , CurrentStock: req.payload.Quantity
                                    , RackStock: req.payload.Quantity
                                    , ReferenceID: req.payload.ReferenceID
                                    , InOutQty: req.payload.Quantity, InOut: 'IN'
                                    , CreatedBy: req.payload.CreatedBy
                                    , CreatedDate: maindb.sequelize.fn('NOW')
                                })
                                .then((result) => {
                                    return res('Stock added successfully!');
                                })
                                .catch((ex) => {
                                    console.log('error');
                                    return res(boom.expectationFailed(ex));
                                });
                        })
                        .catch((ex) => {
                            return res(boom.expectationFailed(ex));
                        });
                }
            }
            );
    }
};