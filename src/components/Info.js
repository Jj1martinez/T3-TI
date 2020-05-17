import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Button from '@material-ui/core/Button';

export default function Info(props) {
    var name = "No Company name"
    var dolar= "No quote Base"
    var country = "No Country"
    props.stocksNames.forEach(stock=>{
        if (stock.ticker==props.stock) {
            name= stock.company_name
            dolar= stock.quote_base
            country= stock.country
        }
    })
    return (
        <React.Fragment>
        <Title align="center" >{name}</Title>
        <Typography align="center" variant="subtitle1">{props.stock}</Typography>
        <Typography align="center" variant="p">{country}</Typography>
        <Typography align="center" variant="p">{dolar}</Typography>
        </React.Fragment>
    );
}
