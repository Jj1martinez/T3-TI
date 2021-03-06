import React, {useEffect, useState} from "react";
import { useTheme } from '@material-ui/core/styles';
import { LineChart,Tooltip, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

// const data = [
//   createData('00:00', 0),
//   createData('03:00', 300),
//   createData('06:00', 600),
//   createData('09:00', 800),
//   createData('12:00', 1500),
//   createData('15:00', 2000),
//   createData('18:00', 2400),
//   createData('21:00', 2000),
//   createData('24:00', 3000),
// ];

export default function Chart(props) {
  const theme = useTheme();
  var data =[]
  if(props.stock && props.stocksDict[props.stock]){
    props.stocksDict[props.stock].forEach((stock)=>{
      const time = new Date(stock.time).toLocaleString("es-CL")
      data.push(createData(time,stock.value))
    })
  }
  const [value, setValue] = useState(0); //
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(value => ++value);
    }, 100);
    return () => clearInterval(interval);
  }, [])
  return (
    <React.Fragment>
      <Title>{props.stock}</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Value
            </Label>
          </YAxis>
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={true} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
