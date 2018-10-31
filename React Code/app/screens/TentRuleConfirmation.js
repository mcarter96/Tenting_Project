import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import { CheckBox } from 'react-native-elements';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'

class TentRuleConfirmation extends Component {
    onPressConfirm = () => {
        if(this.state.checked){
            this.props.navigation.navigate('InitialTentDetails');
        }
        
    }
   state = {
    checked: false,
   };
  render() {
    return (
      <Grid>
        <Row size={10}>
            <View style = {styles.container}>
                <CheckBox
                    title='All team members registered?'
                    checked={this.state.checked}
                    onPress={() => this.setState({ checked: !this.state.checked })}
                />
            </View>
        </Row>
        <Row size={10}>
            <View style = {styles.container}>
                <CheckBox
                    title='You can only register 6 members total.'
                    checked={this.state.checked}
                    onPress={() => this.setState({ checked: !this.state.checked })}
                />
            </View>
        </Row>
        <Row size={10}>
            <View style = {styles.container}>
                <CheckBox
                    title='Terms and Conditions.'
                    checked={this.state.checked}
                    onPress={() => this.setState({ checked: !this.state.checked })}
                />
            </View>
        </Row>
        <Row size={10}>
            <View style = {styles.container}>
                <CheckBox
                    title='Waiver'
                    checked={this.state.checked}
                    onPress={() => this.setState({ checked: !this.state.checked })}
                />
            </View>
        </Row>
        <Row size={40}></Row>
        <Row size={20}>
          <Col size={20}></Col>
          <Col size={60}>
            <View style = {styles.containerOne}>
            <TouchableOpacity onPress={this.onPressConfirm}>
                <Text style = {styles.text}>
                  Confirm
                </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={20}></Col>
        </Row>
        
      </Grid>
      
    );
  }
}

export default TentRuleConfirmation;

const styles = StyleSheet.create ({
    container: {
       //alignItems: 'center',
       width: '100%'
    },
    containerOne:{
        alignItems: 'center',
        width: '100%'
    },
    text: {
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft:30,
        paddingRight:30,
        borderColor: 'black',
        fontSize: 20
    },
    textJoin: {
      borderWidth: 1,
      paddingLeft: 40,
      paddingRight: 40,
      paddingTop: 25,
      paddingBottom: 25,
      borderColor: 'black',
      fontSize: 30
   },
  })