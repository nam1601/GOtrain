import express from 'express'

import  userController from '../controller/userController';


let router = express.Router()

let initWebRoutes = (app) => {
    router.get('/api/v1/products', userController.allProduct)
    router.get('/api/v1/product', userController.productById)
    router.delete('/api/v1/product', userController.deleteProduct)
    router.put('/api/v1/product/quantity',userController.updateQuantityProduct)
    router.get('/api/v1/products-cart', userController.allInCart)
    router.get('/api/v1/product/check', userController.checkInCart)
    router.post('/api/v1/product', userController.addCart)
    router.get('/api/v1/product/info', userController.getInfo)
    return app.use('/',router)
}
module.exports = initWebRoutes