import BarChart from "../BarChart/BarChart";
import ChartTitle from "../ChartTitle/ChartTitle";
import PieChart from "../PieChart/PieChart";
import styled from "./outcome.module.css";
import PropTypes from "prop-types";
import { useStatics } from "../../../hooks/useStatics";

const OutcomeChart = ({ chartType, item }) => {
  const { keys, data, pieData } = useStatics(item, "outcome");

  return (
    <div
      className={`${styled["outcome"]} ${
        chartType === "pie" ? styled["pie-chart"] : ""
      }`}
    >
      <ChartTitle>지출 차트</ChartTitle>
      <div className={styled["outcome__chart--bar"]}>
        {chartType === "bar" ? (
          <BarChart data={data} keys={keys} />
        ) : (
          <>
            {pieData.length ? (
              <PieChart data={pieData} />
            ) : (
              <p className={styled["outcome__empty"]}>
                지출이 존재하지 않습니다.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

OutcomeChart.propTypes = {
  chartType: PropTypes.string,
  item: PropTypes.array,
};

export default OutcomeChart;
