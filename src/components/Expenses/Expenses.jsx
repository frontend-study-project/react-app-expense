import PropTypes from "prop-types";
import styles from "./Expenses.module.css";
import ExpensesList from "./ExpensesList.jsx";

const Expenses = ({ items, setItem, setIsFormEdit }) => {
  return (
    <div className={styles["expenses"]}>
      <ExpensesList
        items={items}
        setItem={setItem}
        setIsFormEdit={setIsFormEdit}
      />
    </div>
  );
};

Expenses.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  setItem: PropTypes.func,
  setIsFormEdit: PropTypes.func,
};
export default Expenses;
