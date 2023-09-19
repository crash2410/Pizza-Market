import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// Создание асинхронного thunk для получения пицц
export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async ({categoryId, sort, pageCount, order, search}) => {
        // Создание URL-адреса на основе переданных параметров
        const urlData = new URL(
            categoryId === 0
                ? `https://64138209a68505ea733524cc.mockapi.io/Cart?page=${pageCount + 1}&limit=4&sortBy=${sort.sortProperty.replace(
                    '-',
                    ''
                )}&order=${order}${search}`
                : `https://64138209a68505ea733524cc.mockapi.io/Cart?category=${categoryId}&sortBy=${sort.sortProperty.replace(
                    '-',
                    ''
                )}&order=${order}${search}`
        );

        // Выполнение GET-запроса на указанный URL-адрес
        const {data} = await axios.get(urlData);

        return await data;
    }
);

// Начальное состояние для среза пицц
const initialState = {
    pizzas: [],
    status: 'loading', // loading, success, error
}

// Создание среза пицц
export const pizzasSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        // Установка списка пицц
        setItems(state, action) {
            state.pizzas = action.payload;
        },
    },
    extraReducers: {
        // Обработка состояния pending (загрузка)
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading';
            state.pizzas = [];
        },
        // Обработка состояния fulfilled (успех)
        [fetchPizzas.fulfilled]: (state, action) => {
            state.status = 'success';
            state.pizzas = action.payload;
        },
        // Обработка состояния rejected (ошибка)
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error';
            state.pizzas = [];
        }
    }
})

// Экспорт редюсера и экшенов среза пицц
export const {setItems} = pizzasSlice.actions;
export default pizzasSlice.reducer;