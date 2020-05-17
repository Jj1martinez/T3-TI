import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Button from '@material-ui/core/Button';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  var stocks=[]
  if(props.stocksNames.length){
    props.stocksNames.forEach(element => {
      stocks.push(element.ticker)
    });
  }
  const changeStockName = value =>{
    props.onChangeStock(value)
  }
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title >SELECT STOCK TO VIEW</Title>
      {stocks.map((value,i) => {
        return <Button key={i} onClick={() => changeStockName(value)} color="primary">{value}</Button>
      })}
    </React.Fragment>
  );
}
