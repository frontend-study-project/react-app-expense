import { useEffect, useRef, useState } from "react";
import styled from "./Form.module.css";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { setIsFormEdit, setIsFormAdd, setExpenseState } from "../../store/form";
import {
  useFetchItems,
  useAddItems,
  useUpdateItems,
} from "../../hooks/useItems.js";

const Form = () => {
  const dispatch = useDispatch();
  const { mutate: addItemsMutate } = useAddItems();
  const { mutate: updateItemsMutate } = useUpdateItems();
  const { isFormAdd, isFormEdit, expenseState } = useSelector(({ form }) => ({
    isFormAdd: form.isFormAdd,
    isFormEdit: form.isFormEdit,
    expenseState: form.expenseState,
  }));

  const categoryRef = useRef(null);
  const contentRef = useRef(null);
  const amountRef = useRef(null);
  const dateRef = useRef(null);

  // Category Change
  const [isCategoryEdit, setIsCategoryEdit] = useState(false);
  const toggleIsCategoryEdit = () => {
    setIsCategoryEdit(!isCategoryEdit);
  };
  const [newCategory, setNewCategory] = useState("");
  const handleChangeCategory = (e) => {
    // category - input에서 value를 담을 useState
    setNewCategory(e.target.value);
  };
  const [categoryList, setCategoryList] = useState([
    "식비",
    "쇼핑",
    "취미",
    "보험",
    "교통",
  ]);
  const handleAddCategory = () => {
    setCategoryList([...categoryList, newCategory]);
    setNewCategory("");
    setIsCategoryEdit(!isCategoryEdit);
  };
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

  const handleSubmitAdd = () => {
    if (expenseState.category === "default" || !expenseState.category) {
      alert("카테고리를 선택하세요!");
      categoryRef.current.focus();
      return;
    }
    if (expenseState.content.length < 1) {
      alert("content은 최소 1글자 이상 입력해주세요!");
      contentRef.current.focus();
      return;
    }
    if (expenseState.amount < 1) {
      alert("Amount는 0보다 커야 합니다!");
      amountRef.current.focus();
      return;
    }
    if (!expenseState.date) {
      alert("날짜를 입력해 주세요!");
      dateRef.current.focus();
      return;
    }

    addItemsMutate(newItem);
  };
  const handleSubmitEdit = () => {
    updateItemsMutate(expenseState);
  };
  const toggleIsFormAdd = () => dispatch(setIsFormAdd(!isFormAdd));
  return (
    <div className={styled.form__content}>
      {/* true > edit, false > add */}
      {isFormAdd ? (
        <>
          <form id="expenseForm" className="form">
            <div className={styled["form__box"]}>
              <strong id="typecontent">거래구분</strong>

              <div
                className={styled["form__box--type"]}
                role="radiogroup"
                aria-labelledby="typecontent"
              >
                <div className={styled["form__box--type-inner"]}>
                  <input
                    type="radio"
                    id="income"
                    name="type"
                    value="income"
                    onChange={handleChangeState}
                    checked={expenseState.type === "income"}
                  />
                  <label htmlFor="income">수입</label>
                </div>
                <div className={styled["form__box--type-inner"]}>
                  <input
                    type="radio"
                    id="outcome"
                    name="type"
                    value="outcome"
                    onChange={handleChangeState}
                    checked={expenseState.type === "outcome"}
                  />
                  <label htmlFor="outcome">지출</label>
                </div>
              </div>
            </div>
            <div className={styled["form__box"]}>
              <div className={styled["form__box--category"]}>
                {isCategoryEdit ? (
                  <>
                    <div className={styled["form__category--box"]}>
                      <label htmlFor="categorcategoryAddcontentyAdd">
                        Add a new category
                      </label>
                      <button
                        type="button"
                        className={`${styled["form__btn"]} ${styled["form__btn--category"]}`}
                        onClick={handleAddCategory}
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        className={`${styled["form__btn"]} ${styled["form__btn--category"]}`}
                        onClick={toggleIsCategoryEdit}
                      >
                        cancel
                      </button>
                    </div>
                    <input
                      type="text"
                      id="categoryAddcontent"
                      name="newCategory"
                      value={newCategory}
                      onChange={handleChangeCategory}
                    />
                  </>
                ) : (
                  <>
                    <label htmlFor="category">카테고리</label>
                    <div className={styled["form__category--box"]}>
                      <select
                        ref={categoryRef}
                        name="category"
                        value={expenseState.category}
                        onChange={handleChangeState}
                      >
                        <option value="default">카테고리 선택</option>
                        {categoryList.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        className={`${styled["form__btn"]} ${styled["form__btn--category"]}`}
                        onClick={toggleIsCategoryEdit}
                      >
                        추가
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className={styled["form__box"]}>
              <div className={styled["form__box--content"]}>
                <label htmlFor="content">거래내용</label>
                <input
                  ref={contentRef}
                  type="text"
                  id="content"
                  name="content"
                  value={expenseState.content}
                  onChange={handleChangeState}
                />
              </div>
            </div>

            <div className={styled["form__box"]}>
              <div className={styled["form__box--amount"]}>
                <label htmlFor="amount">Amount</label>
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
            <div className={styled["form__box"]}>
              <div className={styled["form__box--date"]}>
                <label htmlFor="date">Date</label>
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
              className={`${styled["form__box"]} ${styled["form__box--submit"]}`}
            >
              {isFormEdit ? (
                <>
                  <button
                    type="button"
                    className={styled["form__btn"]}
                    // onclick할떄는 함수를 전달해줘야함 -> 당장 호출하는게 아니라 특정 이벤트가 발생했을 때 호출되어야 하기 떄문
                    onClick={() => {
                      dispatch(setIsFormEdit(false));
                      // dispatch(setExpenseState(initialState))
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={styled["form__btn"]}
                    onClick={handleSubmitEdit}
                  >
                    Edit
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className={styled["form__btn"]}
                    onClick={handleSubmitAdd}
                  >
                    추가하기
                  </button>
                  <button
                    type="button"
                    className={styled["form__btn"]}
                    onClick={toggleIsFormAdd}
                  >
                    닫기
                  </button>
                </>
              )}
            </div>
          </form>
        </>
      ) : (
        <>
          <button
            type="button"
            className={`${styled["form__btn"]} ${styled["form__btn--open-form"]}`}
            onClick={toggleIsFormAdd}
          >
            새 거래 내역을 추가하세요
          </button>
        </>
      )}
    </div>
  );
};

Form.propTypes = {
  item: PropTypes.arrayOf(PropTypes.object),
  setExpenseState: PropTypes.func,
};

export default Form;
