import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {withStyles} from '@material-ui/core/styles';
import {options, DEFAULT_PRIORITY} from '../contracts/priority';
import {TODO_ITEMS_KEY, generateTodoItem} from '../contracts/store';
import PropTypes from 'prop-types';

const styles = theme => ({
    addInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    }
});

class AddItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            todo: "",
            isBusy: false,
            priority: DEFAULT_PRIORITY,
        }
    }

    addItem = () => {
        const { store } = this.props;
        const { todo, priority } = this.state;
        if( ! todo) {
            return;
        }
        this.setState({isBusy: true});
        let todoItems = store.get(TODO_ITEMS_KEY);
        if( ! Array.isArray(todoItems)) {
            todoItems = [];
        }
        todoItems = [
            generateTodoItem(todo, priority),
            ...todoItems
        ];
        store.set(TODO_ITEMS_KEY, todoItems);
        this.setState({isBusy: false, todo: "", priority: DEFAULT_PRIORITY});
    }

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handleClickListItem = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleMenuItemClick = (event, index) => {
        this.setState({priority: index, anchorEl: null});
    };

    render() {
        const { classes } = this.props;
        const { anchorEl, priority, isBusy, todo } = this.state;
        return (
            <Toolbar>
                <Grid container spacing={16} alignItems="center">
                    <Grid item className="my-other-step">
                        <List component="nav">
                            <ListItem
                                button
                                aria-haspopup="true"
                                aria-controls="lock-menu"
                                aria-label="Select your TODO priority"
                                onClick={this.handleClickListItem}
                            >
                                <ListItemText
                                    primary="TODO Priority"
                                    secondary={options[priority]}
                                />
                            </ListItem>
                        </List>
                        <Menu
                            id="lock-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            {options.map((option, index) => (
                                <MenuItem
                                    key={option}
                                    disabled={index === priority}
                                    selected={index === priority}
                                    onClick={event => this.handleMenuItemClick(event, index)}
                                >
                                    {option}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Grid>

                    <Grid item xs>
                        <TextField
                            fullWidth
                            placeholder="Type your TODO in here"
                            InputProps={{
                                disableUnderline: true,
                                className: classes.addInput,
                            }}
                            style={{
                                padding: '12px 0 7px'
                            }}
                            disabled={isBusy}
                            value={todo}
                            onChange={(event) => {
                                this.setState({todo: event.target.value});
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Tooltip title="Add Todo">
                            <IconButton onClick={this.addItem} disabled={isBusy}>
                                <AddIcon className={classes.block} color="inherit"/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Toolbar>
        )
    }
}

AddItem.propTypes = {
    store: PropTypes.object.isRequired
};

export default withStyles(styles)(AddItem);
