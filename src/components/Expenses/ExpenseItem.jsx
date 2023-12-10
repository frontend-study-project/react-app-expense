import PropTypes from "prop-types";
import styles from "./ExpenseItem.module.css";
import { useDeleteItems, useFetchItems } from "../../hooks/useItems.js";
import { useDispatch } from "react-redux";
import { setIsFormAdd, setIsFormEdit } from "../../store/form";
const ExpenseItem = (props) => {
	const { data : items, refetch} = useFetchItems();
	const { mutate : deleteItems} = useDeleteItems();
	const dispatch = useDispatch();
	const handleDeleteItem = async (itemId) => {
		console.log("delete")
		await deleteItems(itemId, {
			onSuccess: () => {
				refetch();
			}
		})
	};
	const handleEdit = () => {
		dispatch(setIsFormEdit(props.id));
		dispatch(setIsFormAdd(true));
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
