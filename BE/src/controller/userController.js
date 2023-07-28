import db from '../models/index'
import CRUD from '../services/CRUDService'
import userService from '../services/userService'

let allProduct = async(req,res)=> {
  try {
    let list = await userService.getAllProduct();
    return res.status(200).json({
      errCode: list.errCode,
      message: list.message,
      shoes: list ? list.data : {},
    });
  } catch (error) {
    console.log(error);
        return res.status(500).json({
            errCode: 500,
            message: "Internal server error",
            data: {},
        });
  }
}
let productById = async(req,res)=> {
  let idItem = req.query.id;
  console.log('id: ', idItem)
  try {
    let list = await userService.getProductById(idItem);
    return res.status(200).json({
      errCode: list.errCode,
      message: list.message,
      Item: list ? list.data : {},
    });
  } catch (error) {
    console.log(error);
        return res.status(500).json({
            errCode: 500,
            message: "Internal server error",
            data: {},
        });
  }
}
let deleteProduct = async(req,res)=> {
  let idItem = req.body.id;
  try {
    let list = await userService.deleteProductById(idItem);
    return res.status(200).json({
      errCode: list.errCode,
      message: list.message,
      Item: list ? list.data : {},
    });
  } catch (error) {
    console.log(error);
        return res.status(500).json({
            errCode: 500,
            message: "Internal server error",
            data: {},
        });
  }
}
let updateQuantityProduct = async(req,res)=> {
  let idItem= req.body.id;
  let quantity = req.body.quantity;
  let totalPrice = req.body.totalPrice;
  

  try {
    let list = await userService.updateQuantityProductById(idItem,quantity,totalPrice);
    return res.status(200).json({
      errCode: list.errCode,
      message: list.message,
      Item: list ? list.data : {},
    });
    
  } catch (error) {
    console.log(error);
        return res.status(500).json({
            errCode: 500,
            message: "Internal server error",
            data: {},
        });
  }
}
let allInCart = async(req,res)=> {
  try {
    let list = await userService.getAllProductInCart();
    return res.status(200).json({
      errCode: list.errCode,
      message: list.message,
      shoes: list ? list.data : {},
    });
  } catch (error) {
    console.log(error);
        return res.status(500).json({
            errCode: 500,
            message: "Internal server error",
            data: {},
        });
  }
}
let checkInCart = async(req,res)=> {
  let idItem = req.query.id;
  try {
    let checkFollow = await userService.checkProductInCart(idItem);
    return res.status(200).json({
      errCode: checkFollow.errCode,
      message: checkFollow.errMessage,
      data: checkFollow ? checkFollow : {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: 500,
      message: "Internal server error",
      data: {},
    });
  }
  
}
let addCart = async(req,res)=> {
  
  let idItem = req.body.id;
 
  let quantity = req.body.quantity;
 
  let totalPrice = req.body.totalPrice;
  try {
    let dataFollow = await userService.addProductToCart(idItem,quantity,totalPrice)
    return res.status(200).json({
      errCode: dataFollow.errCode,
      message: dataFollow.errMessage,
      data: dataFollow ? dataFollow : {},
    });
  } catch (error) {
      console.log(error);
      return res.status(500).json({
        errCode: 500,
        message: "Internal server error",
        data: {},
      });
  }
}
let getInfo = async(req,res)=> {
  let idItem = req.query.idItem;
  try {
    let data = await userService.getProductAfterAddCart(idItem)
    return res.status(200).json({
      errCode: data.errCode,
      message: data.errMessage,
      data: data ? data : {},
    });
  } catch (error) {
    console.log(error);
      return res.status(500).json({
        errCode: 500,
        message: "Internal server error",
        data: {},
      });
  }
}
module.exports= {
    allProduct,
    productById,
    deleteProduct,
    updateQuantityProduct,
    allInCart,
    checkInCart,
    addCart,
    getInfo
}