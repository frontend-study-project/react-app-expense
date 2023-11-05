import BarChart from "../BarChart/BarChart";
import ChartTitle from "../ChartTitle/ChartTitle";
import PieChart from "../PieChart/PieChart";
import styled from './outcome.module.css';
import PropTypes from 'prop-types';

const OutcomeChart = ({ chartType }) => {
  const data = Array.from({ length: 12 }, (_, index) => ({
    type: `${index + 1}월`,
    "근로수입": parseInt(Math.random() * 100) + 10,
    "비근로수입": parseInt(Math.random() * 100) + 10,
    "기타수입": parseInt(Math.random() * 100) + 10
  }));  
  const keys = ["근로수입", "비근로수입", "기타수입"];
  const pieData = [
    {
      id: '근로수입',
      label: '근로수입',
      value: 250,
      "color": "hsl(124, 70%, 50%)"
    },
    {
      id: '비근로수입',
      label: '비근로수입',
      value: 150,
      "color": "hsl(72, 70%, 50%)"
    }
  ]

  return (
    <div className={`${styled["outcome"]} ${chartType === 'pie' ? styled["pie-chart"] : ''}`}>
      <ChartTitle>지출 차트</ChartTitle>
      <div className={styled["outcome__chart--bar"]}>
        {chartType === 'bar' ? (
          <BarChart data={data} keys={keys} />
        ) : (
          <PieChart data={pieData} />
        )}
      </div>
    </div>
  )
};

OutcomeChart.propTypes = {
  chartType: PropTypes.string,
}

export default OutcomeChart;
