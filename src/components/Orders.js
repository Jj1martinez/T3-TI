import React, {useEffect, useState} from "react";
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders(props) {
  var stocks=[]
  if(props.stocksNames.length){
    props.stocksNames.forEach(element => {
      stocks.push(element.ticker)
    });
  }
  // utilizamos este truquito de internet para que se actualice
  //https://stackoverflow.com/questions/59144539/react-usestate-doesnt-update-state-on-setinterval
  const [value, setValue] = useState(0); //
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(value => ++value);
    }, 100);
    return () => clearInterval(interval);
  }, []);
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Stocks</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Stock Ticker</TableCell>
            <TableCell>Volume</TableCell>
            <TableCell>Max Value</TableCell>
            <TableCell>Min Value</TableCell>
            <TableCell>Last Value</TableCell>
            <TableCell align="right">Variation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks.map((value,i) => (
            <TableRow key={i}>
              <TableCell>{value}</TableCell>
              <TableCell>{props.sellDict[value] + props.buyDict[value] }</TableCell>
              <TableCell>{props.maxDict[value]}</TableCell>
              <TableCell>{props.minDict[value]}</TableCell>
              <TableCell>{props.lastDict[value]}</TableCell>
              <TableCell align="right">{((props.last2Dict[value]/props.lastDict[value])*100-100).toFixed(2)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
