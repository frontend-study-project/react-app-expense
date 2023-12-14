import { useEffect, useRef, useState } from "react";
import styled from "./Form.module.css";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { setIsFormEdit, setIsFormAdd, setExpenseState, resetExpenseState } from "../../store/form";
import { useFetchItems, useAddItems, useUpdateItems } from "../../hooks/useItems.js";

const Form = () => {
	const dispatch = useDispatch();
	const { data } = useFetchItems();
	const { mutate : addItemsMutate } = useAddItems();
  const { isFormAdd, isFormEdit, expenseState } = useSelector(({ form }) => ({
    isFormAdd: form.isFormAdd,
    isFormEdit: form.isFormEdit,
		expenseState: form.expenseState
  }));

	const categoryRef = useRef(null);
  const titleRef = useRef(null);
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
    dispatch(setExpenseState({
			name: e.target.name,
			value: e.target.value
    }))
  };

	const newItem = {
		id: uuidv4(),
		type: expenseState.type,
		category: expenseState.category,
		title: expenseState.title,
		amount: Number(expenseState.amount),
		date: new Date(expenseState.date),
	}

  const handleSubmitAdd = () => {
    if (expenseState.category === "default" || !expenseState.category) {
      alert("카테고리를 선택하세요!");
      categoryRef.current.focus();
      return;
    }
    if (expenseState.title.length < 1) {
      alert("Title은 최소 1글자 이상 입력해주세요!");
      titleRef.current.focus();
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

  // useEffect(() => {
  //   const findItem = items.find((item) => item.id == isFormEdit);
	// 	console.log(findItem)
  //   if (!findItem) return;
  //   dispatch(setExpenseState(findItem));
  // }, [isFormEdit, items]);

  const handleSubmitEdit = () => {
		console.log(expenseState);
		useUpdateItems();
  };

  const toggleIsFormAdd = () => dispatch(setIsFormAdd(!isFormAdd));

	return (
    <div className={styled.form__content}>
			{/* true > edit, false > add */}
      {isFormAdd ? (
        <>
          <form id="expenseForm" className="form">
            <div className={styled["form__box"]}>
              <div
                className={styled["form__box--type"]}
                role="radiogroup"
                aria-labelledby="typeTitle"
              >
                <strong id="typeTitle">거래구분</strong>
                <input
                  type="radio"
                  id="income"
                  name="type"
                  value="income"
                  onChange={handleChangeState}
                  checked={expenseState.type === "income"}
                />
                <label htmlFor="income">수입</label>
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
              <div className={styled["form__box--category"]}>
                {isCategoryEdit ? (
                  <>
                    <div className={styled["form__category--box"]}>
                      <label htmlFor="categorcategoryAddTitleyAdd">
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
                      id="categoryAddTitle"
                      name="newCategory"
                      value={newCategory}
                      onChange={handleChangeCategory}
                    />
                  </>
                ) : (
                  <>
                    <div className={styled["form__category--box"]}>
                      <label htmlFor="category">Category</label>
                      <button
                        type="button"
                        className={`${styled["form__btn"]} ${styled["form__btn--category"]}`}
                        onClick={toggleIsCategoryEdit}
                      >
                        Add
                      </button>
                    </div>
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
                  </>
                )}
              </div>
              <div className={styled["form__box--title"]}>
                <label htmlFor="title">Title</label>
                <input
                  ref={titleRef}
                  type="text"
                  id="title"
                  name="title"
                  value={expenseState.title}
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
                    onClick={toggleIsFormAdd}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={styled["form__btn"]}
                    onClick={handleSubmitAdd}
                  >
                    Add Expense
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
            Add New Expense
          </button>
        </>
      )}
    </div>
  );
};

Form.propTypes = {
  item: PropTypes.arrayOf(PropTypes.object),
	setExpenseState: PropTypes.func
};

export default Form;
