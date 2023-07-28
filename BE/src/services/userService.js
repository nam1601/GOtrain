import db from "../models/index"
import bcrypt from 'bcryptjs'

let getAllProduct = ()=> {
    return new Promise(async(resolve, reject) => {
        try {
            let list={}
            let data = await db.Store.findAll();
            list.errCode = 0;
            list.message = 'Get list comment success';
            list.data = data;
            resolve(list)
        } catch (error) {
            reject(error)
        }
    })
}
let getProductById = (idItem)=> {
    return new Promise(async(resolve, reject) => {
        try {
            let list={}
            let data = await db.Store.findOne({where: {id: idItem}});
            list.errCode = 0;
            list.message = 'Get list comment success';
            list.data = data;
            resolve(list)
        } catch (error) {
            reject(error)
        }
    })
}
let getProductAfterAddCart = (idItem)=> {
    return new Promise(async(resolve, reject) => {
        try {
            let list={}
            let data = await db.Cart.findOne({where: {idItem: idItem}, include: [{ model: db.Store }]});
            console.log('------------------')
            console.log(data)
            console.log('------------------')

            list.errCode = 0;
            list.message = 'Get list success';
            list.data = data;

            resolve(list)
        } catch (error) {
            reject(error)
        }
    })

}
let deleteProductById = (idItem)=> {
    let info = {}
    return new Promise(async(resolve, reject) => {
        try {
            await db.Cart.destroy({
                where: {
                    idItem: idItem,
                }
            });
            
            info.errCode = 0;
            info.message = 'Delete success';
            resolve(info);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}
let updateQuantityProductById= (idItem, quantity,totalPrice)=>{
    return new Promise(async(resolve, reject) => {
        try {
            let itemData = {};
            let item = await db.Cart.findOne({
                where: { idItem: idItem}
            })
            if(item){
                itemData.errCode = 0;
                itemData.errMessage = 'OK';
                await item.update({quantity: quantity, totalPrice: totalPrice})
            
                delete item['password'];
                itemData.item = item;
               
            }
            else {
                itemData.errCode= 2;
                itemData.errMessage=`User not found`
            }
            resolve(itemData)
        } catch (error) {
            reject(error)
        }
    })
}
let getAllProductInCart = ()=> {
    return new Promise(async(resolve, reject) => {
        try {
            let list={}
            let data = await db.Cart.findAll({include: [{ model: db.Store }]});
            list.errCode = 0;
            list.message = 'Get list comment success';
            list.data = data;
            resolve(list)
        } catch (error) {
            reject(error)
        }
    })
}
let checkProductInCart = (id)=> {
    return new Promise(async(resolve, reject) => {
        try {
            let check = {}
            let isFollow = await db.Cart.findOne({
                where: {
                    idItem: id,
                }})
            if(isFollow){
                check.errCode =0;
                check.message = 'Request success'
                check.isHave = 1
            }
            else {
                check.errCode =0;
                check.message = 'Request success'
                check.isHave = 0
            }       
            resolve(check)
        } catch (error) {
            reject(error)
        }
    })
}
let addProductToCart = (idItem, quantity,totalPrice)=> {
    return new Promise(async(resolve, reject) => {
        let info = {}
        try {
            let newData = await db.Cart.create({
                idItem, 
                quantity,
                totalPrice: totalPrice
            })
            console.log(newData)
            info.errCode =0;
            info.message = 'Add success'
            resolve(info)
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}
module.exports = {
    getAllProduct,
    getProductById,
    deleteProductById,
    updateQuantityProductById,
    getAllProductInCart,
    checkProductInCart,
    addProductToCart,
    getProductAfterAddCart
}