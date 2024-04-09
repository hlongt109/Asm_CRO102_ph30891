import { createAsyncThunk } from '@reduxjs/toolkit'
import { addCategory, addComment, addFavourite, addProduct, addProductHot, addProductNew, addRecently, addUser } from '../reducers/foodReducer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { ToastAndroid } from 'react-native';

const product_url = 'http://10.0.2.2:3000/products'
const category_url = 'http://10.0.2.2:3000/categories'
const comment_url = 'http://10.0.2.2:3000/comments'
const favourite_url = 'http://10.0.2.2:3000/favourites'
const user_url = 'http://10.0.2.2:3000/users'

export const fetchProductApi = () => {
    return async dispatch => {
        try {
            const res = await fetch(product_url);
            const data = await res.json();

            data.forEach(item => {
                dispatch(addProduct(item))
            })
        } catch (error) {
            console.log("Error fetching product :", error)
        }
    }
}
export const fetchProductHotApi = () => {
    return async dispatch => {
        try {
            const res = await fetch(product_url);
            const data = await res.json();

            const hotProducts = data.filter(product => product.sold > 10000);
            hotProducts.forEach(product => {
                dispatch(addProductHot(product));
            });
        } catch (error) {
            console.log("Error fetching hot products:", error);
        }
    }
}
export const fetchProductNew = () => {
    return async dispatch => {
        try {
            const res = await fetch(product_url);
            const data = await res.json();

            const newProducts = data.filter(product => product.new === true);
            newProducts.forEach(product => {
                dispatch(addProductNew(product));
            });
        } catch (error) {
            console.log("Error fetching new products:", error);
        }
    }
}

export const fetchCategoryApi = () => {
    return async dispatch => {
        try {
            const res = await fetch(category_url);
            const data = await res.json();

            data.forEach(item => {
                dispatch(addCategory(item))
            })
        } catch (error) {
            console.log("Error fetching category :", error)
        }
    }
}
export const fetchCommentApi = (idProduct) => {
    return async dispatch => {
        try {
            const res = await fetch(`${comment_url}?productId=${idProduct}`);
            const data = await res.json();

            data.forEach(item => {
                dispatch(addComment(item))
            })
        } catch (error) {
            console.log("Error fetching comment :", error)
        }
    }
}

export const fetchFavuoriteApi = (userId) => {
    return async dispatch => {
        try {
            const favouriteRes = await fetch(`${favourite_url}?userId=${userId}`)
            const favourites = await favouriteRes.json();

            const productId = favourites.map(fv => fv.productId);
            console.log(productId)
            for (const id of productId) {
                const productRes = await fetch(`${product_url}?id=${id}`);
                const products = await productRes.json();
                console.log(products)
                if (Array.isArray(products) && products.length > 0) {
                    const product = products[0]; // Lấy phần tử đầu tiên từ mảng products
                    dispatch(addFavourite(product));
                }
            }
        } catch (error) {
            console.log("Error fetching favourite :", error)
        }
    }
}
export const fetchUserApi = () => {
    return async dispatch => {
        try {
            const res = await fetch(user_url);
            const data = await res.json();

            data.forEach(item => {
                dispatch(addUser(item))
            })
        } catch (error) {
            console.log("Error fetching user :", error)
        }
    }
}
// export const fetchRecentyApi = (productId) => {
//     return async dispatch => {
//         try {
//             const fetchPromises = productId.map((id) => {
//                 return fetch(`http://10.0.2.2:3000/products/${id}`)
//                     .then((res) => res.json());
//             });
//             Promise.all(fetchPromises)
//                 .then((fetchProduct) => {
//                     fetchProduct.forEach(item => {
//                         dispatch(addRecently(item));
//                     });
//                 })
//                 .catch(e => console.error('Error fetching recently products:' + e));
//         } catch (error) {
//             console.error('Error reading saved product IDs:', error);
//         }
//     }
// }

