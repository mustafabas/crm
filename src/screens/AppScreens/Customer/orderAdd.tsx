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
  Alert,FlatList
} from "react-native";
import { NavigationScreenProp, NavigationState, NavigationEvents } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../../../pages/styles";

// import RNPickerSelect from 'react-native-picker-select';

import { connect } from "react-redux";
import { AppState } from "../../../redux/store";
import { GetProducts } from "../../../redux/actions/productAction";
import { IProductItem } from "../../../redux/models/productAddModel";
import { AddOrder, notificationEmployee } from "../../../redux/actions/addOrderAction";
// import { IAddOrderItem } from "../redux/models/addOrderModel";
import { GetProduct } from "../../../redux/actions/productForCustomerAction";
import { IProductForCustomerItem } from "../../../redux/models/productForCustomerModel";
import { Input, CheckBox,Picker, Item, Label, Button, Spinner, Card, CardItem,Body,Icon } from "native-base";
import { showMessage } from "react-native-flash-message";
import { InfoItem } from "../../../components/InfoItem";
import RBSheet from "react-native-raw-bottom-sheet";
import { NotificationService } from "../../../services/NotificationService";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isProductLoading: boolean;
  products: IProductItem[];
  GetProducts: () => void;
  AddOrder: (productId: number, customerId: number, unitPrice: number, count: number,isPaid:boolean) => void;
  isSuccees: boolean;
  notificationEmployee : notificationEmployee;
  AddOrderMessage: string;
  GetProduct: (productId: number, customerId: number) => void;
  product: IProductForCustomerItem;



  isTried : boolean;
  isLoading : boolean;
}

