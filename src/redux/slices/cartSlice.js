import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    totalPrice: 0,
    items: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum;
            }, 0);
        },
        minusItem(state, action){
            // const findItem = state.items.find((obj) => obj.id === action.payload);
            const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size);
            console.log(action.payload);

            if(findItem){
                findItem.count--;
                state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
            }


            if(findItem.count < 1) {
                state.items = state.items.filter(obj =>
                    !(obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size)
                );

                state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
            }


        },
        removeItem(state, action) {
            state.items = state.items.filter(obj => !(obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size));
            state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
        },
        clearItems(state, action) {
            state.items = [];
            state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
        }
    }
})

export const selectCart = (state) => state.cart;

export const {addItem, removeItem, clearItems,minusItem} = cartSlice.actions;

export default cartSlice.reducer;