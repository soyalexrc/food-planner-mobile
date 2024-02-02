import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/store";

const initialState: any = {
    foodType: ''
}


export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        updateFoodType: (state, action: PayloadAction<string>) => {
            state.foodType = action.payload
        },
    },
});

export const {
    updateFoodType
} = searchSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSearch = (state: RootState) => state.searchReducer

export default searchSlice.reducer
