import React from "react";

export const useStatics = (item, type) => {
  const [data, setData] = React.useState([]);
  const [keys, setKeys] = React.useState([]);
  const [pieData, setPieData] = React.useState([]);

  React.useEffect(() => {
    const newItem = item.filter((i) => i.type === type);

    const newKeys = new Set(newItem.map(({ category }) => category));
    const newData = Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
      const monthData = newItem
        .filter(({ date }) => date.getMonth() + 1 === month)
        .reduce((acc, newItem) => {
          const total = (acc[newItem.category] || 0) + newItem.amount;
          acc[newItem.category] = total;
          return acc;
        }, {});
      return {
        type: `${month}월`,
        ...monthData,
      };
    });

    const pieData = Object.entries(
      newData.reduce((acc, monthItem) => {
        Object.entries(monthItem)
          .filter(([category]) => category !== "type")
          .forEach(([category, amout]) => {
            acc[category] = (acc[category] || 0) + amout;
          });
        return acc;
      }, {})
    ).map(([category, amout]) => ({
      id: category,
      label: category,
      value: amout,
    }));

    setData(newData);
    setKeys([...newKeys]);
    setPieData(pieData);
  }, [item]);

  return { keys, data, pieData };
};
