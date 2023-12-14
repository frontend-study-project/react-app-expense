import styled from './Annual.module.css';
import AnnualTotal from '../AnnualTotal/AnnualTotal';
import ChartRadio from '../ChartRadio/ChartRadio';
import IncomeChart from '../IncomeChart/IncomeChart';
import OutcomeChart from '../OutcomeChart/OutcomeChart';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { useFetchItems } from "../../../hooks/useItems.js";

const AnnualIncomeExpenseChart = () => {
	const { data : items } = useFetchItems('expenses'); // 1년치에 대한 데이터의 훅

  const currentYear = useSelector(({ chart }) => chart.currentYear);
  const [chartType, setChartType] = React.useState('bar');
  const [yearItems, setYearItems] = React.useState([]);


  React.useEffect(() => {
    // currentYear도 undefind or null일경우 new Date().getFullYear()를 사용해서 현재 연도로 초기화하고 있어요
    const year = currentYear || new Date().getFullYear();
    const newItems = (items.newItems || [])
      .filter(({ date }) => date.getFullYear() === Number(year));
    setYearItems(newItems);
  }, [items.newItems, currentYear]);

  return (
    <div className={styled.annual}>
      <AnnualTotal item={yearItems} />
      <ChartRadio chartType={chartType} setChartType={setChartType} />
      <div className={`${chartType === 'pie' ? styled["pie-chart"] : ''}`}>
        <IncomeChart chartType={chartType} item={yearItems} />
        <OutcomeChart chartType={chartType} item={yearItems} />
      </div>
    </div>
  )
};

AnnualIncomeExpenseChart.propTypes = {
  item: PropTypes.array,
}

export default AnnualIncomeExpenseChart;