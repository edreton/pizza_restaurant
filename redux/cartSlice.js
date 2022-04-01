import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.items.push(action.payload);
            state.quantity += 1;
            state.total += action.payload.price * action.payload.quantity;
          },
        removeProduct: (state, action) => {
            const {product} = action.payload;
            const item = state.items.find(item => item.product === product);
            if (item) {
                state.items = state.items.filter(item => item.product !== product);
                state.total -= product.price * item.quantity;
                state.quantity -= quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.quantity = 0;
            state.total = 0;
        }
    }
});

export const {addProduct, removeProduct, clearCart} = cartSlice.actions;
export default cartSlice.reducer;