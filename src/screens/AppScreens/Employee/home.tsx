import React, { Component } from "react";
import {
  View,
  FlatList,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
  AsyncStorage,
  Image,
} from "react-native";
import { Icon, Input, Item, Tabs, Tab, TabHeading, Text, Button, ScrollableTab, ListItem, Left, Thumbnail, Body, Right, Form, Label, Content } from 'native-base';
import { NavigationScreenProp, NavigationState, ScrollView, } from "react-navigation";
import { connect } from "react-redux";
import { AppState } from "../../../redux/store";
import { IEmployeeItem } from "../../../redux/models/employeeModel";
import { employeeDelete } from "../../../redux/actions/deleteEmployeeAction";
import { GetEmployees } from "../../../redux/actions/employeeAction";
import { Formik } from "formik";
import * as Yup from "yup";
import { employeeCost } from "../../../redux/actions/employeeCostAction"
import { timingSafeEqual } from "crypto";
import { type } from "os";
import RBSheet from "react-native-raw-bottom-sheet";
import styles from "../../styles";
import { stat } from "fs";
import SvgIcon from 'react-native-svg-icon';
import svgs from '../../../images/icomoon/SVG/svgs';

const IconNew = (props) => <SvgIcon {...props}  svgs={svgs} />

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isLoading: boolean;
  employees: IEmployeeItem[];
  employeeDelete: (employeeId: number) => void;
  employeeDeleteIsSuccess: boolean;
  GetEmployees: () => void;
  employeeCost: (employeId: number, cost: number) => void;
  employeeAddCostLoading:boolean;
}

interface State {
  modalVisible: boolean;
  refreshing: boolean;
  nameSurname: string;
  employeeId: number;
  monthlySalary: number;
  active: boolean;
  UserType: string | null;
  modalAmountVisible: boolean;
}

interface amountData {
  amount: string
}

const initialValues: amountData = {
  amount: "",
}

const girdiler = Yup.object().shape({
  amount: Yup.number()
    .positive()
    .required(),
});

