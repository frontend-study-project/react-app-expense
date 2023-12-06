import React from "react";
import BarChart from "../BarChart/BarChart";
import ChartTitle from "../ChartTitle/ChartTitle";
import styled from './annual.total.module.css';
import PropTypes from 'prop-types';

const keys = ["수입", "지출", "잔고"];

const AnnualTotal = ({ item, dateState, setDateState }) => {
  const [data, setData] = React.useState([]);
  const [balance, setBalance] = React.useState(0);
  const [balancePercent, setBalancePercent] = React.useState(0);

  React.useEffect(() => {
    const totalExpense = item
      .filter(({ category }) => !keys.includes(category))
      .reduce((acc, { amount }) => acc + amount, 0);
    const totalIncome = 0
    const total = totalIncome - totalExpense;

    setData([
      {
        type: "수입",
        수입: totalIncome
      },
      {
        type: "지출",
        지출: totalExpense
      },
      {
        type: "잔고",
        잔고: total
      }
    ]);
    setBalance(total);
    setBalancePercent(total ? totalIncome / total : 0)
  }, [item]);

  const handleChange = (e) => {
    setDateState(e.target.value);
  };

  return (
    <div className={styled["annual-total"]}>
      <ChartTitle className={styled["annual-total__title"]}>
        <span>연도별 보기</span>
        <select className={styled["annual-total__title--year"]} value={dateState} onChange={handleChange}>
          {
            Array
              .from({ length: 4 }, (_, index) => new Date().getFullYear() - index)
              .map((year) => (
                <option key={year}>{year}</option>
              ))
          }
        </select>
      </ChartTitle>
      <div>
        <div className={styled["annual-total__chart"]}>
          <BarChart data={data} keys={keys} />
        </div>
        <div className={styled["annual-total__balance"]}>
          <div className={styled["annual-total__total-value"]}>
            <span>{balance.toLocaleString()}원</span>
            <span>Saved this year</span>
          </div>
          <div className={styled["annual-total__total-percent"]}>
            <span>{balancePercent}%</span>
            <span>Saving rate</span>
          </div>
        </div>
      </div>
    </div>
  )
};

AnnualTotal.propTypes = {
  item: PropTypes.array,
  dateState: PropTypes.string,
  setDateState: PropTypes.func,
}

export default AnnualTotal;
