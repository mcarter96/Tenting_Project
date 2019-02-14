import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput, 
  TouchableOpacity
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class adminMenu extends Component {
  state = {
    token: '',
  }
  onPressTentReg = () => {
    this.props.navigation.navigate('adminGameManage',{token: this.state.token});
  }

  onPressTentChecks = () => {
    this.props.navigation.navigate('adminTentChecks', {adminToken: this.state.token});
  }

  onPressManageUsers = () => {
    this.props.navigation.navigate('adminManageUsers');
  }

  onPressUpdateFeed = () => {
    this.props.navigation.navigate('adminFeed');
  }
  componentDidMount(){
    const { navigation } = this.props;
    const adminToken = navigation.getParam('token', 'No ID');
    this.setState({token: adminToken});
};

  render() {
    return (
      <Grid>
        <Row size={10}></Row>
        <Row size={20}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.onPressTentReg}>
                <Text style = {styles.text}>
                  Game Management
                </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>

        <Row size={10}></Row>
        <Row size={20}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.onPressTentChecks}>
              <Text style = {styles.text2}>
                Tent Checks
              </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>

        <Row size={10}></Row>
        <Row size={20}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.onPressManageUsers}>
                <Text style = {styles.text3}>
                  Manage Users
                </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>
        
        <Row size={10}></Row>
        <Row size={20}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.onPressUpdateFeed}>
                <Text style = {styles.text2}>
                  Update Feed
                </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>
      </Grid>
    );
  }
}
export default adminMenu;

const styles = StyleSheet.create({
  input: {
     textAlign: 'center',
     height: 40,
     borderColor: 'black',
     borderWidth: 1,
     width: '100%'
  },
  container: {
    alignItems: 'center',
    width: '100%'
 },
 text: {
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft:50,
    paddingRight:50,
    borderColor: 'black',
    fontSize: 20
 },
 text2: {
  borderWidth: 1,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft:80,
  paddingRight:80,
  borderColor: 'black',
  fontSize: 20
},
text3: {
  borderWidth: 1,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft:70,
  paddingRight:70,
  borderColor: 'black',
  fontSize: 20
},
})