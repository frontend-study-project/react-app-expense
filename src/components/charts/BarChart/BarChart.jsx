import { ResponsiveBar } from '@nivo/bar';

const Barchart = ({ data, keys }) => (
  <ResponsiveBar
    data={data}
    keys={keys}
    indexBy="type"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    colors={{ scheme: 'nivo' }}
    theme={{
      labels: {
        text: {
          fontSize: 14,
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
            fontSize: 16,
            fill: '#000000',
          },
        },
      },
      tooltip: {
        basic: {
          color: '#000000'
        }
      }
    }}

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

export default Barchart;