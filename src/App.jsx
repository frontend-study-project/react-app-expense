import {useEffect, useState} from "react";
// import PropTypes from "prop-types";
import "./App.css";
import Expenses from "./components/Expenses/Expenses.jsx";
import Form from "./components/form/Form.jsx";
import AnnualIncomeExpenseChart from "./components/charts/AnnualIncomeExpenseChart/AnnualIncomeExpenseChart.jsx";
import Pagination from "./components/pagination/Pagination.jsx";
import {useQuery} from "react-query";

function App() {
	const DUMMY_EXPENSES = [
		{
			id: "e1",
			type: "outcome", // type 추가
			category: "쇼핑",
			title: "Toilet Paper",
			amount: 94.12,
			date: new Date(2020, 7, 14),
		},
		{
			id: "e2",
			type: "outcome",
			category: "쇼핑",
			title: "New TV",
			amount: 799.49,
			date: new Date(2021, 2, 12),
		},
		{
			id: "e3",
			type: "outcome",
			category: "보험",
			title: "Car Insurance",
			amount: 294.67,
			date: new Date(2021, 2, 28),
		},
		{
			id: "e4",
			type: "outcome",
			category: "쇼핑",
			title: "New Desk (Wooden)",
			amount: 450,
			date: new Date(2021, 5, 12),
		}
	];
	const [item, setItem] = useState(DUMMY_EXPENSES);
	// pagination
	const postPerPage = 3; //페이지당 글갯수
	const [currentPage, setCurrentPage] = useState(1); //현재 페이지
	const [currentPageItem, setCurrentPageItem] = useState([]);
	useEffect(() => {
		// 현재페이지에 표시할 시작인덱스와 끝인덱스
		// 0,1,2 -> 1페이지
		// 3,4,5 -> 2페이지
		// 6,7,8 -> 3페이지
		const startIndex = (currentPage - 1) * postPerPage;
		const endIndex = startIndex + postPerPage;
		setCurrentPageItem(item.slice(startIndex, endIndex));
	}, [currentPage, item, postPerPage]);

	const fetchItemsFromLocalStorage = async () => {
		const itemsString = localStorage.getItem("items");
		const items = JSON.parse(itemsString) || [];
		return items;
	};

	const { data, isLoading } = useQuery(
		"expenses",
		fetchItemsFromLocalStorage
	)

	return (
    <div>
      <Form
        item={item}
        setItem={setItem}
      />
      <AnnualIncomeExpenseChart
        item={item}
      />
      <Expenses
        items={currentPageItem}
        setItem={setItem}
      />
			<Pagination
				total={item.length}
				postPerPage={postPerPage}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
    </div>
  );
}

export default App;
