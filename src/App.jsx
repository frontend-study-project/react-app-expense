import "./App.css";
import Expenses from "./components/Expenses/Expenses.jsx";
import Form from "./components/form/Form.jsx";
import AnnualIncomeExpenseChart from "./components/charts/AnnualIncomeExpenseChart/AnnualIncomeExpenseChart.jsx";

function App() {
	return (
    <div>
      <Form />
      {/*<AnnualIncomeExpenseChart />*/}
      <Expenses />
    </div>
  );
}

export default App;
