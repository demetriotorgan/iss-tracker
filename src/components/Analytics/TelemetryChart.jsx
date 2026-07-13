import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const TelemetryChart = ({
  data = [],
  dataKey,
  color,
  unit
}) => {
  if (data.length === 0) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#4FC3FF',
          fontSize: '12px',
        }}
      >
        Aguardando telemetria...
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: -20,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00A3FF" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#00A3FF" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid
          stroke="#14304D"
          strokeDasharray="3 3"
          vertical={false}
        />

        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          stroke="#7FA8D6"
          fontSize={10}
        />

        <YAxis
          tickLine={false}
          axisLine={false}
          stroke="#7FA8D6"
          fontSize={10}
          domain={[
            (dataMin) => Math.floor(dataMin - 5),
            (dataMax) => Math.ceil(dataMax + 5),
          ]}
        />

        <Tooltip
          formatter={(value) => [
            `${Number(value).toLocaleString('pt-BR')} ${unit}`,
            dataKey,
          ]}
          contentStyle={{
            backgroundColor: '#071324',
            border: '1px solid #00A3FF',
            borderRadius: '8px',
            color: '#F5F7FA',
          }}
        />

        <Area
  type="monotone"
  dataKey={dataKey}
  stroke={color}
  strokeWidth={2}
  fill={`url(#gradient-${dataKey})`}
  isAnimationActive={false}
  dot={false}
  activeDot={{ r: 4 }}
/>
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TelemetryChart;