import {  StyleSheet } from 'react-native';

// Tent Assignment - boldText, centerText
// addMembers - text2, fillText
const styles = StyleSheet.create({
  textBox: {
    alignItems: 'center',
    width: '100%',
  },
  centerText: {
    flex: 1, 
    fontSize: 18,
    pading: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: 'black'
  },
  textInput: {
    textAlign: 'center',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
  },
  description: {
    borderWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 60,
    paddingLeft: 60,
    borderColor: 'black',
    fontSize: 20,
  },
  description2: {
    borderWidth: 1,
    padding: 15,
    borderColor: 'black',
    fontSize: 20,
  },
  description3: {
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    paddingRight: 50,
    borderColor: 'black',
    fontSize: 20,
  },
  description4: {
    borderWidth: 1,
    padding: 25,
    borderColor: 'black',
    fontSize: 30,
  },
  description5: {
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 30,
    borderColor: 'black',
    fontSize: 20,
  },
  numberInput: {
    padding: 5,
    fontSize: 30,
  },
  keyboardTextBox: {
    height: '100%',
    left: 0,
    top: 0,
    position: 'absolute',
    width: '100%',
  },
  title: {
    textAlign: 'left',
    color: 'darkblue',
    fontWeight: 'bold',
    fontSize: 60,
    backgroundColor: 'white', 
  },
  camera: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%',
  },
  buttonText: {
    fontSize: 21,
    color: 'grey',
  },
  touchableButton: {
    padding: 16,
  },
  textJoinLeave: {
    borderWidth: 1,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 25,
    paddingBottom: 25,
    borderColor: 'black',
    fontSize: 30,
  },
  autoFillText: {
    padding: 0,
    fontSize: 14,
    color: 'black',
  },
  fillText: {
    padding: 5, 
    fontSize: 20,
    color: 'black'
  },
  autoCompleteTextBox: {
    marginLeft: 10,
    marginRight: 10,
  },
  menuText: {
    borderWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 70,
    paddingRight: 70,
    borderColor: 'black',
    fontSize: 20,
  },
  pickerText: {
    borderWidth: 1,
    padding: 10,
    borderColor: 'black',
    fontSize: 20,
  },
  pickerText2: {
    borderWidth: 1,
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 16, 
    paddingRight: 16, 
    borderColor: 'black',
    fontSize: 20
  },
  submitText: {
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 43,
    paddingRight: 43, 
    borderColor: 'black',
    fontSize: 20,
  },
  startingText: {
    padding: 5,
    fontSize: 20,
  },
})

  export default styles;