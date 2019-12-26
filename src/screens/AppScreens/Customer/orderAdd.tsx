import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { NavigationScreenProp, NavigationState, NavigationEvents } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../../../pages/styles";

// import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { AppState } from "../../../redux/store";
import { GetProducts } from "../../../redux/actions/productAction";
import { IProductItem } from "../../../redux/models/productAddModel";
import { AddOrder } from "../../../redux/actions/addOrderAction";
// import { IAddOrderItem } from "../redux/models/addOrderModel";
import { GetProduct } from "../../../redux/actions/productForCustomerAction";
import { IProductForCustomerItem } from "../../../redux/models/productForCustomerModel";
import { Input, CheckBox,Picker, Item, Label, Button, Spinner } from "native-base";
import { showMessage } from "react-native-flash-message";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isProductLoading: boolean;
  products: IProductItem[];
  GetProducts: () => void;
  AddOrder: (productId: number, customerId: number, unitPrice: number, count: number,isPaid:boolean) => void;
  isSuccees: boolean;

  AddOrderMessage: string;
  GetProduct: (productId: number, customerId: number) => void;
  product: IProductForCustomerItem;



  isTried : boolean;
  isLoading : boolean;
}

interface State {
  productName: string,
  productCode: string,
  unitPrice: string,
  date: string,
  productId: number,
  count: string,
  isSuccess: boolean,
  status: boolean,
}

interface Item {
  label: string;
  value: any;
  key?: string | number;
  color?: string;
}

interface input {
  count: string,
  unitPrice: string,
}

const girdiler = Yup.object().shape({
  count: Yup.number()
    .positive()
    .required(),

});
class orderAdd extends Component<Props, State> {

  showSimpleMessage() {

    if (this.props.AddOrderMessage ) {

      showMessage({
        message: this.props.AddOrderMessage,
        type: this.props.isSuccees ? "success" : "danger",
        icon: 'auto'
      }
      );
    }
  
  }

  




  static navigationOptions = ({ navigation }: Props) => {
    return {

      title: 'Sipariş Ekle',



      headerStyle: {
        backgroundColor: '#2B6EDC',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },

    }


  };


  constructor(props: Props) {
    super(props);
    this.state = {
      productId: 19,
      productName: "",
      productCode: "",
      unitPrice: "",
      date: "",
      count: "",
      isSuccess: false,
      status:false,
      selected2: undefined,
      selectedProductValue : null
    };
  }

  handleAlert() {
    this.props.navigation.navigate("OrdersCustomer", { customerId: this.props.navigation.getParam("customerId") });
    Alert.alert(
      //title
      'Yeni Sipariş Oluşturuldu!',
      //body
      '',
      [
        { text: 'Tamam' }
      ],
      { cancelable: false }
    );
  }

  siparisOlustur(values: input) {
    const { AddOrder, navigation, isSuccees } = this.props;
    var customerId = navigation.getParam("customerId");
    AddOrder(this.state.productId, customerId, Number(values.unitPrice.replace(",",".")), Number(values.count),this.state.status);
    // this.handleAlert()
  }

  OrderInfo(productId: number) {
    console.log(productId)
    this.props.GetProduct(productId, this.props.navigation.getParam("customerId"));

    this.setState({
      productId: productId,
    });
    

  }

  PickerMenuCreate() {
    var PickerModel: Item[] = [];

    this.props.products.forEach((product: IProductItem) => {
      var productItem: Item = {
        label: product.productName,
        value: product.productId,
      }
      PickerModel.push(productItem);
    });

    return PickerModel;
  }
  // componentDidMount() {
  //   this.props.GetProducts();
  // }
  componentWillMount() {
    console.log(this.props.product)
    this.props.GetProducts();
    console.log(this.props.product)
    var dateAta: string;
    var date = new Date();
    dateAta = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    this.setState({ date: dateAta });

  }

 
onValueChange2(value: string) {

  this.setState({
    selected2: value,
    selectedProductValue : this.props.products.find(task => (task.productId=== Number(value)), this)?.productCode
    ,productId: value,
  });

  console.log("asdasd"+value)
  this.props.GetProduct(Number(value), this.props.navigation.getParam("customerId"));


  


  //  this.OrderInfo(Number(value))
}


