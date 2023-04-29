import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    pageCount: 0,
    sort: {name: 'популярности (DESC)', sortProperty: 'rating'}
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setActiveSort(state, action) {
            state.sort = action.payload;
        },
        setPageCount(state, action) {
            state.pageCount = action.payload;

            console.log(state.pageCount);
        },
        setFilters(state, action) {
            state.sort = action.payload.sort;
            state.pageCount = Number(action.payload.pageCount);
            state.categoryId = Number(action.payload.categoryId);
        }
    },
})

export const { setCategoryId, setActiveSort, setPageCount, setFilters} = filterSlice.actions

export default filterSlice.reducer