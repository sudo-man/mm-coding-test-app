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
import {options, DEFAULT_VIEW} from '../contracts/view';

const styles = theme => ({
    block: {
        display: 'block',
    }
});

class AddItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            selectedIndex: DEFAULT_VIEW,
        }
    }

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handleClickListItem = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleMenuItemClick = (event, index) => {
        this.setState({selectedIndex: index, anchorEl: null});
    };

    render() {
        const { classes } = this.props;
        const { anchorEl, selectedIndex } = this.state;
        return (
            <Toolbar>
                <Grid container spacing={16} alignItems="center" style={{
                    padding: '0px 20px'
                }}>
                    <Grid item xs>
                        {/*<Tooltip title="Add Todo">*/}
                            {/*<IconButton>*/}
                                {/*<AddIcon className={classes.block} color="inherit"/>*/}
                            {/*</IconButton>*/}
                        {/*</Tooltip>*/}
                    </Grid>
                    <Grid item xs className="my-other-step">
                        <List component="nav" >
                            <ListItem
                                button
                                aria-haspopup="true"
                                aria-controls="lock-menu"
                                aria-label="Select your TODO priority"
                                onClick={this.handleClickListItem}
                            >
                                <ListItemText
                                    primary="View By"
                                    secondary={options[selectedIndex]}
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
                                    //disabled={index === 0}
                                    selected={index === selectedIndex}
                                    onClick={event => this.handleMenuItemClick(event, index)}
                                >
                                    {option}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Grid>
                </Grid>
            </Toolbar>
        )
    }
}

export default withStyles(styles)(AddItem);
