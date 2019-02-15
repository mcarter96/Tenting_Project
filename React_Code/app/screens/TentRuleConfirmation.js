import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import { CheckBox } from 'react-native-elements';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import styles from '../screens/style.js'

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
            <View style = {styles.textBox}>
                <CheckBox
                    title='All team members registered?'
                    checked={this.state.checked}
                    onPress={() => this.setState({ checked: !this.state.checked })}
                />
            </View>
        </Row>
        <Row size={10}>
            <View style = {styles.textBox}>
                <CheckBox
                    title='You can only register 6 members total.'
                    checked={this.state.checked}
                    onPress={() => this.setState({ checked: !this.state.checked })}
                />
            </View>
        </Row>
        <Row size={10}>
            <View style = {styles.textBox}>
                <CheckBox
                    title='Terms and Conditions.'
                    checked={this.state.checked}
                    onPress={() => this.setState({ checked: !this.state.checked })}
                />
            </View>
        </Row>
        <Row size={10}>
            <View style = {styles.textBox}>
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
            <View style = {styles.textBox}>
            <TouchableOpacity onPress={this.onPressConfirm}>
                <Text style = {styles.description}>
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

// description5, textJoinLeave, textBox

export default TentRuleConfirmation;

