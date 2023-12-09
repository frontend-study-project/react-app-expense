// src/redux/slices/itemsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
	{
		id: "e1",
		type: "outcome", // type 추가
		category: "쇼핑",
		title: "Toilet Paper",
		amount: 94.12,
		date: new Date(2020, 7, 14),
	},
	{
		id: "e2",
		type: "outcome",
		category: "쇼핑",
		title: "New TV",
		amount: 799.49,
		date: new Date(2021, 2, 12),
	},
	{
		id: "e3",
		type: "outcome",
		category: "보험",
		title: "Car Insurance",
		amount: 294.67,
		date: new Date(2021, 2, 28),
	},
	{
		id: "e4",
		type: "outcome",
		category: "쇼핑",
		title: "New Desk (Wooden)",
		amount: 450,
		date: new Date(2021, 5, 12),
	}
];

const reducers = {
	setItems: (state, action) => action.payload
};

const itemsSlice = createSlice({
	name: 'items',
	initialState,
	reducers
});

export const { setItems } = itemsSlice.actions;
export default itemsSlice.reducer;