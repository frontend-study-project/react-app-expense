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
	const { data : items } = useFetchItems('expenses');

  const currentYear = useSelector(({ chart }) => chart.currentYear);
  const [chartType, setChartType] = React.useState('bar');
  const [yearItems, setYearItems] = React.useState([]);


  React.useEffect(() => {
    const year = currentYear || new Date().getFullYear();
    const newItems = items
      .filter(({ date }) => date.getFullYear() === Number(year));
    setYearItems(newItems);
  }, [items, currentYear]);

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