import React, {useEffect, useState} from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import Exchange from './Exchange';
import Info from './Info';
import NavBar from './navbar';
import socket from '../socket-con/config';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));



socket.emit('STOCKS');
socket.emit('EXCHANGES');

export default function Dashboard() {
  const [stocksNames, setStockNames] = useState([]);
  const [stockAct, setStockAct] = useState('AAPL');
  const [exchangeNames, setExchangeNames] = useState([]);

   // Para resolver por acción
  const [stocksBuys, setStockBuys] = useState({});
  const [stocksSells, setStockSells] = useState({});
  var dicStockbuys={}
  var dicStocksells={}
 
  const [stocksMax, setStockMax] = useState({});
  const [stocksMin, setStockMin] = useState({});
  const [stocksLast, setStockLast] = useState({});
  const [stocksLast2, setStockLast2] = useState({});
  const [stocks,setStocks] = useState({});
  var dictStockMax={}
  var dictStockMin={}
  var dictStockLast={}
  var dictStockLast2={}
  var dictStocks={}


  useEffect(() => {
    socket.once('STOCKS', (data)=>{
      setStockNames([...data])
    })
    socket.once('EXCHANGES', (data)=>{
      var listExchange = []
      Object.keys(data).forEach((key)=>{
        console.log(data[key])
        listExchange.push(data[key])
      })
      setExchangeNames(listExchange)
      console.log(listExchange)
    })
  },[])
  useEffect(() => {
    socket.on("UPDATE", (data)=>{
      if(!dictStockMax[data.ticker]){
        dictStockMax[data.ticker]=data.value
        dictStockMin[data.ticker]=data.value
        dictStocks[data.ticker]=[data]
        dictStockLast2[data.ticker]=1
      }else{
        if (dictStockMax[data.ticker]<data.value) {
            dictStockMax[data.ticker]=data.value    
        }
        if (dictStockMin[data.ticker]>data.value){
          dictStockMin[data.ticker]=data.value
        }
        dictStockLast2[data.ticker]=dictStockLast[data.ticker]
        dictStocks[data.ticker].push(data)
      }
      // console.log(dictStocks)
      dictStockLast[data.ticker]=data.value
      setStockLast2(dictStockLast2)
      setStockMax(dictStockMax)
      setStockLast(dictStockLast)
      setStockMin(dictStockMin)
      setStocks(dictStocks)
      // console.log(stocksLast)
      // console.log(dictStockLast)

    })
    socket.on("BUY", (data)=>{
      if(!dicStockbuys[data.ticker]){
        dicStockbuys[data.ticker] = data.volume
      }else{
        dicStockbuys[data.ticker] += data.volume
      }
      setStockBuys(dicStockbuys)
    })
    socket.on("SELL", (data)=>{
      if(!dicStocksells[data.ticker]){
        dicStocksells[data.ticker] = data.volume
      }else{
        dicStocksells[data.ticker] += data.volume
      }
      setStockSells(dicStocksells)
    })
  },[])
  const test = "hola"
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const onChangeStock = (value) => {
    setStockAct(value)
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={8}>
              <Paper className={fixedHeightPaper}>
                <Chart stock={stockAct} stocksDict={stocks} />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={2}>
              <Paper className={fixedHeightPaper}>
                <Info stock={stockAct}
                stocksNames= {stocksNames}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <Paper className={fixedHeightPaper}>
                <Deposits onChangeStock= {onChangeStock} stocksNames= {stocksNames}/>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Exchange
                stocksNames= {stocksNames}
                exchangeNames= {exchangeNames}
                buyDict={stocksBuys}
                sellDict={stocksSells} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders
                stocksNames= {stocksNames}
                maxDict={stocksMax}
                minDict={stocksMin}
                lastDict={stocksLast}
                last2Dict={stocksLast2}
                buyDict={stocksBuys}
                sellDict={stocksSells} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
