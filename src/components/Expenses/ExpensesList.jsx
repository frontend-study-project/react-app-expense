import PropTypes from "prop-types";
import styles from "./ExpensesList.module.css";
import ExpenseItem from "./ExpenseItem.jsx";
import ExpenseDate from "./ExpenseDate.jsx";

const ExpensesList = ({ items }) => {
  return (
    <ul className={styles["expenses-list"]}>
      {items.map((expense) => (
        <div key={expense.id}>
          <ExpenseDate date={expense.date} />
          <ExpenseItem
            id={expense.id}
            category={expense.category}
            title={expense.title}
            amount={expense.amount}
          />
        </div>
      ))}
    </ul>
  );
};

ExpensesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

export default ExpensesList;