export const fetchRecentyApi = () => {
    return async dispatch => {
        try {
            AsyncStorage.getItem("savedProductIds")
                .then((saveRecentId) => {
                    if (saveRecentId) {
                        const productId = JSON.parse(saveRecentId);
                        const fetchPromises = productId.map((id) => {
                            return fetch(`http://10.0.2.2:3000/products/${id}`)
                                .then((res) => res.json());
                        });
                        Promise.all(fetchPromises)
                            .then((fetchProduct) => {
                                fetchProduct.forEach(item => {
                                    dispatch(addRecently(item));
                                });
                            })
                            .catch(e => console.error('Error fetching recently products:' + e));
                    }
                })
                .catch(e => console.error('Error reading saved product IDs:', e));
        } catch (error) {
            console.error('Error reading saved product IDs:', error);
        }
    }
}
// export const fetchRecentyApi = () => {

// return async dispatch => {
//   try {
//     const saveRecentId = await AsyncStorage.getItem("savedProductIds");

//     if (saveRecentId) {
//       const productId = JSON.parse(saveRecentId);
//       const fetchPromises = productId.map(async (id) => {
//         const res = await fetch(`http://10.0.2.2:3000/products/${id}`);
//         const item = await res.json();
//         return item;
//       });

//       const fetchProduct = await Promise.all(fetchPromises);
//       fetchProduct.forEach(item => {
//         dispatch(addRecently(item));
//       });
//     }
//   } catch (error) {
//     console.error('Error reading or fetching recently products:', error);
//   }
// };
// };
export const createCommentApi = createAsyncThunk(
    'comment/createComment',
    async ({ productId, content, userId, star }, thunkApi) => {
        const objComment = { productId, content, userId, star };
        try {
            const response = await fetch(comment_url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objComment)
            });
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                const error = await response.json();
                return thunkApi.rejectWithValue(error)
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);
export const sendCommentApi = (productId, content, userId, starNumber) => {
    return async dispatch => {
        try {
            const response = await fetch("http://10.0.2.2:3000/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productId: productId,
                    content: content,
                    userId: userId,
                    star: starNumber
                })
            });
            if (!response.ok) {
                console.log("Network error");
                return false;
            } else {
                ToastAndroid.show("Đã gửi đánh giá của bạn", ToastAndroid.SHORT);
                return true;
            }
        } catch (error) {
            console.error('Error:', error.message);
            ToastAndroid.show("Error", ToastAndroid.SHORT);
            return false;
        }
    };
};
export const clearCommentList = () => ({
    type: 'CLEAR_COMMENT_LIST'
});
export const createFavouriteApi = (idProduct, userId) => {
    return async dispatch => {
        try {
            const response = await fetch(favourite_url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productId: idProduct,
                    userId: userId
                })
            });
            if (!response.ok) {
                console.log("Network error")
                return false;
            } else {
                ToastAndroid.show("Đã thêm vào yêu thích", ToastAndroid.SHORT);
                return true;
            }
        } catch (error) {
            console.error('Error:', error.message);
            ToastAndroid.show("Error", ToastAndroid.SHORT);
            return false;
        }
    };
};

