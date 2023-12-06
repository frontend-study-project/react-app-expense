import PropTypes from "prop-types";
import styles from "./ExpenseItem.module.css";
const ExpenseItem = (props) => {
  const handleDelete = () => {
    props.handleDeleteItem(props.id);
  };
  const handleEdit = () => {
    props.setIsFormEdit(props.id);
    props.setIsFormAdd(true);
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
  setIsFormEdit: PropTypes.func,
  setIsFormAdd: PropTypes.func,
};
export default ExpenseItem;
