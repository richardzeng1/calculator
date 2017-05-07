/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text
} from 'react-native';
import Calculator from './Calculator';

class main extends Component{
    render(){
        return(
            <Calculator/>
        )
    }
}

AppRegistry.registerComponent('calculator', () => main);
