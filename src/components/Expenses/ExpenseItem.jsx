import PropTypes from 'prop-types';
import styles from  './ExpenseItem.module.css'
const ExpenseItem = (props) => {
	return (
		<li>
			<div className={styles['expense-item']}>
				<div className={styles['expense-item__description']}>
					<div>
						<p>{props.category}</p>
						<h2>{props.title}</h2>
					</div>
					<div className={styles['expense-item__price']}>{`$${props.amount}`}</div>
					<button className={styles['expense-item__btn-edit']} type="button">EDIT</button>
					<button className={styles['expense-item__btn-delete']} type="button">DELETE</button>
				</div>
			</div>
		</li>
	)
}
ExpenseItem.propTypes = {
	category: PropTypes.string,
	title: PropTypes.string,
	amount: PropTypes.number
}
export default ExpenseItem;