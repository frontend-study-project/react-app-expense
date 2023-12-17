import PropTypes from "prop-types";
import styles from "./ExpensesList.module.css";
import ExpenseItem from "./ExpenseItem.jsx";
import ExpenseDate from "./ExpenseDate.jsx";
import { useEffect, useState } from "react";
import { useFetchItems } from "../../hooks/useItems";
import Search from "../search/Search.jsx";
import Pagination from "../pagination/Pagination";
import {useSelector} from "react-redux";

const ExpensesList = () => {
	const [ currentPage, setCurrentPage ] = useState(1);
	const { data : items } = useFetchItems(currentPage);
	const [ sortedItems, setSortedItems ] = useState([]);
	console.log(items)


	useEffect(() => {
		if(!items.newItems) return;
		const groupedItems = items.newItems.reduce((acc, item) => {
			const time = `${item.date.getFullYear()}-${item.date.getMonth()}-${item.date.getDate()}`;
			const list = acc.get(time) || [];
			list.push(item);
			list.date = item.date;
			acc.set(time, list);
			return acc;
		}, new Map());

		setSortedItems([...groupedItems.values()]);
	}, [items.newItems, setSortedItems, currentPage]);

	return (
		<>
			{ items.newItems.length <= 0 ? (
				<p style={{ color: '#ffffff' }}>데이터를 추가하세요</p>
			) : (
				<>
					<Search />
					<ul className={styles["expenses-list"]}>
						{sortedItems.map((expenseList, index) => (
							<div key={index}>
								<ExpenseDate date={expenseList.date} />
								{expenseList.map((expense) => (
									<ExpenseItem
										key={expense.id}
										id={expense.id}
										type={expense.type}
										category={expense.category}
										title={expense.title}
										amount={expense.amount}
										date={expense.date}
									/>
								))}
							</div>
						))}
					</ul>
					<Pagination
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						total={items.total || 0}
					/>
				</>
			)
			}
		</>
  );
};

export default ExpensesList;
