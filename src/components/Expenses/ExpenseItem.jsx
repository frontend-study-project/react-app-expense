import React from "react";
import './ExpenseItem.css'
import Card from "../UI/Card.jsx";
const ExpenseItem = (props) => {
	return (
		<li>
			<Card className="expense-item">
				<div className="expense-item__description">
					<div>
						<p>{props.category}</p>
						<h2>{props.title}</h2>
					</div>
					<div className="expense-item__price">{`$${props.amount}`}</div>
					<button className="expense-item__btn-edit" type="button">EDIT</button>
					<button className="expense-item__btn-delete" type="button">DELETE</button>
				</div>
			</Card>
		</li>
	)
}
export default ExpenseItem;