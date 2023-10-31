import React from "react";
import './ExpenseDate.css'
const ExpenseDate = (props) => {
	const month = props.date.getMonth() + 1;
	const day = props.date.getDate();
	return (
		<div className="expense-date">
			<span className="expense-date__month">{month}월</span>
			<span className="expense-date__day">{day}일</span>
		</div>
	)
}
export default ExpenseDate;