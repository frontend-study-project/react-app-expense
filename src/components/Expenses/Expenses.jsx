import PropTypes from "prop-types";
import styles from "./Expenses.module.css";
import ExpensesList from "./ExpensesList.jsx";
import Search from "../search/Search.jsx";

const Expenses = () => {
  return (
			<div className={styles["expenses"]}>
				<Search />
				<ExpensesList />
			</div>
  );
};

Expenses.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  setItem: PropTypes.func,
};
export default Expenses;
