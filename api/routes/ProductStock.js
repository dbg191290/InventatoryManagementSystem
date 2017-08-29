const ProductStock = require('../handler/ProductStock');
module.exports = [{
    method: 'GET',
    path: '/ProductStock/get',
    config: ProductStock.getProductStock
},
{
    method: 'POST',
    path: '/ProductStock/Add',
    config: ProductStock.AddProductStock
}];