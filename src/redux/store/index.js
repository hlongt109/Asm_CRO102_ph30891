import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer, commentReducer, favouriteReducer, productReducer, recentlyReducer, userReducer } from '../reducers/foodReducer'


export default configureStore({
    reducer:{
        listProduct: productReducer,
        listCategoty: categoryReducer,
        listFavourite: favouriteReducer,
        listComment: commentReducer,
        listRecently: recentlyReducer,
        listUser: userReducer,

        listProductHot: productReducer,
        listProductNew: productReducer
    }
})