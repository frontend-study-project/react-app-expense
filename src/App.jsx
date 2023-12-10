import "./App.css";
import Expenses from "./components/Expenses/Expenses.jsx";
import Form from "./components/form/Form.jsx";
import AnnualIncomeExpenseChart from "./components/charts/AnnualIncomeExpenseChart/AnnualIncomeExpenseChart.jsx";
import Pagination from "./components/pagination/Pagination.jsx";
import {useState} from "react";

function App() {
	const [currentPage, setCurrentPage] = useState(1);

	return (
    <div>
      <Form />
      <AnnualIncomeExpenseChart />
      <Expenses currentPage={currentPage} />
			<Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;
