import { createSlice } from '@reduxjs/toolkit';
import { getDate } from '../utils/getDate';

const initialExpenseState = {
  type: 'income',
  category: '',
  content: '',
  amount: 0,
  date: getDate(new Date()),
};
const initialState = {
  modalState: {
    isFormAdd: false,
    isFormEdit: false,
    visibleModal: false,
  },
  expenseState: initialExpenseState,
};

const reducers = {
  setModalState(state, { payload: modalState }) {
    state.modalState = {
      ...state.modalState,
      ...modalState,
    };
  },
  // setIsFormAdd(state, { payload: isFormAdd }) {
  //   state.isFormAdd = isFormAdd;
  // },

  // setIsFormEdit(state, { payload: isFormEdit }) {
  //   state.isFormEdit = isFormEdit;
  // },

  setExpenseState(state, { payload: expenseState }) {
    state.expenseState = {
      ...state.expenseState,
      [expenseState.name]: expenseState.value, //속성의 이름을 동적으로 설정할때, 자바스크립트에서는 []대괄호를 사용한다.!
    };
  },

  resetExpenseState(state) {
    state.expenseState = initialExpenseState;
  },
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers,
});

export const { setModalState, setExpenseState, resetExpenseState } =
  formSlice.actions;

export default formSlice.reducer;
