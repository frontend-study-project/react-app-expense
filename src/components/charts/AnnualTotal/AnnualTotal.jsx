import BarChart from "../BarChart/BarChart";
import ChartTitle from "../ChartTitle/ChartTitle";
import styled from './annual.total.module.css';

const AnnualTotal = () => {
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
    <div className={styled["annual-total"]}>
      <ChartTitle>연도별 보기</ChartTitle>
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

export default AnnualTotal;
