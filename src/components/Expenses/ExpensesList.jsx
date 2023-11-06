import styles from './ExpensesList.module.css';
import ExpenseItem from "./ExpenseItem.jsx";
import ExpenseDate from "./ExpenseDate.jsx";

const ExpensesList = () => {
	const DUMMY_EXPENSES = [
		{
			id: 'e1',
			category: '쇼핑',
			title: 'Toilet Paper',
			amount: 94.12,
			date: new Date(2020, 7, 14),
		},
		{
			id: 'e2',
			category: '쇼핑',
			title: 'New TV',
			amount: 799.49,
			date: new Date(2021, 2, 12)
		},
		{
			id: 'e3',
			category: '보험',
			title: 'Car Insurance',
			amount: 294.67,
			date: new Date(2021, 2, 28),
		},
		{
			id: 'e4',
			category: '쇼핑',
			title: 'New Desk (Wooden)',
			amount: 450,
			date: new Date(2021, 5, 12),
		},
	];
	return (
		<ul className={styles['expenses-list']}>
			{DUMMY_EXPENSES.map((expense) => (
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

export default ExpensesList;
