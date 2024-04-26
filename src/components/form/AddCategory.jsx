import { forwardRef, useRef, useState } from 'react';
import styled from './AddCategory.module.css';
import PropTypes from 'prop-types';

const AddCategory = forwardRef(
  ({ category, handleChangeState }, categoryRef) => {
    // Category Change
    const [isCategoryEdit, setIsCategoryEdit] = useState(false);
    const toggleIsCategoryEdit = () => {
      setIsCategoryEdit(!isCategoryEdit);
    };
    const [newCategory, setNewCategory] = useState('');
    const handleChangeCategory = (e) => {
      // category - input에서 value를 담을 useState
      setNewCategory(e.target.value);
    };
    const [categoryList, setCategoryList] = useState([
      '식비',
      '쇼핑',
      '취미',
      '보험',
      '교통',
    ]);

    const newCategoryRef = useRef(null);
    const handleAddCategory = () => {
      if (!newCategory.trim()) {
        alert('새로운 카테고리명을 입력해주세요!');
        newCategoryRef.current.focus();
        return;
      }
      setCategoryList([...categoryList, newCategory.trim()]);
      setNewCategory('');
      setIsCategoryEdit(!isCategoryEdit);
    };

    return (
      <div className={styled['form__box--category']}>
        {isCategoryEdit ? (
          <div className="form__box">
            <label htmlFor="categorcategoryAddcontentyAdd">
              새로운 카테고리 추가하기
            </label>
            <div className={styled['form__category--box']}>
              <input
                ref={newCategoryRef}
                type="text"
                id="categoryAddcontent"
                name="newCategory"
                value={newCategory}
                onChange={handleChangeCategory}
              />
              <button
                type="button"
                className={`${styled['form__btn']} ${styled['form__btn--add-category']}`}
                onClick={handleAddCategory}
              >
                추가
              </button>
              <button
                type="button"
                className={`${styled['form__btn']} ${styled['form__btn--cancle-category']}`}
                onClick={toggleIsCategoryEdit}
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <>
            <label htmlFor="category">카테고리</label>
            <div className={styled['form__category--box']}>
              <select
                ref={categoryRef}
                name="category"
                value={category}
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
                className={`${styled['form__btn']} ${styled['form__btn--category']}`}
                onClick={toggleIsCategoryEdit}
              >
                추가
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
);

AddCategory.displayName = 'AddCategory';

AddCategory.propTypes = {
  category: PropTypes.string,
  handleChangeState: PropTypes.func,
};

export default AddCategory;
