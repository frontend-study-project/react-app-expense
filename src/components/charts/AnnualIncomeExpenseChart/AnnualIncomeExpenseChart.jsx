import styled from './Annual.module.css';
import AnnualTotal from '../AnnualTotal/AnnualTotal';
import ChartRadio from '../ChartRadio/ChartRadio';
import IncomeChart from '../IncomeChart/IncomeChart';
import OutcomeChart from '../OutcomeChart/OutcomeChart';
import PropTypes from 'prop-types';
import React from 'react';

const AnnualIncomeExpenseChart = ({ item, dateState, setDateState }) => {
  const [chartType, setChartType] = React.useState('bar');
  const [yearItems, setYearItems] = React.useState([]);

  React.useEffect(() => {
    const year = dateState || new Date().getFullYear();
    const newItems = item
      .filter(({ date }) => date.getFullYear() === Number(year));
    setYearItems(newItems);
  }, [item, dateState]);

  return (
    <div className={styled.annual}>
      <AnnualTotal item={yearItems} dateState={dateState} setDateState={setDateState} />
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
  dateState: PropTypes.string,
  setDateState: PropTypes.func,
}

export default AnnualIncomeExpenseChart;