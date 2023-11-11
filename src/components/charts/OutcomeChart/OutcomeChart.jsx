import React from "react";
import BarChart from "../BarChart/BarChart";
import ChartTitle from "../ChartTitle/ChartTitle";
import PieChart from "../PieChart/PieChart";
import styled from './outcome.module.css';
import PropTypes from 'prop-types';

const OutcomeChart = ({ chartType, item }) => {
  const [data, setData] = React.useState([]);
  const [keys, setKeys] = React.useState([]);
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
  ];

  React.useEffect(() => {
    const newKeys = new Set(item.map(({ category }) => category));
    const newData = Array
      .from({ length: 12 }, (_, i) => i + 1)
      .map((month) => {
        const newData = {};
        const monthData = item
          .filter(({ date }) => (date.getMonth() + 1) === month)
          .reduce((acc, item) => {
            const total = (acc[item.category] || 0) + item.amount
            acc[item.category] = total;
            return acc;
          }, newData);
        return {
          type: `${month}월`,
          ...monthData
        }
      });
    
    setData(newData);
    setKeys([...newKeys]);
  }, [item]);


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
  item: PropTypes.array,
}

export default OutcomeChart;
