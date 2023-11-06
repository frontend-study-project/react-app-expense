import PropTypes from 'prop-types';
import styled from './chart.title.module.css';

const ChartTitle = ({ children }) => (
  <h3 className={styled["chart-title"]}>{children}</h3>
);

ChartTitle.propTypes = {
  children: PropTypes.string
}

export default ChartTitle;
