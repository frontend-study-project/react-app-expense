import PropTypes from "prop-types";
import styles from "./Expenses.module.css";
import ExpensesList from "./ExpensesList.jsx";

const Expenses = ({ items, setItem, setIsFormEdit, setIsFormAdd }) => {
  return (
    <div className={styles["expenses"]}>
      <ExpensesList
        items={items}
        setItem={setItem}
        setIsFormEdit={setIsFormEdit}
        setIsFormAdd={setIsFormAdd}
      />
    </div>
  );
};

Expenses.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  setItem: PropTypes.func,
  setIsFormAdd: PropTypes.func,
  setIsFormEdit: PropTypes.func,
};
export default Expenses;
