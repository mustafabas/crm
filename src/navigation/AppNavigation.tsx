import React from "react";
import {
  
  createAppContainer,
  createSwitchNavigator,

} from "react-navigation";

import {createStackNavigator} from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Dimensions, TouchableOpacity, View } from "react-native";
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'
const { width } = Dimensions.get("window");
// import { createIconSetFromIcoMoon } from 'react-native-vector-icons'

// import Icon from "react-native-vector-icons/Ionicons";

// import Home from "../screens/AppScreens/Home";
// import Blank from "../screens/AppScreens/Blank";
// import SideBar from "../screens/AppScreens/SideBar";
import Login from "../screens/AuthScreens/Login";
import SignUpFirstScreen from '../screens/AuthScreens/SignUp/SignUpFirstScreen'
import SignUpSecondScreen from '../screens/AuthScreens/SignUp/SignUpSecondScreen'
import PhoneVerificationScreen from "../screens/AuthScreens/SignUp/PhoneVerificationScreen";
import HomeScreen from '../screens/AppScreens/Home/HomeScreen'
import { Icon, Image, Text } from "native-base";
import CustomerOrdersScreen from '../screens/AppScreens/Customer/CustomerOrdersScreen'
import AuthLoading from "../screens/AuthLoading";
import svgs from '../images/icomoon/SVG/svgs'
import SvgIcon from 'react-native-svg-icon';
import employee from '../screens/AppScreens/Employee/home';
import employeeAdd from '../screens/AppScreens/Employee/employeeAdd';

// import Customer from "../pages/customer";
// import Employee from "../pages/employee";
// import Settings from "../pages/settings";
// import addCustomer from "../pages/addCustomer";
// import OrdersCustomer from "../pages/OrdersCustomer";
// import addOrder from "../pages/addOrder";
// import editCustomer from "../pages/editCustomer";
// import addProduct from "../pages/addProduct";
// import products from "../pages/products";
// import editProduct from "../pages/editProduct";
// import newPricePage from "../pages/newPricePage";
// import customerDefinedPricePage from "../pages/CustomerDefinedPrice"
// import editOrder from "../pages/editOrder";
// import employee from "../pages/employee";
// import addEmployee from "../pages/addEmployee";
// import editEmployee from "../pages/editEmployee";
// import report from "../pages/report";
// import employeeCost from "../pages/employeeCost";
// import editEmployeeCost from "../pages/editEmployeeCost";

 const EmployeeApp = createStackNavigator(
   {
     Employee: { screen: employee },
    AddEmployee: { screen: employeeAdd },
//     EditEmployee: { screen: editEmployee },
//     EmployeeCost: { screen: employeeCost },
//     EditEmployeeCost: { screen: editEmployeeCost },

  },
  {
//     // headerMode:"none"
  });
// const IconNew = createIconSetFromIcoMoon(icoMoonConfig)
const CustomerStack = createStackNavigator(
  {
    // Customer: { screen: Customer },
    // CustomerAdd: { screen: addCustomer },
    // OrdersCustomer: { screen: OrdersCustomer },
    // AddOrder: { screen: addOrder },
    // EditCustomer: { screen: editCustomer },
    // NewPricePage: { screen: newPricePage },
    // CustomerDefinedPricePage: { screen: customerDefinedPricePage },
    // EditOrder: { screen: editOrder }
    CustomerOrders : CustomerOrdersScreen
  },
  {
    // headerMode: "none"
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#216AF4',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '600',
        fontFamily:'Avenir Next',
        fontSize:18
      },
    },
  }

);

// const SettingsApp = createStackNavigator(
//   {
//     Settings: { screen: Settings },
//     AddProduct: { screen: addProduct },
//     EditProduct: { screen: editProduct },
//     Products: { screen: products },
//     Report: { screen: report },

//   },
//   {
//     // headerMode: "none"
//   }
// )


const HomeStack = createStackNavigator({
  Home : HomeScreen,
  Customer : CustomerStack
},{
  headerMode:'none'
})


// const Icon = createIconSetFromIcoMoon(require('../images/file1.svg'))
const IconNew = (props) => <SvgIcon {...props} style={{marginTop:55,marginLeft:55}} svgs={svgs} />

const MainStack = createBottomTabNavigator(
  {
    Customer: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Müşteriler',
        tabBarIcon: ({ focused }) => {

          return (
            <IconNew stroke={focused ? '#2069F3' :'black' }  strokeWidth={3} fill={focused ? '#2069F3' :'black' } width="80" height="80" name="User" svgs={svgs} />
          )
        }
      }
    },
    Employee: {
      screen: EmployeeApp,

      navigationOptions: {
        // tabBarLabel: 'Çalışanlar',
        tabBarIcon: ({ focused }) => {

          return (
        
              
            <IconNew stroke={focused ? '#2069F3' :'black' } strokeWidth={3} fill={focused ? '#2069F3' :'black' } width="80" height="80" name="UserPlus" svgs={svgs} />
          
        
          )
        }
      },

    },
    Settings: {
      screen: HomeScreen,
      navigationOptions: {


tabBarIcon: ({ focused }) => {

  return (

      
    <IconNew fill={focused ? '#2069F3' :'black' } width="80" height="80" name="Report" svgs={svgs} />
  

  )
}

      }
    },
    Profile: {
      screen: HomeScreen,
      navigationOptions: {


tabBarIcon: ({ focused }) => {

  return (

      
    <IconNew stroke={focused ? '#2069F3' :'black' } strokeWidth={3} fill={focused ? '#2069F3' :'black' } width="80" height="80" name="Profile" svgs={svgs} />
          

  )
}

      }
    },

  },
  {
    initialRouteName: "Customer",

  }
);



const LoginScreen = createStackNavigator(
  {
    Login: { screen: Login },
    SignUpFirst :SignUpFirstScreen,
    SignUpSecond : SignUpSecondScreen,
    PhoneVerification:PhoneVerificationScreen,
    Home: HomeScreen
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);


export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      LoginScreen: LoginScreen,

      MainStack: MainStack,
      // AddCustomer: CustomerApp,
    },
    {
      initialRouteName: "AuthLoading" //createDrawernavigator içindeki bir sayfa buraya yazılamazmış!!!!
    }
  )
);
