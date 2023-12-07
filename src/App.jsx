import {useEffect, useState} from "react";
// import PropTypes from "prop-types";
import "./App.css";
import Expenses from "./components/Expenses/Expenses.jsx";
import Form from "./components/form/Form.jsx";
import AnnualIncomeExpenseChart from "./components/charts/AnnualIncomeExpenseChart/AnnualIncomeExpenseChart.jsx";
import Pagination from "./components/pagination/Pagination.jsx";
import {useQuery} from "react-query";
import LoadingIndicator from "./components/UI/LoadingIndicator.jsx";

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

	const fetchItemsFromLocalStorage = async () => {
		const itemsString = localStorage.getItem("items");
		const items = JSON.parse(itemsString || []).map((item) => {
			return {
				...item,
				amount: Number(item.amount),
				date: new Date(item. date)
			}
		})
		return items
	};

	const { data, isLoading } = useQuery(
		"expenses",
		fetchItemsFromLocalStorage
	)
	console.log(data)

	useEffect(() => {
		if(data) {
			setItem(data);
		}
	}, [data]);

	if(isLoading) return <LoadingIndicator />

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
        items={item}
        setItem={setItem}
      />
    </div>
  );
}

export default App;
