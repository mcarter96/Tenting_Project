import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput, 
  TouchableOpacity,
  Image
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
    this.props.navigation.navigate('adminManageUsers', {adminToken: this.state.token});
  }

  onPressFilterTents = () => {
    this.props.navigation.navigate('adminTentFilter', {token: this.state.token});
  }
  logout = () => {
    console.log(this.state.data);
    this.props.navigation.navigate('Login');
  }
  componentDidMount(){
    const { navigation } = this.props;
    const adminToken = navigation.getParam('token', 'No ID');
    this.setState({token: adminToken});
};
static navigationOptions = {
  headerStyle: { backgroundColor: '#C1C6C8' },
  headerTitleStyle: { color: '#C1C6C8' },
  }

  render() {
    return (
      <Grid style={{backgroundColor: "#C1C6C8"}}>
        <Row size={5}></Row>
        <Row size={20}>
          <Col size={24}></Col>
            <Col size={54}><Image source={require('../images/logo.png')} /></Col>
          <Col size={22}></Col>
        </Row>
        <Row size={10}></Row>
        <Row size={15}>
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

        <Row size={1}></Row>
        <Row size={15}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.onPressTentChecks}>
              <Text style = {styles.text5}>
                Tent Checks
              </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>        
        <Row size={1}></Row>
        <Row size={15}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.onPressFilterTents}>
                <Text style = {styles.text2}>
                  Filter Tents
                </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={1}></Row>
        <Row size={15}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.onPressManageUsers}>
                <Text style = {styles.text3}>
                  Clear Data
                </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={1}></Row>
        <Row size={15}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.logout}>
                <Text style = {styles.text4}>
                  Logout
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
    color: 'white',
    backgroundColor: '#639aff',
    borderRadius: 10,
    textAlign: 'center',
    height: 40,
    borderColor: 'white',
    borderWidth: 0.5,
    width: '100%'
 },
  container: {
    alignItems: 'center',
    width: '100%'
 },
 text: {
  color: 'white',
  backgroundColor: '#041E42',
  overflow: 'hidden',
  borderRadius: 10,
  borderWidth: 0,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft:50,
  paddingRight: 50,
  borderColor: 'black',
  fontSize: 20
 },
 text4: {
  color: 'white',
  backgroundColor: '#041E42',
  overflow: 'hidden',
  borderRadius: 10,
  borderWidth: 0,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft:105,
  paddingRight: 105,
  borderColor: 'black',
  fontSize: 20
 },
 text2: {
  color: 'white',
  backgroundColor: '#041E42',
  overflow: 'hidden',
  borderRadius: 10,
  borderWidth: 0,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft:90,
  paddingRight: 90,
  borderColor: 'black',
  fontSize: 20
   
},
text5: {
  color: 'white',
  backgroundColor: '#041E42',
  overflow: 'hidden',
  borderRadius: 10,
  borderWidth: 0,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft:85,
  paddingRight: 85,
  borderColor: 'black',
  fontSize: 20
   
},
text3: {
  color: 'white',
  backgroundColor: '#041E42',
  overflow: 'hidden',
  borderRadius: 10,
  borderWidth: 0,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft:90,
  paddingRight: 90,
  borderColor: 'black',
  fontSize: 20

},
})