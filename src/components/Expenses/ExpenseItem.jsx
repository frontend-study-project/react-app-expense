import PropTypes from 'prop-types';
import styles from './ExpenseItem.module.css';
import { useDeleteItems } from '../../hooks/useItems.js';
import { useDispatch } from 'react-redux';
import { setExpenseState } from '../../store/form';
import { getDate } from '../../utils/getDate';
const ExpenseItem = ({ expense }) => {
  const { mutate: deleteItemsMutate } = useDeleteItems();
  const dispatch = useDispatch();
  const handleDeleteItem = (itemId) => {
    deleteItemsMutate(itemId);
  };

  const handleEdit = () => {
    const fields = ['type', 'category', 'content', 'amount'];
    fields.forEach((field) => {
      dispatch(
        setExpenseState({
          name: field,
          value: expense[field], // props에서 필드 값 가져오기
        })
      );
    });

    dispatch(
      setExpenseState({
        name: 'id',
        value: expense.id,
      })
    );
    dispatch(
      setExpenseState({
        name: 'date',
        value: getDate(expense.date),
      })
    );

    // dispatch(setIsFormAdd(true));
    // dispatch(setIsFormEdit(true, expense.id));

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const moveLeftHandler = (e) => {
    if (!e.currentTarget.matches('.on')) {
      e.currentTarget.classList.add('on');
      e.currentTarget.style.transform = `translate(-70px)`;
    } else {
      e.currentTarget.classList.remove('on');
      e.currentTarget.style.transform = `translate(0)`;
    }
  };

  return (
    <li>
      <div className={styles['expense-item']}>
        <div
          className={styles['expense-item__description']}
          onClick={moveLeftHandler}
        >
          <div>
            <p>{expense.category}</p>
            <h2>{expense.content}</h2>
          </div>
          <div
            className={`${styles['expense-item__price']} ${
              styles[expense.type]
            }`}
          >{`$${expense.amount}`}</div>
        </div>
        <div className={styles['expense-item__btn']}>
          <button
            className={styles['expense-item__btn-edit']}
            type="button"
            onClick={handleEdit}
          >
            수정
          </button>
          <button
            className={styles['expense-item__btn-delete']}
            type="button"
            onClick={() => handleDeleteItem(expense.id)}
          >
            지우기
          </button>
        </div>
      </div>
    </li>
  );
};
ExpenseItem.propTypes = {
  expense: PropTypes.object,
  handleDeleteItem: PropTypes.func,
};

export default ExpenseItem;
