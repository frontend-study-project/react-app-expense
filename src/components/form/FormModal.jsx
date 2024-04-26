import { createRef, useRef } from 'react';
import styled from './Form.module.css';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { setExpenseState, setModalState } from '../../store/form';
import { useAddItems, useUpdateItems } from '../../hooks/useItems.js';
import AddCategory from './AddCategory';

const FormModal = () => {
  const dispatch = useDispatch();
  const { mutate: addItemsMutate } = useAddItems();
  const { mutate: updateItemsMutate } = useUpdateItems();
  const { expenseState } = useSelector(({ form }) => ({
    expenseState: form.expenseState,
  }));
  const { visibleModal, isFormAdd, isFormEdit } = useSelector(
    ({ form: { modalState } }) => ({
      visibleModal: modalState.visibleModal,
      isFormAdd: modalState.isFormAdd,
      isFormEdit: modalState.isFormEdit,
    })
  );

  const categoryRef = createRef(null);
  const contentRef = useRef(null);
  const amountRef = useRef(null);
  const dateRef = useRef(null);

  const handleChangeState = (e) => {
    dispatch(
      setExpenseState({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const newItem = {
    id: uuidv4(),
    type: expenseState.type,
    category: expenseState.category,
    content: expenseState.content,
    amount: Number(expenseState.amount),
    date: new Date(expenseState.date),
  };

  const toggleFormModalAdd = () => {
    dispatch(
      setModalState({
        visibleModal: !visibleModal,
        isFormAdd: !isFormAdd,
      })
    );
  };

  const handleSubmitAdd = () => {
    if (expenseState.category === 'default' || !expenseState.category) {
      alert('카테고리를 선택하세요!');
      categoryRef.current.focus();
      return;
    }
    if (expenseState.content.trim().length < 1) {
      alert('content은 최소 1글자 이상 입력해주세요!');
      contentRef.current.focus();
      return;
    }
    if (expenseState.amount < 1) {
      alert('Amount는 0보다 커야 합니다!');
      amountRef.current.focus();
      return;
    }
    if (!expenseState.date) {
      alert('날짜를 입력해 주세요!');
      dateRef.current.focus();
      return;
    }

    addItemsMutate(newItem);
    toggleFormModalAdd();
  };

  const toggleFormModalEdit = () => {
    dispatch(
      setModalState({
        visibleModal: !visibleModal,
        isFormAdd: !isFormAdd,
      })
    );
  };

  const handleSubmitEdit = () => {
    updateItemsMutate(expenseState);
    toggleFormModalEdit();
  };

  return (
    <div className={styled['form__container']}>
      <form id="expenseForm" className={styled['form']}>
        <h2>새로운 거래</h2>
        <div className={styled['form__box']}>
          <strong id="typecontent">거래구분</strong>

          <div
            className={styled['form__box--type']}
            role="radiogroup"
            aria-labelledby="typecontent"
          >
            <div className={styled['form__box--type-inner']}>
              <input
                type="radio"
                id="income"
                name="type"
                value="income"
                onChange={handleChangeState}
                checked={expenseState.type === 'income'}
              />
              <label htmlFor="income">수입</label>
            </div>
            <div className={styled['form__box--type-inner']}>
              <input
                type="radio"
                id="outcome"
                name="type"
                value="outcome"
                onChange={handleChangeState}
                checked={expenseState.type === 'outcome'}
              />
              <label htmlFor="outcome">지출</label>
            </div>
          </div>
        </div>
        <div className={styled['form__box']}>
          <AddCategory
            ref={categoryRef}
            category={expenseState.category}
            handleChangeState={handleChangeState}
          />
        </div>
        <div className={styled['form__box']}>
          <div className={styled['form__box--content']}>
            <label htmlFor="content">내용</label>
            <input
              ref={contentRef}
              type="text"
              id="content"
              name="content"
              value={expenseState.content}
              onChange={handleChangeState}
              placeholder="내용을 입력하세요(예: 점심식사, 월급)"
            />
          </div>
        </div>

        <div className={styled['form__box']}>
          <div className={styled['form__box--amount']}>
            <label htmlFor="amount">금액</label>
            <input
              ref={amountRef}
              type="number"
              id="amount"
              name="amount"
              value={expenseState.amount}
              onChange={handleChangeState}
            />
          </div>
        </div>
        <div className={styled['form__box']}>
          <div className={styled['form__box--date']}>
            <label htmlFor="date">날짜</label>
            <input
              ref={dateRef}
              type="date"
              id="date"
              name="date"
              value={expenseState.date}
              onChange={handleChangeState}
            />
          </div>
        </div>
        <div
          className={`${styled['form__box']} ${styled['form__box--submit']}`}
        >
          {isFormEdit ? (
            <>
              <button
                type="button"
                className={`${styled['form__btn']} ${styled['form__btn-submit']}`}
                onClick={handleSubmitEdit}
              >
                수정하기
              </button>
              <button
                type="button"
                className={`${styled['form__btn']} ${styled['form__btn-cancle']}`}
                // onclick할떄는 함수를 전달해줘야함 -> 당장 호출하는게 아니라 특정 이벤트가 발생했을 때 호출되어야 하기 떄문
                onClick={() => {
                  // dispatch(setIsFormEdit(false));
                  // dispatch(setExpenseState(initialState))
                }}
              >
                닫기
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className={`${styled['form__btn']} ${styled['form__btn-submit']}`}
                onClick={handleSubmitAdd}
              >
                추가하기
              </button>
              <button
                type="button"
                className={`${styled['form__btn']} ${styled['form__btn-cancle']}`}
                onClick={toggleFormModalAdd}
              >
                닫기
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

FormModal.propTypes = {
  isFormAdd: PropTypes.func,
};

export default FormModal;
