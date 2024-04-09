import { createSlice } from '@reduxjs/toolkit'
import { checkFavourite, createCommentApi, createFavouriteApi, deleteFavouriteApi, sendCommentApi } from '../actions/foodAction'
import { startTransition } from 'react'

const initialStateProduct = {
    listProduct: [],
    listProductHot: [],
    listProductNew: [],
}
const initialStateCategoty = {
    listCategory: [],
}
const initialStateFavourite = {
    listFavourite: [],
}
const initialStateComment = {
    listComment: [],
}
const initialStateUser = {
    listUser: [],
}
const initialStateRecently = {
    listRecently: [],
}

const productSlice = createSlice({
    name: 'product',
    initialState: initialStateProduct,
    reducers: {
        addProduct(state, action) {
            state.listProduct.push(action.payload)
        },
        addProductHot(state, action) {
            state.listProductHot.push(action.payload)
        },
        addProductNew(state, action) {
            state.listProductNew.push(action.payload)
        }
    },
    // extraReducers: builder =>{

    // }
});
const categorySlice = createSlice({
    name: 'category',
    initialState: initialStateCategoty,
    reducers: {
        addCategory(state, action) {
            state.listCategory.push(action.payload)
        }
    },
    // extraReducers: builder =>{

    // }
});
const favouriteSlice = createSlice({
    name: 'favourite',
    initialState: initialStateFavourite,
    reducers: {
        addFavourite(state, action) {
            state.listFavourite.push(action.payload)
        }
    },
    extraReducers: builder => {
        // builder.addCase(createFavouriteApi.fulfilled, (state, action) =>{
        //     state.listFavourite.push(action.payload)
        // });
        builder.addCase(deleteFavouriteApi.fulfilled, (state, action) => {
            state.listFavourite = state.listFavourite.filter(item => item.id !== action.payload);
        }).addCase(deleteFavouriteApi.rejected, (state, action) => {
            console.log('Delete favourite rejected :', action.error.message);
        });

        builder.addCase(checkFavourite.fulfilled, (state, action) => {

        })
    }
});

const commentSlice = createSlice({
    name: 'comment',
    initialState: initialStateComment,
    reducers: {
        addComment(state, action) {
           
                state.listComment.push(action.payload);
            
        },
        clearCommentList(state) {
            state.listComment = [];
        },
        
    },
    extraReducers: builder => {
        builder.addCase(createCommentApi.fulfilled, (state, action) => {
            state.listComment.push(action.payload);

        })
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: initialStateUser,
    reducers: {
        addUser(state, action) {
            state.listUser.push(action.payload)
        }
    },
 
})
const recentlySlice = createSlice({
    name: 'recently',
    initialState: initialStateRecently,
    reducers: {
        addRecently(state, action) {
            state.listRecently.push(action.payload);
        }
    }
})


export const { addProduct, addProductHot, addProductNew } = productSlice.actions;
export const { addCategory } = categorySlice.actions;
export const { addComment, clearCommentList } = commentSlice.actions;
export const { addFavourite } = favouriteSlice.actions;
export const { addUser } = userSlice.actions;
export const { addRecently } = recentlySlice.actions;

export const productReducer = productSlice.reducer;
export const categoryReducer = categorySlice.reducer;
export const commentReducer = commentSlice.reducer;
export const favouriteReducer = favouriteSlice.reducer;
export const userReducer = userSlice.reducer;
export const recentlyReducer = recentlySlice.reducer;
