import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/store";
import {StatsByDay} from '@/interfaces/stats';

const initialState: StatsByDay = {
    date: new Date(),
    breakfast: {},
    dateFormatted: '',
    Dinner: {},
    lunch: {},
    afternoonSnack: {},
    morningSnack: {},
    MaxCalories: 0,
    totalCalories: 0,
    totalCarbs: 0,
    totalFat: 0,
    totalProteins: 0
}


export const statsByDaySlice = createSlice({
    name: 'statsByDay',
    initialState,
    reducers: {},
});

export const {

} = statsByDaySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectStatsByDay = (state: RootState) => state.statsByDayReducer

export default statsByDaySlice.reducer