import PropTypes from "prop-types";
import styles from "./ExpensesList.module.css";
import ExpenseItem from "./ExpenseItem.jsx";
import ExpenseDate from "./ExpenseDate.jsx";
import { useEffect, useState } from "react";
import { useFetchItems, useDeleteItems } from "../../hooks/useItems"

// 그리고 초기값은 어차피 임시 사용하는 데이터니까 main.js에서 로컬스토리지에 넣어주면 될거같아요!

const ExpensesList = () => {
	const { data : items, refetch } = useFetchItems('expenses');
	const { mutate : deleteItems} = useDeleteItems();
  const [sortedItems, setSortedItems] = useState([]);

  // 1. 부모로부터 setItem 받아오기 - O
  // 2. 자식에서 handleDeleteItem를 호출하며 id 받아오기
	const handleDeleteItem = async (itemId) => {
		// Use the mutate function from useDeleteItems
		await deleteItems(itemId, {
			onSuccess: () => {
				refetch();
			}
		})
	};

  useEffect(() => {
    const newItems = items
      .toSorted((a, b) => b.date - a.date)
      .reduce((acc, item) => {
        const time = `${item.date.getFullYear()}-${item.date.getMonth()}-${item.date.getDate()}`;
        const list = acc.get(time) || [];
        list.push(item);
        list.date = item.date;
        acc.set(time, list);
        return acc;
      }, new Map());

    setSortedItems([...newItems.values()]);
  }, [items, setSortedItems]);

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
              handleDeleteItem={handleDeleteItem}
            />
          ))}
        </div>
      ))}
    </ul>
  );
};

ExpensesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  setItem: PropTypes.func,
};

export default ExpensesList;
