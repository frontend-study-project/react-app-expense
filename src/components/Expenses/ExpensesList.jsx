import PropTypes from "prop-types";
import styles from "./ExpensesList.module.css";
import ExpenseItem from "./ExpenseItem.jsx";
import ExpenseDate from "./ExpenseDate.jsx";

const ExpensesList = ({ items, setItem, setIsFormEdit }) => {
  // 1. 부모로부터 setItem 받아오기 - O
  // 2. 자식에서 handleDeleteItem를 호출하며 id 받아오기
  const handleDeleteItem = (itemId) => {
    const newItemList = items.filter((it) => it.id !== itemId);
    setItem(newItemList);
  };
  return (
    <ul className={styles["expenses-list"]}>
      {items.map((expense) => (
        <div key={expense.id}>
          <ExpenseDate date={expense.date} />
          <ExpenseItem
            id={expense.id}
            category={expense.category}
            title={expense.title}
            amount={expense.amount}
            handleDeleteItem={handleDeleteItem}
            setIsFormEdit={setIsFormEdit}
          />
        </div>
      ))}
    </ul>
  );
};

ExpensesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  setItem: PropTypes.func,
  setIsFormEdit: PropTypes.func,
};

export default ExpensesList;
