import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import { ScrollView } from 'react-native';
import { Tile, List, ListItem, Button } from 'react-native-elements';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { me } from '../config/data';

class TentRegInitial extends Component {
  state = {
    tentData: '',
    email: '',
  }
  onPressCreateTent = () => {
    if(this.state.tentData != null){
      this.props.navigation.navigate('QRCode');
    }else{
      this.props.navigation.navigate('TentingStack', {tentId: this.state.tentData, userEmail: this.state.email});
    }
    
  }
  componentDidMount(){
    const { navigation } = this.props;
    const tentId = navigation.getParam('tentId', 'No Name');
    const userEmail = navigation.getParam('userEmail', 'No email');
    this.setState({tentData: tentId});
    this.setState({email: userEmail});
  }
  render() {
    return (
      <Grid>
        <Row size={10}></Row>
        <Row size={20}>
          <Col size={20}></Col>
          <Col size={60}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.onPressCreateTent}>
                <Text style = {styles.text}>
                  Create Tent
                </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={20}></Col>
        </Row>
        <Row size={20}>
          <Col size={20}></Col>
          <Col size={60}>
            <View style = {styles.container}>
            <TouchableOpacity>
              <Text style = {styles.textJoin}>
                Join Tent
              </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={20}></Col>
        </Row>
        <Row size={40}>
          <Col size={10}></Col>
          <Col size={80}>
            <View style = {styles.container}>
              <Text style={{fontSize: 50}}>Countdown</Text>
            </View>
          </Col>
          <Col size={10}></Col>
        </Row>
        <Row size={10}></Row>
      </Grid>
    );
  }
}

//Me.defaultProps = { ...me };

export default TentRegInitial;

const styles = StyleSheet.create ({
  container: {
     alignItems: 'center',
     width: '100%'
  },
  text: {
     borderWidth: 1,
     padding: 25,
     borderColor: 'black',
     fontSize: 30
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
