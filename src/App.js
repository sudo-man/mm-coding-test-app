import React, {Component} from 'react';
import './styles/scss/App.scss';
import './styles/scss/Clock.scss';
import Clock from 'react-clock';
import store from 'store';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Joyride from 'react-joyride';
import Moment from 'react-moment';
import AddItem from './components/AddItem'
import Items from './components/Items'
import Actions from './components/Actions'

import {TODO_ITEMS_KEY} from './contracts/store';

const styles = theme => ({
    root: {
        maxWidth: 936,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    block: {
        display: 'block',
    },
    bar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            now: new Date(),
            run: true,
            steps: [
                {
                    target: '.tour-step-priority',
                    content: 'Select your todo priority.',
                },
                {
                    target: '.tour-step-todo-input',
                    content: 'Type your todo in here',
                },
                {
                    target: '.tour-step-add-button',
                    content: 'Click add button to add new todo list',
                },
                {
                    target: '.tour-step-todo-list',
                    content: 'Your todo item list will show up over here!',
                }
            ]
        }
    }

    deleteItem = (index) => {
        let todoItems = store.get(TODO_ITEMS_KEY);
        store.set(TODO_ITEMS_KEY, todoItems.splice(1, index));
    }

    selectItem = (index) => {
        let todoItems = store.get(TODO_ITEMS_KEY);
        todoItems[index].active = ! todoItems[index].active;
        store.set(TODO_ITEMS_KEY, todoItems);
    }

    doneItem = (index) => {
        let todoItems = store.get(TODO_ITEMS_KEY);
        todoItems[index].done = true;
        store.set(TODO_ITEMS_KEY, todoItems);
    }

    componentDidMount() {
        setInterval(
            () => this.setState({now: new Date()}),
            1000
        );
    }

    render() {
        const {classes} = this.props;
        const {steps, run, now} = this.state;
        return (
            <div className="App">
                <div className="App-content">
                    <Joyride
                        continuous
                        run={run}
                        showSkipButton
                        steps={steps} />
                    <Typography color="textSecondary" align="center" style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 10,
                        color: '#FFF'
                    }}>
                        Auther: Alan Elias
                    </Typography>
                    <Grid className={classes.root}>
                        <Grid container spacing={16} alignItems="center" style={{padding: '20px 10px'}}>

                            <Grid item xs={8} alignItems="left">
                                <Typography align="left" style={{
                                    fontFamily: " 'Sofia', cursive",
                                    color: '#fff',
                                    fontSize: 50
                                }}>
                                    <Moment format="dddd, MMM D, YYYY">{now}</Moment>
                                </Typography>
                                <Typography align="left" style={{
                                    fontFamily: "'Sofia', cursive",
                                    color: '#fff',
                                    fontSize: 50
                                }}>
                                    <Moment format="hh:mm A">{now}</Moment>
                                </Typography>
                            </Grid>
                            <Grid item xs={4} align="right">
                                <Clock value={now}/>
                            </Grid>
                        </Grid>

                        <Paper className={classes.paper}>
                            <AppBar className={classes.bar} position="static" color="default" elevation={0}>
                                <AddItem store={store}/>
                            </AppBar>
                            <div style={{
                                padding: '10px 10px'
                            }}
                            className="tour-step-todo-list">
                                <Items data={store.get('todoItems')}
                                       deleteItem={(index) => { this.deleteItem(index) }}
                                       doneItem={index => this.doneItem(index)}
                                       selectItem={index => this.selectItem(index)}
                                />
                            </div>
                            <AppBar className={classes.bar} position="sticky" color="default" elevation={0}>
                                <Actions/>
                            </AppBar>
                        </Paper>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(App);