export const deleteFavouriteApi = createAsyncThunk(
    'favourite,deleteFavourite',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`${favourite_url}/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                return id;
            } else {
                const errorData = await response.json();
                return rejectWithValue(errorData);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const checkFavourite = createAsyncThunk(
    'favourite/checkFavourite',
    async ({ userID, productID }, thunkApi) => {
        try {
            const res = await fetch(`${favourite_url}?userId=${userID}&productId=${productID}`);
            const data = await res.json();
            return data.length > 0;
        } catch (error) {
            return false;
        }
    }
)
export const fetchProductsByCategoryId = (categoryId) => {
    return async (dispatch, getState) => {
        try {
            let url = 'http://10.0.2.2:3000/products';
            if (categoryId && categoryId !== "all") {
                url += `?categoryId=${categoryId}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            // Gọi action addProduct để cập nhật danh sách sản phẩm trong Redux store
            data.forEach(item => {
                dispatch(addProduct(item));
            });
        } catch (error) {
            console.log("Error fetching products:", error);
            throw error;
        }
    };
};
// login , sign up
export const registerUser = (email, password, name) => {
    return async dispatch => {
        try {
            const response = await fetch(user_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData.message);
                ToastAndroid.show("Registration failed. Please try again.", ToastAndroid.SHORT);
            } else {
                console.log("Register successfully")
            }
        } catch (error) {
            console.error('Error:', error.message);
            ToastAndroid.show("Registration failed. Please try again.", ToastAndroid.SHORT);
        }
    };
};
// export const updatePassword = (userId, newPassword) => {
//     return async dispatch => {
//         try {

//             const response = await fetch(user_url);
//             const acc = await response.json();
//             const userUpdate = acc.find(us => us.id === userId);
//             if(userUpdate){
//                 userUpdate.password = newPassword;
//                 const result = await fetch(`${user_url}/${userId}`, {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         userUpdate
//                     }),
//                 });
//                 if (!result.ok) {
//                     const errorData = await result.json();
//                     console.error('Error:', errorData.message);
//                     ToastAndroid.show("Password update failed. Please try again.", ToastAndroid.SHORT);
//                 } else {
//                     ToastAndroid.show("Password update successfully", ToastAndroid.SHORT);
//                     console.log("Password updated successfully")
//                 }
//             }
           
//         } catch (error) {
//             console.error('Error:', error.message);
//             ToastAndroid.show("Password update failed. Please try again.", ToastAndroid.SHORT);
//         }
//     };
// };
export const updatePassword = (userId, newPassword) => {
    return async dispatch => {
        try {
            const response = await fetch(`${user_url}/${userId}`);
            if (!response.ok) {
                console.error('Error fetching user data:', response.statusText);
                ToastAndroid.show("Failed to fetch user data. Please try again.", ToastAndroid.SHORT);
                return;
            }

            const userUpdate = await response.json();
            if (!userUpdate) {
                console.error('User not found');
                ToastAndroid.show("User not found. Please try again.", ToastAndroid.SHORT);
                return;
            }

            userUpdate.password = newPassword;

            const updateResponse = await fetch(`${user_url}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userUpdate),
            });

            if (!updateResponse.ok) {
                console.error('Error updating password:', updateResponse.statusText);
                ToastAndroid.show("Password update failed. Please try again.", ToastAndroid.SHORT);
                return;
            }

            ToastAndroid.show("Password update successfully", ToastAndroid.SHORT);
            console.log("Password updated successfully");
        } catch (error) {
            console.error('Error:', error.message);
            ToastAndroid.show("Password update failed. Please try again.", ToastAndroid.SHORT);
        }
    };
};

export const checkAcc = (email, password) => {
    return async dispatch => {
        try {
            const response = await fetch(user_url);
            const acc = await response.json();

            if (acc.length > 0) {
                const user = acc.find(user => user.email === email && user.password === password);

                if (user) {
                    await AsyncStorage.setItem('isLoggedIn', 'true');
                    await AsyncStorage.setItem('userEmail', user.email);
                    // await AsyncStorage.setItem('userFullName', user.fullname);
                    await AsyncStorage.setItem('userId', user.id);
                    console.log("Found account successfully, login successfully")
                } else {
                    console.log("Email or password is invalid")
                }
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
};
export const checkPass = (id, password) => {
    return async dispatch => {
        try {
            const response = await fetch(user_url);
            const acc = await response.json();

            if (acc.length > 0) {
                const user = acc.find(user => user.id === id && user.password === password);

                if (user) {
                    return true;
                } else {
                    return false;
                }
            }
        } catch (error) {
            console.error('Error:', error.message);
            return false;
        }
    };
};


