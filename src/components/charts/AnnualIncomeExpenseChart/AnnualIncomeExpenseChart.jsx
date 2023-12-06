import styled from './Annual.module.css';
import AnnualTotal from '../AnnualTotal/AnnualTotal';
import ChartRadio from '../ChartRadio/ChartRadio';
import IncomeChart from '../IncomeChart/IncomeChart';
import OutcomeChart from '../OutcomeChart/OutcomeChart';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

const AnnualIncomeExpenseChart = ({ item }) => {
  const currentYear = useSelector(({ chart }) => chart.currentYear);
  const [chartType, setChartType] = React.useState('bar');
  const [yearItems, setYearItems] = React.useState([]);

  React.useEffect(() => {
    const year = currentYear || new Date().getFullYear();
    const newItems = item
      .filter(({ date }) => date.getFullYear() === Number(year));
    setYearItems(newItems);
  }, [item, currentYear]);

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