import React from 'react';
import './Expenses.css';
import ExpensesList from "./ExpensesList.jsx";
import Card from "../UI/Card.jsx";

const Expenses = () => {
	return (
		<Card className="expenses">
			<ExpensesList />
		</Card>
	)
}
export default Expenses;