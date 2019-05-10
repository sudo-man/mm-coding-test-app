import React, {Component} from 'react';
import List from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {priorityColors} from '../contracts/priority';
import TimeAgo from 'react-timeago';

const styles = theme => ({});

class Items extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: []
        }
    }

    handleToggle = (index) => {
        this.props.selectItem(index);
    }

    renderItem = (item, index) => {
        const {deleteItem, doneItem} = this.props;
        return (
            <ListItem key={item.createdAt} role={undefined} dense button onClick={this.handleToggle(index)}
                      style={{
                          borderLeft: `4px solid ${priorityColors[item.priority]}`
                      }}>
                <Checkbox
                    checked={item.active}
                    tabIndex={-1}
                    // disableRipple
                />
                <ListItemText primary={item.title} secondary={React.createElement(TimeAgo, {date: item.createdAt})}/>
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete" onClick={() => {
                        deleteItem(index);
                    }}>
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton aria-label="Done" onClick={() => {
                        doneItem(index);
                    }}>
                        <DoneIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }

    render() {
        const {classes, data} = this.props;

        if (!data.length) {
            return (
                <Typography color="textSecondary" align="center"
                            style={{padding: '10px 10px 40px'}}>
                    No TODO items for today! <br/> Type your TODO above and click on the add button
                    to get started.
                </Typography>
            )
        }

        return (
            <List style={{
                maxHeight: 300,
                overflowY: 'scroll'
            }}>
                {data.map((item, index) => this.renderItem(item, index))}
            </List>
        )
    }
}

Items.propTypes = {
    data: PropTypes.array.isRequired,
    deleteItem: PropTypes.func,
    doneItem: PropTypes.func,
};

Items.defaultProps = {
    data: [],
    deleteItem: () => {},
    doneItem: () => {},
    selectItem: () => {},
}

export default withStyles(styles)(Items);
