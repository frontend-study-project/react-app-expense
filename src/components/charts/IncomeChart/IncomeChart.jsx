import BarChart from "../BarChart/BarChart";
import ChartTitle from "../ChartTitle/ChartTitle";
import PieChart from "../PieChart/PieChart";
import styled from "./income.module.css";
import PropTypes from "prop-types";
import { useStatics } from "../../../hooks/useStatics";

const IncomeChart = ({ chartType, item }) => {
  const { keys, data, pieData } = useStatics(item, "income");

  return (
    <div
      className={`${styled["income"]} ${
        chartType === "pie" ? styled["pie-chart"] : ""
      }`}
    >
      <ChartTitle>수입 차트</ChartTitle>
      <div className={styled["income__chart--bar"]}>
        {chartType === "bar" ? (
          <BarChart data={data} keys={keys} />
        ) : (
          <>
            {pieData.length ? (
              <PieChart data={pieData} />
            ) : (
              <p className={styled["income__empty"]}>
                수입이 존재하지 않습니다.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

IncomeChart.propTypes = {
  chartType: PropTypes.string,
  item: PropTypes.array,
};

export default IncomeChart;
