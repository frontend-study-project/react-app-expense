import styled from './Annual.module.css';
import AnnualTotal from '../AnnualTotal/AnnualTotal';
import ChartRadio from '../ChartRadio/ChartRadio';
import IncomeChart from '../IncomeChart/IncomeChart';
import OutcomeChart from '../OutcomeChart/OutcomeChart';
import { useState } from 'react';

const AnnualIncomeExpenseChart = () => {
  const [chartType, setChartType] = useState('bar');
  return (
    <div className={styled.annual}>
      <AnnualTotal />
      <ChartRadio chartType={chartType} setChartType={setChartType} />
      <div className={`${chartType === 'pie' ? styled["pie-chart"] : ''}`}>
        <IncomeChart chartType={chartType} />
        <OutcomeChart chartType={chartType} />
      </div>
    </div>
  )
};

export default AnnualIncomeExpenseChart;