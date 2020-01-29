import React from "react";
import {
  
  createAppContainer,
  createSwitchNavigator,

} from "react-navigation";

import {createStackNavigator} from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Dimensions, TouchableOpacity, View, Platform } from "react-native";

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
import orderAdd from "../screens/AppScreens/Customer/orderAdd"
import svgs from '../images/icomoon/SVG/svgs'
import SvgIcon from 'react-native-svg-icon';
import employee from '../screens/AppScreens/Employee/home';
import employeeAddScreen from '../screens/AppScreens/Employee/employeeAddScreen';
import employeeEditScreen from '../screens/AppScreens/Employee/employeeEditScreen';
import SecurtiyScreen from '../screens/AppScreens/Profile/SecurityScreen'
import IntroductionScreen from '../screens/AppScreens/Introduction/index'
// import Customer from "../pages/customer";
// import Employee from "../pages/employee";
// import Settings from "../pages/settings";
import addCustomer from "../screens/AppScreens/Customer/addCustomer";
import productAdd from "../screens/AppScreens/Product/productAdd";
import ProfileScreen from "../screens/AppScreens/Profile/ProfileScreen";
import employeeCostScreen from "../screens/AppScreens/Employee/employeeCostScreen";
// import OrdersCustomer from "../pages/OrdersCustomer";
// import addOrder from "../pages/addOrder";
// import editCustomer from "../pages/editCustomer";
// import addProduct from "../pages/addProduct";
import products from "../screens/AppScreens/Product/produts";
import productEditScreen from "../screens/AppScreens/Product/productEdit";
import CustomerEditScreen from '../screens/AppScreens/Customer/CustomerEditScreen'
import AboutUsScreen from "../screens/AppScreens/Profile/AboutUsScreen";
import ProfileEditGeneralScreen from "../screens/AppScreens/Profile/ProfileEditGeneralScreen";
import CompanyEditScreen from "../screens/AppScreens/Profile/CompanyEditScreen";
import ReportScreen from "../screens/AppScreens/Report/ReportScreen";
import ReportTemplateScreen from '../screens/AppScreens/Report/ReportTemplateScreen'
import ReportNewScreen from '../screens/AppScreens/Report/ReportNewScreen'

import UserAgreementScreen from "../screens/AuthScreens/Login/UserAgreementScreen";
import HomeScreenAndroid from "../screens/AppScreens/Home/HomeScreenAndroid";
import SupportScreen from "../screens/AppScreens/Profile/SupportScreen";
import CustomerDefinedPriceAddScreen from '../screens/AppScreens/Customer/CustomerDefinedPriceAddScreen'
import CustomerDefinedPricesScreen from '../screens/AppScreens/Customer/CustomerDefinedPricesScreen'
import ReportBaseScreen from '../screens/AppScreens/Report/ReportBaseScreen'
// import newPricePage from "../pages/newPricePage";
// import customerDefinedPricePage from "../pages/CustomerDefinedPrice"
// import editOrder from "../pages/editOrder";
// import employee from "../pages/employee";
// import addEmployee from "../pages/addEmployee";
// import editEmployee from "../pages/editEmployee";
// import report from "../pages/report";
// import employeeCost from "../pages/employeeCost";
// import editEmployeeCost from "../pages/editEmployeeCost";


const introductionStack = createStackNavigator({
  Introduction :IntroductionScreen

},{
  headerMode:'none'
})
 const EmployeeApp = createStackNavigator(
   {
     Employee: { screen: employee },
    AddEmployee: { screen: employeeAddScreen },
    EditEmployee: { screen: employeeEditScreen },
    EmployeeCost: { screen: employeeCostScreen },
//     EditEmployeeCost: { screen: editEmployeeCost },

  },
  {
    initialRouteName:"Employee"
//     // headerMode:"none"
  });


  const reportStack = createStackNavigator(
    {
      ReportBase : ReportBaseScreen,
      ReportNew : ReportNewScreen,
      ReportTemplate : ReportTemplateScreen,
      ReportOld : ReportScreen
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
  )

  const ProfileStack = createStackNavigator(
    {
      ProfileScreen : ProfileScreen,
      products : products,
      productEditScreen : productEditScreen,
      AboutUs :AboutUsScreen,
      profileEditGeneral : ProfileEditGeneralScreen,
      Securtiy : SecurtiyScreen,
      AddProduct: { screen: productAdd },
      companyInfo : CompanyEditScreen ,
      Support : SupportScreen
     //AddEmployee: { screen: employeeAdd },
 //     EditEmployee: { screen: editEmployee },
 //     EmployeeCost: { screen: employeeCost },
 //     EditEmployeeCost: { screen: editEmployeeCost },
 
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
  Home : Platform.OS === 'ios' ? HomeScreen : HomeScreenAndroid,
  Customer : CustomerOrdersScreen,
  addCustomer : addCustomer,
  orderAdd : orderAdd,
  CustomerEdit : CustomerEditScreen,
  CustomerDefinedPriceAdd : CustomerDefinedPriceAddScreen,
  CustomerDefinedPrices : CustomerDefinedPricesScreen

},{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#2069F3',
      fontFamily : 'Avenir Next'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
})


const AgreementStack = createStackNavigator({
  UserAgreement : UserAgreementScreen,





},{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#2069F3',
      fontFamily : 'Avenir Next'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
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
        tabBarLabel: 'Çalışanlar',
        // tabBarLabel: 'Çalışanlar',
        tabBarIcon: ({ focused }) => {

          return (
        
              
            <IconNew stroke={focused ? '#2069F3' :'black' } strokeWidth={3} fill={focused ? '#2069F3' :'black' } width="80" height="80" name="UserPlus" svgs={svgs} />
          
        
          )
        }
      },

    },
    Settings: {
      screen: reportStack,
      navigationOptions: {
        tabBarLabel: 'Rapor',


tabBarIcon: ({ focused }) => {

  return (

      
    <IconNew fill={focused ? '#2069F3' :'black' } width="80" height="80" name="Report" svgs={svgs} />
  

  )
}

      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
      tabBarLabel: 'Profil',
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
    Home: HomeScreen,
    UserAgreement : UserAgreementScreen
  },
  {
    initialRouteName: "Login",
    // headerMode: "none"
  }
);



export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      LoginScreen: LoginScreen,
      introductionStack :introductionStack,
      MainStack: MainStack,

      // AddCustomer: CustomerApp,
    },
    {
      initialRouteName: "AuthLoading" //createDrawernavigator içindeki bir sayfa buraya yazılamazmış!!!!
    }
  )
);
