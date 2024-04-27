import './reset.css';
import './App.css';
import Expenses from './components/expenses/Expenses.jsx';
import Form from './components/form/Form.jsx';
import AnnualIncomeExpenseChart from './components/charts/AnnualIncomeExpenseChart/AnnualIncomeExpenseChart.jsx';

function App() {
  return (
    <div className="components-container">
      <h1>HOUSEHOLD LEDGER</h1>
      {/* <AnnualIncomeExpenseChart /> */}
      <Form />
      <Expenses />
    </div>
  );
}

export default App;
