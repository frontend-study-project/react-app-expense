import React, { useState } from "react";
import styled from "./Form.module.css";

const Form = (props) => {
  // Add New Expense
  const [isFormEdit, setIsFormEdit] = useState(false);
  const toggleIsFormEdit = () => setIsFormEdit(!isFormEdit);

  const [isCategoryEdit, setIsCategoryEdit] = useState(false);
  const toggleIsCategoryEdit = () => {
    console.log(isFormEdit);
    setIsCategoryEdit(!isCategoryEdit);
  };

  return (
    <div className={styled.form__content}>
      {isFormEdit ? (
        <>
          <form id="expenseForm" className="form">
            <div className={styled["form__box"]}>
              <div className={styled["form__box--category"]}>
                {isCategoryEdit ? (
                  <>
                    <label htmlFor="categorcategoryAddTitleyAdd">
                      Add a new category
                    </label>
                    <button
                      type="button"
                      className={`${styled["form__btn"]} ${styled["form__btn--category"]}`}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className={`${styled["form__btn"]} ${styled["form__btn--category"]}`}
                    >
                      cancle
                    </button>
                    <input type="text" id="categoryAddTitle" />
                  </>
                ) : (
                  <>
                    <label htmlFor="category">Category</label>
                    <button
                      type="button"
                      className={`${styled["form__btn"]} ${styled["form__btn--category"]}`}
                      onClick={toggleIsCategoryEdit}
                    >
                      Add
                    </button>
                    <select>
                      <option value="default">카테고리 선택</option>
                      <option value={"식비"}>식비</option>
                      <option value={"쇼핑"}>쇼핑</option>
                      <option value={"취미"}>취미</option>
                      <option value={"보험"}>보험</option>
                      <option value={"교통"}>교통</option>
                    </select>
                  </>
                )}
              </div>
              <div className={styled["form__box--title"]}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" />
              </div>
            </div>

            <div className={styled["form__box"]}>
              <div className={styled["form__box--amount"]}>
                <label htmlFor="amount">Amount</label>
                <input type="number" id="amount" />
              </div>
              <div className={styled["form__box--date"]}>
                <label>Date</label>
                <input type="date" />
              </div>
            </div>
            <div className={styled["form__box"]}>
              <button type="button" className={styled["form__btn"]}>
                Cancel
              </button>
              <button type="button" className={styled["form__btn"]}>
                Add Expense
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <button
            type="button"
            className={styled["form__btn"]}
            onClick={toggleIsFormEdit}
          >
            Add New Expense
          </button>
        </>
      )}
    </div>
  );
};
export default Form;
