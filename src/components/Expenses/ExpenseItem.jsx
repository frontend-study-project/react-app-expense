import PropTypes from "prop-types";
import styles from "./ExpenseItem.module.css";
import { useDeleteItems } from "../../hooks/useItems.js";
import { useDispatch } from "react-redux";
import { setIsFormAdd, setIsFormEdit, setExpenseState } from "../../store/form";
const ExpenseItem = (props) => {
	const { mutate : deleteItems} = useDeleteItems();
	const dispatch = useDispatch();
	const handleDeleteItem = (itemId) => {
		console.log("delete")
		deleteItems(itemId);
	};

	const handleEdit = () => {
		const fields = ['type', 'category', 'title', 'amount'];
		fields.forEach((field) => {
			dispatch(setExpenseState({
				name: field,
				value: props[field], // props에서 필드 값 가져오기
			}));
		});
		dispatch(setExpenseState({
			name: 'id',
			value: props.id,
		}));

		dispatch(setIsFormAdd(true));
		dispatch(setIsFormEdit(true, props.id));

		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
  return (
    <li>
      <div className={styles["expense-item"]}>
        <div className={styles["expense-item__description"]}>
          <div>
            <p>{props.category}</p>
            <h2>{props.title}</h2>
          </div>
          <div
            className={styles["expense-item__price"]}
          >{`$${props.amount}`}</div>
          <button
            className={styles["expense-item__btn-edit"]}
            type="button"
            onClick={handleEdit}
          >
            EDIT
          </button>
          <button
            className={styles["expense-item__btn-delete"]}
            type="button"
						onClick={()=>handleDeleteItem(props.id)}
          >
            DELETE
          </button>
        </div>
      </div>
    </li>
  );
};
ExpenseItem.propTypes = {
  id: PropTypes.string,
  category: PropTypes.string,
  title: PropTypes.string,
  amount: PropTypes.number,
  handleDeleteItem: PropTypes.func,
};

export default ExpenseItem;
