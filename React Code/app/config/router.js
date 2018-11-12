import React from 'react';
import { createBottomTabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign"
import {createStackNavigator} from 'react-navigation';

import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Feed from '../screens/Feed';
import TentRegInitial from '../screens/TentRegInitial';
import TentRuleConfirmation from '../screens/TentRuleConfirmation';
import InitialTentDetails from '../screens/InitialTentDetails'
import addMembers from '../screens/addMembers'
import QRScreen from '../screens/QRScreen'
import Login from '../screens/LoginScreen'
import SearchForTent from '../screens/SearchForTent'
import adminFeed from '../screens/adminFeed'
import adminManageUsers from '../screens/adminManageUsers'
import adminMenu from '../screens/adminMenu'
import adminTentChecks from '../screens/adminTentCheck'
import adminTentReg from '../screens/adminTentReg'

export const AdminStack = StackNavigator({
  adminTentReg: {
    screen: adminTentReg,
    navigationOptions: {
      title: 'Tent Registration'
    },
  },
  adminTentChecks: {
    screen: adminTentChecks,
    navigationOptions: {
      title: 'Tent Checks'
    },
  },
  adminFeed: {
    screen: adminFeed,
    navigationOptions: {
      title: 'Admin Feed'
    },
  },
  adminManageUsers: {
    screen: adminManageUsers, 
    navigationOptions: {
      title: 'Manage Users'
    },
  },
});

export const CreateTentStack = StackNavigator({
  TentRegInitial: {
    screen: TentRegInitial,
    navigationOptions: {
      title: 'Tent Registration',
    },
  },
  TentRuleConfirmation: {
    screen: TentRuleConfirmation,
    navigationOptions: {
      title: 'Tent Rule Confirmation',
    },
  },
  InitialTentDetails: {
    screen: InitialTentDetails,
    navigationOptions: {
      title: 'Setup Tent',
    },
  },
  addMembers: {
    screen: addMembers,
    navigationOptions: {
      title: 'Add Members',
    },
  },
  SearchForTent: {
    screen: SearchForTent, 
    navigationOptions: {
      title: 'Search for Tents',
    },
  },
});

export const Tabs = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => <Icon name="home" size={35} color={tintColor} />,
    },
  },
  TentRegInitial: {
    screen: CreateTentStack,
    navigationOptions: {
      tabBarLabel: 'Tent',
      tabBarIcon: ({ tintColor }) => <MaterialIcon name="tent" size={35} color={tintColor} />
    },
  },
  Feed: {
    screen: Feed,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => <Entypo name="news" size={35} color={tintColor} />
    },
  },
  QRCode: {
    screen: QRScreen,
    navigationOptions: {
      tabBarLabel: 'QR',
      tabBarIcon: ({ tintColor }) => <AntDesign name="qrcode" size={35} color={tintColor} />
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => <Icon name="settings" size={35} color={tintColor} />
    },
  },
  
});

export const Buttons = createStackNavigator ({
  adminMenu: {screen: adminMenu},
  adminFeed: {screen: adminFeed},
  adminManageUsers: {screen: adminManageUsers},
  adminTentChecks: {screen: adminTentChecks},
  adminTentReg: {screen: adminTentReg},
});

export const LoginStack = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: '',
    },
  },
});

export const Root = StackNavigator({
  Login: {
    screen: LoginStack,
  },
  Tabs: {
    screen: Tabs,
  },
  Buttons: {
    screen: Buttons,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
