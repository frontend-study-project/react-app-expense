import PropTypes from "prop-types";
import styles from "./Expenses.module.css";
import ExpensesList from "./ExpensesList.jsx";
import Search from "../search/Search.jsx";

const Expenses = ({currentPage}) => {
  return (
			<div className={styles["expenses"]}>
				<Search />
				<ExpensesList currentPage={currentPage} />
			</div>
  );
};

Expenses.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
	currentPage: PropTypes.number,
};
export default Expenses;