class Employee extends Component<Props, State> {
  OrderSheet: any;
  AmountSheet: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      refreshing: false,
      nameSurname: "",
      employeeId: 0,
      monthlySalary: 0,
      active: false,
      UserType: "",
      modalAmountVisible: false,
    };

    AsyncStorage.getItem("UserType").then((value) => {
      this.setState({
        UserType: value,
      })
      this.props.navigation.setParams({ Type: value });
    });
  }
  static navigationOptions = ({ navigation }: Props) => {
    if (navigation.getParam("Type") === "2") {
      return {
        title: 'Çalışanlar',
        headerStyle: {
          backgroundColor: '#216AF4',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    }
    else {
      return {

        title: 'Çalışanlar',
        headerRight: <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate("AddEmployee")}>
          <Icon style={{ color: '#ffff' }} name="ios-add-circle" />
        </TouchableOpacity>,
        headerStyle: {
          backgroundColor: '#216AF4',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    }
  };

  componentWillMount() {
    this.props.GetEmployees();
    this.setState({ refreshing: false });
    this.getUserType();
  }



  closeModal() {
    this.setState({ modalVisible: false });
  }

  openAmountModal() {
    this.setState({ modalAmountVisible: true });
  }

  closeAmountModal() {
    this.setState({ modalAmountVisible: false });
  }

  addCash() {
    this.OrderSheet.close();
    this.AmountSheet.open();

  }

  deleteSelectedEmployee() {

    const { employeeDelete } = this.props;
    employeeDelete(this.state.employeeId);
    this.OrderSheet.close();
    this.onRefresh();
    this.componentWillMount();
  }

  deleteEmployeeAlert() {
    //function to make three option alert
    Alert.alert(
      //title
      'Müşteri Silme İşlemi',
      //body
      'Müşteriyi silmek istiyor musunuz?',
      [
        { text: 'Geri Gel' },
        { text: 'Evet', onPress: () => this.deleteSelectedEmployee() },
      ],
      { cancelable: false }
    );

  }
  editEmployee() {
    this.closeModal();
    this.props.navigation.navigate("EditEmployee",
      {
        employeeId: this.state.employeeId,
        nameSurname: this.state.nameSurname,
        monthlySalary: this.state.monthlySalary,
        active: this.state.active,
      })

  }
  openModal(employeeId: number, nameSurname: string, monthlySalary: number, active: boolean) {
    this.setState({
      employeeId: employeeId,
      nameSurname: nameSurname,
      monthlySalary: monthlySalary,
      active: active,
    });
    this.OrderSheet.open();
  }
  giderEkle(values: amountData) {
    this.props.employeeCost(this.state.employeeId, Number(values.amount));  
    this.AmountSheet.close();
    this.onRefresh();

  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.componentWillMount();
  }

  getUserType() {
    //function to make three option alert
    AsyncStorage.getItem("UserType").then((value) => {
      this.setState({
        UserType: value,
      })
      this.props.navigation.setParams({ Type: value });
    });
  }

  _renderEmployeeSheetContent() {
    return (

      <View style={styles.SheetContainer}>
        <TouchableOpacity style={[styles.SheetItemContainer, { justifyContent: 'flex-end', padding: 5 }]}
          onPress={() => {
            this.OrderSheet.close();
          }}>
          <Icon name="ios-close" style={[{ fontSize: 40, marginRight: 10 }, styles.SheetItemIcon]}></Icon>

        </TouchableOpacity>
        <TouchableOpacity style={styles.SheetItemContainer}
          onPress={() => {
            this.OrderSheet.close();
            this.addCash();
          }}>
              <Icon name="ios-add"  style={styles.SheetItemIcon}></Icon>
          <Text style={styles.SheetItemText}
          >Ödeme Ekle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.SheetItemContainer}
          onPress={() => {
            this.OrderSheet.close();
            this.editEmployee();
          }}>
            <Icon type="FontAwesome" name="pencil"  style={[styles.SheetItemIcon,{ fontSize:22}]} ></Icon>
          <Text style={styles.SheetItemText}
          >Düzenle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.SheetItemContainer}
          onPress={() => {
            this.OrderSheet.close();
            this.deleteEmployeeAlert();
          }}>
            <Icon type="FontAwesome" name="trash-o" style={[styles.SheetItemIcon,{ fontSize:25}]}></Icon>
        
          <Text style={styles.SheetItemText}
          >Sil</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _renderEmployeeCostSheetContent() {
    return (<View style={styles.SheetAmountContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={girdiler}
        onSubmit={values => this.giderEkle(values)}
      >
        {props => {
          return (
            <View style={{ flexDirection: "column" }}>
              <TouchableOpacity style={[styles.SheetItemContainer, { justifyContent: 'flex-end', padding: 10 }]}
                onPress={() => {
                  this.AmountSheet.close();
                }}>
                <Icon name="ios-close" style={[{ fontSize: 40, marginRight: 10 }, styles.SheetItemIcon]}></Icon>
              </TouchableOpacity>
            
              <Content style={{padding:0, margin:0}} >
                <Form style={{flexDirection:'row', flex:1}}>
                  <Item floatingLabel style={{width:'60%', borderBottomColor: props.touched.amount && props.errors.amount!=null ? 'red':'#216AF4'}}>
                    <Label style={{ color:props.touched.amount && props.errors.amount!=null ? 'red':'#000'}}>Miktar</Label>
                    <Input       
                     onBlur={ (props.touched.amount && props.errors.amount) ? ()=> {
             props.setFieldValue('amount',"") 
             props.handleChange("amount")
            }             
              :  props.handleBlur("amount")}   
              onChangeText={props.handleChange("amount")} 
              />
                  </Item>
                  <Button onPress={()=>props.handleSubmit()} primary style={{width:'20%', marginLeft:'10%', marginTop:20,backgroundColor:'#01C3E3', borderRadius:5}}>
                    {this._renderEmployeeCostAddButtonText()}
            
                    </Button>
                </Form>
                </Content>

            </View>
          );
        }}
      </Formik>
    </View>);

  }
  _renderEmployeeCostAddButtonText(){
    if(this.props.employeeAddCostLoading){
      return (
        <ActivityIndicator></ActivityIndicator>
      );
    }
    return(
      <Text>Ekle</Text>
      );

  }
  _renderView() {
    const { isLoading, navigation } = this.props;
    if (isLoading) {
      return (<ActivityIndicator></ActivityIndicator>);
    }
    else {
      return (<View>
        <FlatList
          refreshing={this.state.refreshing}
          onRefresh={() => this.onRefresh()}
          data={this.props.employees}
          renderItem={({ item }) => (
            <ListItem >
              <Left style={{ flex: 0.2 }}>
                <View style={{ width: 33, height: 33, borderRadius: 16.5, backgroundColor: '#2069F3', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'white' }}>{item.employeeName.substring(0, 1)}</Text>
                </View>
              </Left>
              <Body style={{ borderBottomColor: '#fff' }}>
                <Text style={styles.employeeNameText}>{item.employeeName}</Text>
                <Text note>{item.createDate.slice(8, 10) + "/" + item.createDate.slice(5, 7) + "/" + item.createDate.slice(0, 4)}</Text>
              </Body>
              <Right style={{ borderBottomColor: '#fff' }}>
                <TouchableOpacity onPress={() => this.openModal(item.employeeId, item.employeeName, item.monthlySalary, item.active)}>
                  <Icon name="ios-more" style={{ color: '#2069F3', fontSize: 30 }}></Icon>
                </TouchableOpacity>
                <Text note style={{ fontFamily: 'Avenir Next' }}>Maaş</Text>
                <Text style={{ color: '#2069F3' }}>{item.monthlySalary} ₺</Text>
              </Right>
            </ListItem>
          )}
          keyExtractor={item => item.employeeId.toString()}
        />
      </View>);
    }
  }
  render() {
    if (this.state.UserType === "2") {
      return (<View style={styles.musteribulunamadiContainer}>
        <Text style={styles.musteribulunamadiText}>Bu Sayfaya Erişim İzniniz Yok</Text>
      </View>);
    }
    else {
      return (
        <View style={styles.containerNew}>
          <StatusBar backgroundColor="#2B6EDC" />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TouchableOpacity style={styles.employeeCostContainer}
              onPress={() => this.props.navigation.navigate("EmployeeCost")}>
              <Text style={styles.employeeCostButtonText}>Çalışan Giderleri</Text>
            </TouchableOpacity>

            <RBSheet
              ref={ref => {
                this.OrderSheet = ref;
              }}
              height={230}
              duration={200}
              customStyles={{
                container: {
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  paddingLeft: 20,
                  backgroundColor: '#EFF3F9',
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15
                }
              }
              }
            >
              {this._renderEmployeeSheetContent()}
            </RBSheet>

            <RBSheet
              ref={ref => {
                this.AmountSheet = ref;
              }}
              height={200}
              duration={200}
              customStyles={{
                container: {
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  paddingLeft: 20,
                  backgroundColor: '#EFF3F9',
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15
                }
              }}
            >
              {this._renderEmployeeCostSheetContent()}
            </RBSheet>
            <View style={{ marginTop: 10 }}></View>
          </KeyboardAvoidingView>
          {this._renderView()}
        </View>
      );
    }
  }
}

const mapStateToProps = (state: AppState) => ({
  isLoading: state.employee.isLoading,
  employees: state.employee.employees,
  employeeDeleteIsSuccess: state.deleteEmployee.isSuccess,
  employeeAddCostLoading : state.employeeAddCost.EmployeAddCostLoading
})
function bindToAction(dispatch: any) {
  return {
    GetEmployees: () =>
      dispatch(GetEmployees()),
    employeeDelete: (employeeId: number) =>
      dispatch(employeeDelete(employeeId)),
      employeeCost: (employeeId: number, cost: number) =>
      dispatch(employeeCost(employeeId, cost)),
     
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(Employee);
