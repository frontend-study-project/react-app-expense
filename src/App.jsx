import { useState } from "react";
import "./App.css";
import Expenses from "./components/Expenses/Expenses.jsx";
import Form from "./components/form/Form.jsx";
import AnnualIncomeExpenseChart from "./components/charts/AnnualIncomeExpenseChart/AnnualIncomeExpenseChart.jsx";

function App() {
  const DUMMY_EXPENSES = [
    {
      id: "e1",
      category: "쇼핑",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    {
      id: "e2",
      category: "쇼핑",
      title: "New TV",
      amount: 799.49,
      date: new Date(2021, 2, 12),
    },
    {
      id: "e3",
      category: "보험",
      title: "Car Insurance",
      amount: 294.67,
      date: new Date(2021, 2, 28),
    },
    {
      id: "e4",
      category: "쇼핑",
      title: "New Desk (Wooden)",
      amount: 450,
      date: new Date(2021, 5, 12),
    },
  ];

  const [dateState, setDateState] = useState("");

  const [item, setItem] = useState(DUMMY_EXPENSES);

  return (
    <div>
      <Form />
      <AnnualIncomeExpenseChart />
      <Expenses items={DUMMY_EXPENSES} />
    </div>
  );
}

export default App;
