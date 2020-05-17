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

export default function Exchange(props) {
  var stocks={}
  var exchange=[]
  var dicBuy={}
  var dicSell= {}
  var dicStocks={}
  var dictVol={}
  var dicMarket={}
  var totVol=0
  if(props.exchangeNames.length &&  props.stocksNames.length){
    props.stocksNames.forEach((stock)=>{
        stocks[stock.company_name]= stock.ticker
      })
    props.exchangeNames.forEach(element => {
      exchange.push(element.name)
      dicBuy[element.name]=0
      dicSell[element.name]=0
      dictVol[element.name]=0
      dicMarket[element.name]=0
      dicStocks[element.name]=element.listed_companies.length   
      element.listed_companies.forEach((company)=>{
        dicBuy[element.name]+= props.buyDict[stocks[company]]
        dicSell[element.name]+= props.sellDict[stocks[company]]
        dictVol[element.name]+= (props.buyDict[stocks[company]] +props.sellDict[stocks[company]])
        
      })
      totVol+=dictVol[element.name]                                                                                                                                                                                                                                       
    });
    exchange.forEach((ex)=>{
        dicMarket[ex]= (dictVol[ex]/totVol *100).toFixed(2)
    })
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
  return (
    <React.Fragment>
      <Title>Exchange</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Market Name</TableCell>
            <TableCell>Buy Volume</TableCell>
            <TableCell>Sell Volume</TableCell>
            <TableCell>Total Volume</TableCell>
            <TableCell>Total stocks</TableCell>
            <TableCell align="right">Market Percentage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exchange.map((value,i) => (
            <TableRow key={i}>
              <TableCell>{value}</TableCell>
              <TableCell>{dicBuy[value]}</TableCell>
              <TableCell>{dicSell[value]}</TableCell>
              <TableCell>{dictVol[value]}</TableCell>
              <TableCell>{dicStocks[value]}</TableCell>
              <TableCell align="right">{dicMarket[value]}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
