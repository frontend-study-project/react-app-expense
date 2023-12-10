import PropTypes from "prop-types";
import styles from "./ExpensesList.module.css";
import ExpenseItem from "./ExpenseItem.jsx";
import ExpenseDate from "./ExpenseDate.jsx";
import { useEffect, useState } from "react";
import { useFetchItems } from "../../hooks/useItems";
const ExpensesList = ({currentPage}) => {
	const { data : items, status, refetch} = useFetchItems();
  const [ sortedItems, setSortedItems ] = useState([]);

	useEffect(() => {
		if (status === 'success') {
			const postPerPage = 3;
			const startIndex = (currentPage - 1) * postPerPage;
			const endIndex = startIndex + postPerPage;

			const newItems = items
				.sort((a, b) => b.date - a.date)
				.slice(startIndex, endIndex);


			const groupedItems = newItems.reduce((acc, item) => {
				const time = `${item.date.getFullYear()}-${item.date.getMonth()}-${item.date.getDate()}`;
				const list = acc.get(time) || [];
				list.push(item);
				list.date = item.date;
				acc.set(time, list);
				return acc;
			}, new Map());

			setSortedItems([...groupedItems.values()]);
		}
	}, [items, status, setSortedItems, currentPage]);


	return (
    <ul className={styles["expenses-list"]}>
      {sortedItems.map((expenseList, index) => (
        <div key={index}>
          <ExpenseDate date={expenseList.date} />
          {expenseList.map((expense) => (
            <ExpenseItem
              key={expense.id}
              id={expense.id}
              category={expense.category}
              title={expense.title}
              amount={expense.amount}
            />
          ))}
        </div>
      ))}
    </ul>
  );
};

ExpensesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
	currentPage: PropTypes.number,
};

export default ExpensesList;
