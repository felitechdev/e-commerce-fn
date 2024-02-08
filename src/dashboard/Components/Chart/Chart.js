import React from 'react';
import { DualAxes } from '@ant-design/plots';

export const Chart = () => {
  const uvBillData = [
    {
      time: '2023-03',
      value: 350,
      type: 'revenue',
    },
    {
      time: '2023-04',
      value: 900,
      type: 'revenue',
    },
    {
      time: '2023-05',
      value: 300,
      type: 'revenue',
    },
    {
      time: '2023-06',
      value: 450,
      type: 'revenue',
    },
    {
      time: '2023-07',
      value: 470,
      type: 'revenue',
    },
    {
      time: '2023-03',
      value: 220,
      type: 'bill',
    },
    {
      time: '2023-04',
      value: 300,
      type: 'bill',
    },
    {
      time: '2023-05',
      value: 250,
      type: 'bill',
    },
    {
      time: '2023-06',
      value: 220,
      type: 'bill',
    },
    {
      time: '2023-07',
      value: 362,
      type: 'bill',
    },
  ];
  const transformData = [
    {
      time: '2023-03',
      count: 800,
      name: 'a',
    },
    {
      time: '2023-04',
      count: 600,
      name: 'a',
    },
    {
      time: '2023-05',
      count: 400,
      name: 'a',
    },
    {
      time: '2023-06',
      count: 380,
      name: 'a',
    },
    {
      time: '2023-07',
      count: 220,
      name: 'a',
    },
    {
      time: '2023-03',
      count: 750,
      name: 'b',
    },
    {
      time: '2023-04',
      count: 650,
      name: 'b',
    },
    {
      time: '2023-05',
      count: 450,
      name: 'b',
    },
    {
      time: '2023-06',
      count: 400,
      name: 'b',
    },
    {
      time: '2023-07',
      count: 320,
      name: 'b',
    },
    {
      time: '2023-03',
      count: 900,
      name: 'c',
    },
    {
      time: '2023-04',
      count: 600,
      name: 'c',
    },
    {
      time: '2023-05',
      count: 450,
      name: 'c',
    },
    {
      time: '2023-06',
      count: 300,
      name: 'c',
    },
    {
      time: '2023-07',
      count: 200,
      name: 'c',
    },
  ];
  const config = {
    data: [uvBillData, transformData],
    xField: 'time',
    yField: ['value', 'count'],
    geometryOptions: [
      {
        geometry: 'column',
        isGroup: true,
        seriesField: 'type',
        columnWidthRatio: 0.4,
      },
      {
        geometry: 'line',
        seriesField: 'name',
        lineStyle: ({ name }) => {
          if (name === 'a') {
            return {
              lineDash: [1, 4],
              opacity: 1,
            };
          }

          return {
            opacity: 0.5,
          };
        },
      },
    ],
    legend: {
        custom: false,
        position: 'bottom',
    }
  };
  return (
      <DualAxes {...config} style={{ width: '100%', height: '20rem' }} />
  );
};