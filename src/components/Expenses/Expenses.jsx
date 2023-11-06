import styles from './Expenses.module.css';
import ExpensesList from "./ExpensesList.jsx";

const Expenses = () => {
	return (
		<div className={styles['expenses']}>
			<ExpensesList />
		</div>
	)
}
export default Expenses;