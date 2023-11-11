import PropTypes from 'prop-types';
import styled from './chart.title.module.css';

const ChartTitle = ({ children, className }) => (
  <h3 className={`${styled["chart-title"]} ${className ? className : ''}`}>{children}</h3>
);

ChartTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default ChartTitle;
