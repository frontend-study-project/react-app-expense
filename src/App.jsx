import {useEffect, useState} from "react";
// import PropTypes from "prop-types";
import "./App.css";
import Expenses from "./components/Expenses/Expenses.jsx";
import Form from "./components/form/Form.jsx";
import AnnualIncomeExpenseChart from "./components/charts/AnnualIncomeExpenseChart/AnnualIncomeExpenseChart.jsx";
import Pagination from "./components/pagination/Pagination.jsx";
import LoadingIndicator from "./components/UI/LoadingIndicator.jsx";
import { useFetchItems } from "./hooks/useItems.js";

function App() {
	const { data : items, isLoading } = useFetchItems('expenses');
	const [item, setItem] = useState();

	// pagination
	const postPerPage = 3; //페이지당 글갯수
	const [currentPage, setCurrentPage] = useState(1); //현재 페이지
	const [currentPageItem, setCurrentPageItem] = useState([]);


	// 네네 그럼 일단은 expense에서 데이터를 뿌려줘야 되서
	// 네! 이제 useQuery를 활용한 페이지네이션을 할 것이기에 slice는 이제 service/api 쪽에서 페이지 번호를 받아와서 처리하면 될거 같아요
	// 그리고 사실상 데이터를 App.jsx에서 직접 사용하는 것이 아니기 때문에 실제로 뿌려주는 곳에서 호출해주면 좋을거 같아요
	// 네1
	useEffect(() => {
		// 현재페이지에 표시할 시작인덱스와 끝인덱스
		// 0,1,2 -> 1페이지
		// 3,4,5 -> 2페이지
		// 6,7,8 -> 3페이지
		const startIndex = (currentPage - 1) * postPerPage;
		const endIndex = startIndex + postPerPage;
		setCurrentPageItem(items.slice(startIndex, endIndex));
	}, [currentPage, items, postPerPage, setCurrentPageItem]);

	if(isLoading) return <LoadingIndicator />

	return (
    <div>
      <Form setItem={setItem} />
      <AnnualIncomeExpenseChart />
      <Expenses />
			{/*<Pagination*/}
			{/*	item={items}*/}
			{/*	total={items.length}*/}
			{/*	postPerPage={postPerPage}*/}
			{/*	currentPage={currentPage}*/}
			{/*	setCurrentPage={setCurrentPage}*/}
			{/*	currentPageItem={currentPageItem}*/}
			{/*	setCurrentPageItem={setCurrentPageItem}*/}
			{/*/>*/}
    </div>
  );
}

export default App;
