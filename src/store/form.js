import { createSlice } from "@reduxjs/toolkit";
const initialExpenseState = {
	type: "income",
	category: "",
	title: "",
	amount: 0,
	date: "",
}
const initialState = {
  isFormAdd: false,
  isFormEdit: false,
  expenseState: initialExpenseState,
	expenseCopy: {}
}

const reducers = {
  setIsFormAdd(state, { payload: isFormAdd }) {
    state.isFormAdd = isFormAdd;
  },

  setIsFormEdit(state, { payload: isFormEdit }) {
    state.isFormEdit = isFormEdit;
  },
  setExpenseState(state, { payload: expenseState}) {
    state.expenseState = {
      ...state.expenseState,
      [expenseState.name]: expenseState.value, //속성의 이름을 동적으로 설정할때, 자바스크립트에서는 []대괄호를 사용한다.!
    }
  },
	resetExpenseState(state) {
		state.expenseState = initialExpenseState;
	},
}; 

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers
});

export const { setIsFormAdd, setIsFormEdit, setExpenseState, resetExpenseState } = formSlice.actions;

export default formSlice.reducer;
