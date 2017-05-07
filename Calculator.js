/**
 * This file contains the main components and logic for the calculator.
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
    ['CE']
];

// This is method that is called by the main method.
 export default class Calculator extends Component{
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

     // This method renders the input buttons
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

     // This method handles the input from the user
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
     // This method handles all the numerical input.
     _handleNumberInput(num){
         let inputValue;
         if (this.state.numFloat>0){
             // This handles input if the number is a decimal.
             inputValue = this.state.inputValue + num/(10**this.state.numFloat);
             this.setState({
                 numFloat: this.state.numFloat + 1
             });
         }else{
             // This handles input if the number is a whole number.
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
                // This handles all operations.
                let newValue;
                if (this.state.selectedSymbol ===null){
                    // This handles the first operation between 2 numbers
                    newValue = this.state.inputValue;
                }else{
                    // This handles all operations after 1 operation
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
                // Calculating the value.
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
                // Clearing all numbers and operations
                this.setState({
                    numFloat: 0,
                    previousInputValue: 0,
                    inputValue: 0,
                    selectedSymbol: null
                });
                break;
            case ".":
                // Add a decimal.
                if (this.state.numFloat === 0){
                    this.setState({
                        numFloat: this.state.numFloat + 1
                    });
                }
                break;
         }
     }
 }
