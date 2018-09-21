import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class Checkbox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            checked: false
        }
    }
    
    _onPress = () => {
        this.setState({
            checked: !this.state.checked
        }, () => {
            this.props.change(
                this.props.id
            )
        })
    }

    render(){
        return (
            <TouchableOpacity onPress={this._onPress} style={this.state.checked ? [styles.checkbox, styles.checked] : styles.checkbox }>
                <Text>{this.props.name}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    checkbox: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 5,
      borderRadius: 4,
      margin: 2
    },
    checked: {
        borderColor: 'red',
    }
  });