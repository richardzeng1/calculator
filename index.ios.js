/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import Style from './Style';
import InputButton from './InputButton';
import {
    AppRegistry,
    View,
    Text
} from 'react-native';

// Define the constants for the buttons for the calculator
const inputButtons = [
    [1, 2, 3, '/'],
    [4, 5, 6, '*'],
    [7, 8, 9, '-'],
    [0, '.', '=', '+'],
    ['CE', 'C']
];

 class calculator extends Component{
     constructor(props){
         super(props);

         this.state = {
             inputValue:0,
             previousInputValue: 0,
             selectedSymbol: null,
             numFloat: 0
         }
     }
     render(){
         return(
             <View style={Style.rootContainer}>
                <View style={Style.displayContainer}>
                    <Text style = {Style.displayText}>
                        {this.state.inputValue}
                    </Text>
                </View>
                <View style={Style.inputContainer}>
                    {this._renderInputButtons()}
                </View>
            </View>
         );
     }

     _renderInputButtons(){
         // Create a row view for each row and create an InputButton for
         // each row.

         let views = [];

         for (var r = 0; r<inputButtons.length; r++){
             let row = inputButtons[r];

             let inputRow = [];
             for (var i = 0; i<row.length; i++){
                 let input = row[i];

                 inputRow.push(
                     <InputButton value={input}
                     highlight={this.state.selectedSymbol == input}
                     onPress={this._onInputButtonPressed.bind(this, input)}
                     key={r + "-" + i}/>
                 );
             }

             views.push(
                 <View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>
             );
         }
         return views;
     }

     _onInputButtonPressed(input){
         switch(typeof input){
             case 'number':
                return this._handleNumberInput(input);
                break;
             case 'string':
                return this._handleStringInput(input);
                break;
         }
     }

     _handleNumberInput(num){
         let inputValue;
         if (this.state.numFloat>0){
             inputValue = this.state.inputValue + num/(10**this.state.numFloat);
             this.setState({
                 numFloat: this.state.numFloat + 1
             });
         }else{
             inputValue = (this.state.inputValue * 10) + num;
         }

         this.setState({
             inputValue: inputValue
         });
     }

     _handleStringInput(str){
         switch(str){
             case "*":
             case "/":
             case "+":
             case "-":
                let newValue;
                if (this.state.selectedSymbol ===null){
                    newValue = this.state.inputValue;
                }else{
                    newValue = eval(this.state.previousInputValue +
                        this.state.selectedSymbol + this.state.inputValue);
                }

                this.setState({
                    selectedSymbol: str,
                    previousInputValue: newValue,
                    inputValue: 0
                });
                break;
            case "=":
                let symbol = this.state.selectedSymbol;
                let inputValue = this.state.inputValue;
                let previousInputValue = this.state.previousInputValue;

                if (!symbol){
                    return;
                }

                if ((symbol==='/')&&(inputValue===0)){
                    newInputValue = "Division by 0 error"
                }else{
                    newInputValue = eval(previousInputValue + symbol +
                        inputValue)
                }
                this.setState({
                    previousInputValue:0,
                    inputValue: newInputValue,
                    selectedSymbol: null
                });
                break;
            case "CE":
                this.setState({
                    numFloat: 0,
                    previousInputValue: 0,
                    inputValue: 0,
                    selectedSymbol: null
                });
                break;
            case "C":
                this.setState({
                    inputValue: 0,
                    numFloat: 0
                });
                break;
            case ".":
                if (this.state.numFloat === 0){
                    this.setState({
                        numFloat: this.state.numFloat + 1
                    });
                }
                break;
         }
     }

 }

AppRegistry.registerComponent('calculator', () => calculator);
