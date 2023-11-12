import React from "react";
import BarChart from "../BarChart/BarChart";
import ChartTitle from "../ChartTitle/ChartTitle";
import PieChart from "../PieChart/PieChart";
import styled from './outcome.module.css';
import PropTypes from 'prop-types';

const OutcomeChart = ({ chartType, item }) => {
  const [data, setData] = React.useState([]);
  const [keys, setKeys] = React.useState([]);
  const [pieData, setPieData] = React.useState([]);

  React.useEffect(() => {
    const newKeys = new Set(item.map(({ category }) => category));
    const newData = Array
      .from({ length: 12 }, (_, i) => i + 1)
      .map((month) => {
        const monthData = item
          .filter(({ date }) => (date.getMonth() + 1) === month)
          .reduce((acc, item) => {
            const total = (acc[item.category] || 0) + item.amount
            acc[item.category] = total;
            return acc;
          }, {});
        return {
          type: `${month}월`,
          ...monthData
        }
      });
  
    const pieData = Object
      .entries(
        newData
          .reduce((acc, monthItem) => {
            Object
              .entries(monthItem)
              .filter(([category]) => category !== 'type')
              .forEach(([category, amout]) => {
                acc[category] = (acc[category] || 0) + amout;
              });
            return acc;
          }, {}))
      .map(([category, amout]) => ({
        id: category,
        label: category,
        value: amout,
      }))

    setData(newData);
    setKeys([...newKeys]);
    setPieData(pieData);
  }, [item]);

  return (
    <div className={`${styled["outcome"]} ${chartType === 'pie' ? styled["pie-chart"] : ''}`}>
      <ChartTitle>지출 차트</ChartTitle>
      <div className={styled["outcome__chart--bar"]}>
        {chartType === 'bar' ? (
          <BarChart data={data} keys={keys} />
        ) : (
          <>
            {
              pieData.length ? <PieChart data={pieData} /> : <p className={styled["outcome__empty"]}>지출이 존재하지 않습니다.</p>
            }
          </>
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
