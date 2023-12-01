import { useEffect, useRef, useState } from "react";
import styled from "./Form.module.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setIsFormEdit, setIsFormAdd } from "../../store/form";

// 0. Add Expense 버튼을 Edit 버튼으로 수정해주기 (옆에 cancle 버튼도!)
// 1. edit 버튼을 눌렀을 때 해당하는 아이템의 id 값을 가져온다
// 2. 해당 id를 가진 아이템의 category, title, amount, date를 Form.jsx에 뿌린다
// 3. 수정된 form에 있는 데이터들을 다시 가져와서 리스트로 뿌려준다

const Form = ({
  item,
  setItem,
}) => {
  const { isFormAdd, isFormEdit } = useSelector(({ form }) => ({
    isFormAdd: form.isFormAdd,
    isFormEdit: form.isFormEdit
  }));
  const dispatcch = useDispatch();

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

  const initialState = {
    type: "income",
    category: "",
    title: "",
    amount: 0,
    date: "",
  };

  const [expenseState, setExpenseState] = useState(initialState);
  const handleChangeState = (e) => {
    setExpenseState({
      ...expenseState,
      [e.target.name]: e.target.value,
    });
  };

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

    // 1. App.jsx에서 item을 불러오지 않고 setItem으로만 불러오는 방법
    setItem((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: expenseState.type,
        category: expenseState.category,
        title: expenseState.title,
        amount: Number(expenseState.amount),
        date: new Date(expenseState.date),
      },
    ]);

    // 2. App.jsx에서 item을 가져온뒤 아래와 같이 setItem 하는 방법
    // setItem({
    //   id: crypto.randomUUID(),
    //   category: expenseState.category,
    //   title: expenseState.title,
    //   amount: expenseState.amount,
    //   date: new Date(expenseState.date),
    // });

    setExpenseState(initialState);
  };

  useEffect(() => {
    const findItem = item.find((item) => item.id == isFormEdit);
    if (!findItem) return;
    setExpenseState(findItem);
  }, [isFormEdit, item]);

  const handleSubmitEdit = () => {
    setItem((prev) =>
      prev.map((item) => {
        if (isFormEdit == item.id) {
          return {
            id: isFormEdit,
            category: expenseState.category,
            title: expenseState.title,
            amount: Number(expenseState.amount),
            date: new Date(expenseState.date),
          };
        }
        return item;
      })
    );

    dispatcch(setIsFormEdit(false));
    setExpenseState(initialState);
  };

  const toggleIsFormAdd = () => dispatcch(setIsFormAdd(!isFormAdd));

  return (
    <div className={styled.form__content}>
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
                        cancle
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
                      dispatcch(setIsFormEdit(false));
                      setExpenseState(initialState);
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
  setItem: PropTypes.func,
};

export default Form;
