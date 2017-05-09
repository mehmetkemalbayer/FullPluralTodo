import React from 'react';
import { StyleSheet, TouchableHighlight, Text, View, ListView } from 'react-native';
import TaskRow from './TaskRow/Component';
const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        backgroundColor: '#F7F7F7',
        flex: 1,
        justifyContent: 'flex-start',
    },
    button: {
        height: 60,
        borderColor: '#05A5D1',
        borderWidth: 2,
        backgroundColor: '#333',

        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FAFAFA',
        fontSize: 20,
        fontWeight: '600',
    }
});

class TaskList extends React.Component {
    constructor(props, context){
        super(props, context);

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })

        this.state = {
            dataSource: ds.cloneWithRows(props.todos)
        };
    }

    componentWillReceiveProps(nextProps) {
        const dataSource = this.state.dataSource.cloneWithRows(nextProps.todos);
        this.setState({dataSource});
    }

    renderRow(todo) {
        return (
            <TaskRow 
                onDone={this.props.onDone}
                todo={todo} />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <ListView 
                    key={this.props.todos}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    />
                <TouchableHighlight 
                    onPress={this.props.onAddStarted}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Add</Text>
                    </TouchableHighlight>
            </View>
        )
    }
}
TaskList.propTypes = {
    onAddStarted: React.PropTypes.func.isRequired,
    onDone: React.PropTypes.func.isRequired,
    todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};
export default TaskList;