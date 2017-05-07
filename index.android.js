/**
 * A simple four function calculator used to learn the basics
 * of React Native
 * @Author: Richard Zeng
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text
} from 'react-native';
import Calculator from './Calculator';

// This is the main method for ios platform.
class main extends Component{
    render(){
        return(
            <Calculator/>
        )
    }
}

AppRegistry.registerComponent('calculator', () => main);