  render() {
    
    const initialValues: input = {
      count: this.state.count,
      unitPrice: this.props.product.unitPrice ? String(this.props.product.unitPrice) : "",
    }

    const placeholder = {
      label: 'Ege Life Damacana',
      value: 19,
      color: '#2B6EDC',
    };
    if(this.props.isSuccees) {
      this.props.navigation.goBack()
    }
    return (
      
      <View style={styles.addCustomerContainer}>

        <StatusBar backgroundColor="#2B6EDC" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false}>
            <Text style={{textAlign:'right',marginRight:20,marginTop:20}}>
              {this.state.date}
            </Text>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={girdiler}
              onSubmit={values => this.siparisOlustur(values)}
            >
              {props => {
                return (
                  <View>
                    <View>
                    </View>
                    <View style={[styles.rnpickerselect,{paddingTop:20,paddingRight:20}]}>


<Picker
placeholderStyle={{width:'100%'}}
headerTitleStyle={{color:'white',fontFamily:'Avenir Next',fontSize:18}}
headerStyle={{backgroundColor: '#2B6EDC'}}
iosHeader="Ürünler"
headerBackButtonTextStyle={{color:'white'}}
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down" />}
                style={{ width:'100%'}}
                placeholder="Ürün Seçimi"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                // onValueChange={this.onValueChange2.bind(this)}
                onValueChange={(itemValue, itemIndex) =>
                  this.onValueChange2(itemValue)
                }>
              
                {this.PickerMenuCreate().map((res)=> {
                    return (
                      <Picker.Item label={res.label} value={res.value} />
                    )
                })}
                

              </Picker>
              
                      </View>
                    <View style={[styles.inputContainer,{paddingTop:0}]}>
                      

                      <View style={styles.input}>
                       <Item floatingLabel>
                        <Label style={{fontFamily:'Avenir Next',fontSize:18,}}>
                        Ürün Adedi:
                        </Label>
                        <Input
                          style={styles.input}

                          placeholderTextColor="#9A9A9A"
                          keyboardType="numeric"
                          value={props.values.count}
                          onChangeText={props.handleChange("count")}
                          onBlur={props.handleBlur("count")}
                        />
                       </Item>
                      </View>


                      <Text style={{fontFamily:'Avenir Next',fontSize:18,marginTop:20}}>Ürün Kodu: {this.state.selectedProductValue}</Text>
                      
                    <Item floatingLabel style={{marginTop:20}}>
                  <Label style={{fontFamily:'Avenir Next',fontSize:18}}>
                  Birim Fiyat: 
               
                  </Label>
                    
                     {/* <View style={styles.input}> */}
                        <Input
                          // style={styles.input}
                          // placeholder="Ürün Adedi"
                          placeholderTextColor="#9A9A9A"
                          keyboardType="numeric"
                          value={String(props.values.unitPrice)}
                          onChangeText={props.handleChange("unitPrice")}
                          onBlur={props.handleBlur("unitPrice")}
                        />
                        </Item>
                      {/* </View>   */}
                      <View style={{margin:2}}></View>
                      <View style={{flexDirection:'row',marginTop:30}}>
                      <CheckBox

// containerStyle={styles.chechBoxContainer}             


style={{marginLeft:-5}}
checked={this.state.status}
onPress={() => this.setState({ status: !this.state.status })}
/>
<Label style={{marginLeft:20}}>
  Pesin Odeme
</Label>
                      </View>

                        <Text style={styles.odenecekText}>Toplam Fiyat: {(Number(props.values.unitPrice.replace(",",".")) * Number(props.values.count))} TL</Text>

                      {/* <TouchableOpacity style={styles.siparisButtonContainer}>
                        <Text style={styles.amountButtonText}
                         
                        >Sipariş Ekle</Text>
                      </TouchableOpacity> */}



                      <Button onPress={props.handleSubmit}  style={{justifyContent:'center',marginTop:30,marginBottom:30,marginHorizontal:40,borderRadius:20,backgroundColor:'#01C3E3',
                    shadowRadius: 5.00,
                    
                    elevation: 12,

                    shadowColor: "#006c7e",
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,

    
                    }}>
                      {this.props.isLoading ? <Spinner  color='01C3E3' /> :   <Text  style={{color:'white',fontFamily:"Avenir Next",fontWeight:'bold',fontSize:16}} >Ekle</Text>}
                       
           
          </Button>
          
                    </View>
                  </View>
                );
              }}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
        {this.showSimpleMessage()}
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isProductLoading: state.products.isProductLoading,
  products: state.products.products,
  isSuccees: state.addOrder.isSuccess,
  product: state.productForCustomer.product,
  isTried : state.addOrder.isTried,
  isLoading : state.addOrder.isLoading,
  AddOrderMessage : state.addOrder.AddOrderMessage
})
function bindToAction(dispatch: any) {
  return {
    GetProducts: () =>
      dispatch(GetProducts()),
    AddOrder: (productId: number, customerId: number, unitPrice: number, count: number,isPaid:boolean) =>
      dispatch(AddOrder(productId, customerId, unitPrice, count,isPaid)),
    GetProduct: (productId: number, customerId: number) =>
      dispatch(GetProduct(productId, customerId)),
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(orderAdd);