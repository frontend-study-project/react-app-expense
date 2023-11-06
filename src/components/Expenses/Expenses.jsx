import PropTypes from "prop-types";
import styles from "./Expenses.module.css";
import ExpensesList from "./ExpensesList.jsx";

const Expenses = ({ items }) => {
  return (
    <div className={styles["expenses"]}>
      <ExpensesList items={items} />
    </div>
  );
};

Expenses.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};
export default Expenses;
