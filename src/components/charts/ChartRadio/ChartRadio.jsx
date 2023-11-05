import PropTypes from 'prop-types';
import styled from './chart.radio.module.css';

const ChartRadio = ({ chartType, setChartType }) => {
  return (
    <div className={styled["chart-radio"]}>
      <div>
        <label className={styled["chart-radio--raido"]}>
          막대차트
          <input 
            type="radio" 
            name="chart" 
            checked={chartType === 'bar'} 
            onChange={() => setChartType('bar')}
          />
        </label>
        <label className={styled["chart-radio--raido"]}>
          파이차트
          <input 
            type="radio" 
            name="chart" 
            checked={chartType === 'pie'} 
            onChange={() => setChartType('pie')}
          />
        </label>
      </div>
    </div>
  )
};

ChartRadio.propTypes = {
  chartType: PropTypes.string,
  setChartType: PropTypes.func
}

export default ChartRadio;
