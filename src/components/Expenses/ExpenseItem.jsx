import PropTypes from "prop-types";
import styles from "./ExpenseItem.module.css";
import { useDispatch } from "react-redux";
import { setIsFormAdd, setIsFormEdit } from "../../store/form";

const ExpenseItem = (props) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    props.handleDeleteItem(props.id);
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
            onClick={handleDelete}
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
