import styled from './Annual.module.css';
import BarChart from '../BarChart/BarChart';

const AnnualIncomeExpenseChart = () => {
  const data = [
    {
      "type": "수입",
      "수입": 10
    },
    {
      "type": "지출",
      "지출": 20
    },
    {
      "type": "잔고",
      "잔고": 10
    }
  ];
  const keys = ["수입", "지출", "잔고"];
  const balance = 200000;
  const balancePercent = 20;

  return (
    <div className={styled.annual}>
      <div className={styled.annual_chart}>
        <BarChart data={data} keys={keys} />
      </div>
      <div className={styled.balance}>
        <div className={styled.balance_value}>
          <span>{balance}원</span>
          <span>Saved this year</span>
        </div>
        <div className={styled.balance_percent}>
          <span>{balancePercent}%</span>
          <span>Saving rate</span>
        </div>
      </div>
    </div>
  )
};

export default AnnualIncomeExpenseChart;