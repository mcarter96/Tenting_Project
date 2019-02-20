import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet, 
  TouchableOpacity, 
  Picker,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class adminGameManage extends Component {
  state = {
    games: [{gameName: "BYU", gameId: 1}, {gameName: "GU", gameId:2}],
    currentLabel: "Select Game.",
    gameid: '',
  }
  pickerChange(index){
    this.state.games.map( (v,i)=>{
     if( index === i ){
       this.setState({
       currentLabel: this.state.games[index].gameName,
       gameid: this.state.games[index].gameId
      })
     }
    })
   }
  onPressCreateGame = () => {
    this.props.navigation.navigate('createGame', {token: this.props.navigation.getParam('token')})
  }
  onPressAssignTents = () => {
    console.log(this.state.gameid);
    this.props.navigation.navigate('tentAssignment', {gameid: this.state.gameid});
  }
  async componentDidMount(){
    var result = await fetch("http://tenting-rewards.gonzaga.edu/api/games/", {
    method: 'GET',
    headers: {
      Authorization: 'Token '+this.props.navigation.getParam('token'),
    },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
    gameArray= []
    for(var i = 0; i < result.length; i++){
      gameArray.push({gameName: result[i].game_name, gameId: result[i].id});
    }
    this.setState({games: gameArray});
    this.setState({gameid: result[0].id});
  }
  static navigationOptions = {
    headerStyle: { backgroundColor: '#9aadce' },
    headerTitleStyle: { color: 'white' },
  }
  render() {
    return (
      <Grid style={{backgroundColor: "#639aff"}}>
        <Row size={10}></Row>
        <Row size={20}>
          <Col size={20}></Col>
          <Col size={60}>
            <View style = {styles.container}>
            <TouchableOpacity onPress={this.onPressCreateGame}>
                <Text style = {styles.text}>
                  Create Game
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
            <TouchableOpacity onPress={this.onPressAssignTents}>
              <Text style = {styles.text}>
                Assign Tents
              </Text>
            </TouchableOpacity>
            </View>
          </Col>
          <Col size={20}></Col>
        </Row>
        <Row size={40}>
          <Col size={36}>
            <Row size={35}></Row>
            <Row size={65}><Text style={{fontSize: 20, padding: 10, color:'white'}}>Current Game:</Text></Row>
          </Col>
          <Col size={20}>
            <Picker
              itemStyle={{color:'white'}}
              style={{width: 100, color:'white'}} 
              selectedValue={this.state.gameid}
              onValueChange={(itemValue, itemIndex) => this.pickerChange(itemIndex)}>{
              this.state.games.map( (v)=>{
              return <Picker.Item label={v.gameName} value={v.gameId}/>
              })
              }
            </Picker>
          </Col>
          <Col size={34}></Col>
        </Row>
        <Row size={10}></Row>
      </Grid>
      
    );
  }
}

export default adminGameManage;

const styles = StyleSheet.create ({
  container: {
     alignItems: 'center',
     width: '100%'
  },
  text: {
    color: 'white',
    backgroundColor: '#9aadce',
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 0,
    padding:25,
    borderColor: 'black',
    fontSize: 30
    /*
     borderWidth: 1,
     padding: 25,
     borderColor: 'black',
     fontSize: 30*/
  },
  textJoin: {
    color: 'white',
    backgroundColor: '#9aadce',
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 0,
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft:40,
    paddingRight: 40,
    borderColor: 'black',
    fontSize: 20
    /*
    borderWidth: 1,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 25,
    paddingBottom: 25,
    borderColor: 'black',
    fontSize: 30*/
 },
})
