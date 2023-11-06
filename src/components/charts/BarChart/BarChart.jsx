import { ResponsiveBar } from '@nivo/bar';
import PropTypes from 'prop-types';

const BarChart = ({ data, keys }) => (
  <ResponsiveBar
    data={data}
    keys={keys}
    indexBy="type"
    margin={{ top: 10, right: 130, bottom: 30, left: 0 }}
    colors={{ scheme: 'nivo' }}
    theme={{
      labels: {
        text: {
          fontSize: 12,
          fill: '#000000',
        },
      },
      legends: {
        text: {
          fontSize: 12,
          fill: '#000000',
        },
      },
      axis: {
        legend: {
          text: {
            fontSize: 20,
            fill: '#000000',
          },
        },
        ticks: {
          text: {
            fontSize: 14,
            fill: '#000000',
          },
        },
      },
    }}

    label={{
      hidden: true
    }}

    axisLeft={null}

    enableGridY={false}
    enableLabel={false}

    legends={[
      {
        dataFrom: 'keys',
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: 'hover',
            style: {
                itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

BarChart.propTypes = {
  data: PropTypes.array, 
  keys: PropTypes.arrayOf(PropTypes.string)
}

export default BarChart;