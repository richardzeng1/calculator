/*
* This file contains the input buttons for the calculator.
*/

import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight
} from 'react-native';
import Style from './Style';

// The input button component.
export default class InputButton extends Component{
    render(){
        return(
            <TouchableHighlight
                style={[Style.inputButton, this.props.highlight ?
                    Style.inputButtonHighlighted: null]}
                underlayColor = "#193441"
                onPress={this.props.onPress}>
                <Text style = {Style.inputButtonText}>{this.props.value}</Text>
            </TouchableHighlight>
        )
    }
}
