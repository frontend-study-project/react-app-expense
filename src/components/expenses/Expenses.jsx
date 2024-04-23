import PropTypes from "prop-types";
import styles from "./Expenses.module.css";
import ExpensesList from "./ExpensesList.jsx";

const Expenses = () => {
  return (
			<div className={styles["expenses"]}>
				<ExpensesList />
			</div>
  );
};

Expenses.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};
export default Expenses;
