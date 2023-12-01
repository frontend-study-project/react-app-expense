import PropTypes from "prop-types";
import styles from "./Expenses.module.css";
import ExpensesList from "./ExpensesList.jsx";

const Expenses = ({ items, setItem }) => {
  return (
    <div className={styles["expenses"]}>
      <ExpensesList
        items={items}
        setItem={setItem}
      />
    </div>
  );
};

Expenses.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  setItem: PropTypes.func,
};
export default Expenses;
