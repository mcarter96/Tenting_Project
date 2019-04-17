import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet, 
  TouchableOpacity, 
  Picker,
  Image,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

class adminGameManage extends Component {
  state = {
    games: [],
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
  loadGameData = async() =>{
    var result = await fetch("https://tenting-rewards.gonzaga.edu/api/games/", {
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
    if(result.length > 0){
      console.log(result)
      for(var i = 0; i < result.length; i++){
        gameArray.push({gameName: result[i].game_name, gameId: result[i].id});
      }
      this.setState({games: gameArray});
      this.setState({gameid: result[0].id});
    }
  }
  componentWillMount(){
    this.props.navigation.addListener('willFocus', () => this.loadGameData());
  }
  async componentDidMount(){
    this.loadGameData();
  }
 
  static navigationOptions = {
    headerStyle: { backgroundColor: '#041E42' },
    headerTitleStyle: { color: '#041E42' },
    headerBackTitleStyle: {color: "#C1C6C8"},
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
        <Row size={15}>
          <Col size={5}></Col>
            <Col size={90}>
              <View style = {styles.container}>
                <Text style={{color:'#041E42', fontSize:30, fontWeight: 'bold',}}>GAME MANAGEMENT</Text>
              </View>
            </Col>
            <Col size={5}></Col>
        </Row>
        <Row size={15}>
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
        <Row size={5}></Row>
        <Row size={15}>
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
        <Row size={20}>
          <Col size={36}></Col>
          <Col size={25}>
            <Picker
              itemStyle={{color:'white'}}
              style={{width: 100, color:'white', paddingBottom:325}} 
              selectedValue={this.state.gameid}
              onValueChange={(itemValue, itemIndex) => this.pickerChange(itemIndex)}>{
              this.state.games.map( (v)=>{
              return <Picker.Item label={v.gameName} value={v.gameId}/>
              })
              }
            </Picker>
          </Col>
          <Col size={37}></Col>
        </Row>
        <Row size={5}></Row>
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
    backgroundColor: '#041E42',
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