interface State {
  productName: string;
  productCode: string;
  unitPrice: string;
  date: string;
  productId: number;
  count: string;
  isSuccess: boolean;
  status: boolean;
  selected2:boolean;
  orderAddedSuccessfully: boolean;
  selectedEmployee : number;
  notificationIsSend : boolean;
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
      productId: 0,
      productName: "",
      productCode: "",
      unitPrice: "",
      date: "",
      count: "",
      isSuccess: false,
      status:false,
      selected2: null,
      selectedProductValue : null,
      orderAddedSuccessfully : false,
      selectedEmployee : 0,
      notificationIsSend : false

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
    console.log("asdasd")
    const { AddOrder, navigation, isSuccees } = this.props;
    var customerId = navigation.getParam("customerId");
    if(this.state.productId===0) {
      showMessage({
        message: "Sipariş Eklemek için ürün seçmelisiniz.",
        type:  "danger",
        icon: 'auto'
      }
      );
    }
   else {
    AddOrder(this.state.productId, customerId, Number(values.unitPrice.replace(",",".")), Number(values.count),this.state.status);
   }
    // this.handleAlert()
  }

  OrderInfo(productId: number) {
  
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

insertAndSendPush() {
  this.chooseEmployee.close();
  showMessage({
    message: "Sipariş ataması yapıldı.",
    type: "success" ,
    icon: 'auto'
  }
  );


  let tmp = this.props.notificationEmployee.userWithToken.find(e => e.id == this.state.selectedEmployee);
  if(tmp) {
    const notificationService = new NotificationService(tmp.id,1,this.props.notificationEmployee.orderId,tmp.tokens);
     notificationService.addNotification();

  }
  this.setState({notificationIsSend : true})
  

  
}

_renderChooseEmployeeContent(){
  const selectedEmployee = this.state.selectedEmployee
  return(
    <View>
      <TouchableOpacity onPress={()=> this.chooseEmployee.close()} style={{position :'absolute',right:5,top:5,zIndex:10}}>
      <Icon name="ios-close" style={{fontFamily:40}} />
      </TouchableOpacity>

   <ScrollView style={{height:400}}>
   <Text style={{textAlign:'center',marginRight:5,marginTop:10,fontFamily:'Avenir Next',fontSize:18}}>Siparişi Çalışanlara Ata</Text>


<FlatList
        data={this.props.notificationEmployee ? this.props.notificationEmployee.userWithToken : null}
        renderItem={({ item }) => <TouchableOpacity onPress={()=>this.setState({selectedEmployee : (selectedEmployee === item.id ? 0 : item.id)})}
        style={{borderWidth:3,borderRadius:10,marginTop:20,marginHorizontal:10,paddingVertical:5,borderColor:'#216AF4',backgroundColor:selectedEmployee === item.id ? '#216AF4' : 'white'}}>
 <Text style={{fontFamily:'Avenir Next',fontSize:20,paddingVertical:5,textAlign:'center',color: selectedEmployee === item.id ? 'white' : 'black'}}>
 {item.name}
 
 </Text>
 </TouchableOpacity>
 }
        keyExtractor={item => item.id.toString()}
      />

<Button onPress={()=> this.insertAndSendPush()} disabled={this.state.selectedEmployee === 0} style={{marginTop:20,justifyContent:'center',marginHorizontal:10,paddingVertical:5,borderRadius:5,backgroundColor:'#01C3E3',
                    shadowRadius: 5.00,
                    
                    elevation: 12,

                    shadowColor: "#006c7e",
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,

    
                    }}>
                      {this.props.isLoading ? <Spinner  color='01C3E3' /> :   <Text  style={{color:'white',fontFamily:"Avenir Next",fontWeight:'bold',fontSize:16}} >Gönder</Text>}
                       
           
          </Button>

          <Button  onPress={()=> this.chooseEmployee.close()} style={{justifyContent:'center',marginTop:20,marginHorizontal:10,paddingVertical:5,borderRadius:5,backgroundColor:'white',
                    shadowRadius: 5.00,
                    
                    elevation: 12,

                    shadowColor: "#969696",
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,

    
                    }}>
            {this.props.isLoading ? <Spinner /> : <Text style={{color:'#49B1FD',fontFamily:"Avenir Next",fontWeight:'bold',fontSize:16}} >Vazgeç</Text>}
          </Button>


   </ScrollView>
    </View>
  )
}

renderContent(){
  const initialValues: input = {
    count: this.state.count,
    unitPrice: this.props.product.unitPrice ? String(this.props.product.unitPrice) : "",
  }


 if(this.props.isProductLoading !== true && this.props.products.length < 1){
    return (<View style={{marginTop:100}}>
      <TouchableOpacity onPress={()=> this.props.navigation.navigate('AddProduct')} >

    


<InfoItem text="Sisteme eklediğiniz ürün bulunmakatadır. Sipariş Eklemek için ürün eklemeye şimdi başlayın!" />



</TouchableOpacity>
    </View>);
  }else {
    return (
       
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


  
              </View>
            <View style={[styles.inputContainer,{paddingTop:0}]}>
            <Picker
placeholderStyle={{width:'100%'}}
headerStyle={{backgroundColor:'#2069F3'}}
headerTitleStyle={{color:'white',fontFamily:'Avenir Next',fontSize:18}}
// headerStyle={{backgroundColor: '#2B6EDC'}}
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

 {!this.state.notificationIsSend && this.state.orderAddedSuccessfully  && <Button   onPress={()=> this.chooseEmployee.open()} style={{justifyContent:'center',marginTop:0,marginBottom:30,marginHorizontal:40,borderRadius:20,backgroundColor:'white',
                    shadowRadius: 5.00,
                    
                    elevation: 12,

                    shadowColor: "#969696",
    shadowOffset: {width: 3, height: 3 },
    shadowOpacity: .5,

    
                    }}>
           <Text  style={{color:'#49B1FD',fontFamily:"Avenir Next",fontWeight:'bold',fontSize:16}} >Siparişi Ata</Text>
          </Button>
      }

  
            </View>
          </View>
        );
      }}
    </Formik>

    )
  }
}
  render() {
    console.log(this.props.product,"product");
   

    const placeholder = {
      label: 'Ege Life Damacana',
      value: 19,
      color: '#2B6EDC',
    };
    if(this.props.isSuccees) {
      // this.props.navigation.goBack()
   if(!this.state.orderAddedSuccessfully){
    this.setState({ orderAddedSuccessfully: true})
   }
      this.chooseEmployee.open();


    }
    
    return (
      
      <View style={styles.addCustomerContainer}>

        <StatusBar backgroundColor="#2B6EDC" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView bounces={false}>
            {/* <Text style={{textAlign:'right',marginRight:20,marginTop:20}}>
              {this.state.date}
            </Text> */}
{this.renderContent()}
           
        
        
          </ScrollView>
        </KeyboardAvoidingView>

        <RBSheet
              ref={ref => {
                this.chooseEmployee = ref;
              }}
              height={500}
              duration={200}
              customStyles={{
                container: {
                    padding:20,
                    borderRadius:10
                }
              }}
            >
              {this._renderChooseEmployeeContent()}
            </RBSheet>


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
  AddOrderMessage : state.addOrder.AddOrderMessage,
  notificationEmployee : state.addOrder.notificationEmployee
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