import styles from './ExpensesList.module.css';
import ExpenseItem from './ExpenseItem.jsx';
import ExpenseDate from './ExpenseDate.jsx';
import { useEffect, useState } from 'react';
import { useFetchItems } from '../../hooks/useItems';
import Search from '../search/Search.jsx';
import Pagination from '../pagination/Pagination';

const ExpensesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const { data: items } = useFetchItems(currentPage, searchInput);
  const [sortedItems, setSortedItems] = useState([]);
  const searchItems = (serchValue) => {
    setSearchInput(serchValue);
  };

  useEffect(() => {
    if (!items.newItems) return;
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
      {items.dataCheckMessage ? (
        <p className={styles['expense-search__result-txt']}>
          {items.dataCheckMessage}
        </p>
      ) : (
        <>
          <Search searchItems={searchItems} />
          {items.searchResultMessage ? (
            <p className={styles['expense-search__result-txt']}>
              {items.searchResultMessage}
            </p>
          ) : (
            <>
              <ul className={styles['expenses-list']}>
                {sortedItems.map((expenseList, index) => (
                  <div key={index}>
                    <ExpenseDate date={expenseList.date} />
                    {expenseList.map((expense) => (
                      <ExpenseItem key={expense.id} expense={expense} />
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
          )}
        </>
      )}
    </>
  );
};

export default ExpensesList;
