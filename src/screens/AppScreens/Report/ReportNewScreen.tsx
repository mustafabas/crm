import React, { Component } from "react";
import {
    View,
    FlatList,
    StatusBar,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Modal,
    Dimensions,
    SafeAreaView,
} from "react-native";
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation";
import { connect } from "react-redux";

import styles from "../../../pages/styles";
import { GetReport } from "../../../redux/actions/reportAction";
import { AppState } from "../../../redux/store";
import { IReportItem } from "../../../redux/models/reportModel";
import Icon from "react-native-vector-icons/Ionicons";
import RBSheet from "react-native-raw-bottom-sheet";
import {DatePicker as DateTimePicker, Spinner} from 'native-base'
import { Circle, G, Image } from 'react-native-svg'
import { PieChart} from 'react-native-svg-charts'
// interface Props {
//     navigation: NavigationScreenProp<NavigationState>;
//     isLoading: boolean;
//     report: IReportItem;
//     GetReport: (startDate: string, endDate: string) => void;
// }

// interface State {
//     modalVisible: boolean;
//     refreshing: boolean;
//     productId: number;
//     productName: string;
//     productCode: string;
//     price: number;
//     productStatus: boolean;
//     startDate: Date;
//     endDate: Date;
//     date: Date;
//     mode: string;
//     show:boolean;
//     showSecond : boolean;
// }

class ReportNewScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedSlice: {
            label: '',
            value: 0
          },
          labelWidth: 0
        }
      }
      render() {
        const { labelWidth, selectedSlice } = this.state;
        const { label, value } = selectedSlice;
        const keys = ['google', 'facebook', 'linkedin', 'youtube', 'Twitter'];
        const values = [25, 25, 35, 35, 55];
        const colors = ['#600080', '#9900cc', '#c61aff', '#d966ff', '#ecb3ff']
        const data = keys.map((key, index) => {
            return {
              key,
              value: values[index],
              svg: { fill: colors[index] },
              arc: { outerRadius: (70 + values[index]) + '%', padAngle: label === key ? 0.1 : 0 },
              onPress: () => this.setState({ selectedSlice: { label: key, value: values[index] } })
            }
          })
        const deviceWidth = Dimensions.get('window').width
    
        return (
          <View  style={{  flex: 1 }}>
              <View style={{backgroundColor:'#133264',paddingTop:40}}>
              <Text style={{fontSize:30,fontFamily:'Avenir Next',fontWeight:'600',color:'white',marginLeft:20}}>Rapor Ekranı</Text>
            <PieChart
              style={{ height: 200,marginTop:20}}
              outerRadius={'80%'}
              innerRadius={'45%'}
              data={data}
            />
            <Text
              onLayout={({ nativeEvent: { layout: { width } } }) => {
                this.setState({ labelWidth: width });
              }}
              style={{
                position: 'absolute',
                left: deviceWidth / 2 - labelWidth / 2,
                textAlign: 'center',
                paddingTop:190,
                fontFamily:"Avenir Next",
                color: 'white'

              }}>
              {`${label} \n ${value}`}
            </Text>
            
              </View>
              <View>
                <View style={{flexDirection:"row",justifyContent:'space-between'}}>
                <Text style={{fontFamily:'Avenir Next',fontSize:20,margin:20}}>Satış Yapılan Şirketler</Text>
                <Text style={{fontFamily:'Avenir Next',fontSize:20,margin:20}}>Toplam Fiyat</Text>

                </View>
               <ScrollView bounce={true}>
               <View style={{flexDirection:'row',marginHorizontal:10,alignItems:'center',marginTop:10}}>
                <View style={{width:40,height:40,borderRadius:20,backgroundColor:"#bbd9dd",justifyContent:'center',alignItems:'center'}}>
                    <Icon name="ios-cart" style={{  fontSize: 25,color:'white'}} />
                    </View>
                    <Text style={{color:"#a1a1a1", fontFamily:'Avenir Next',fontSize:18,marginLeft:10}}>Sirket Ismi</Text>
                    <View style={{flex:.4,height:10,backgroundColor:"#ebd8db",marginLeft:10,borderRadius:10,flexDirection:'row'}}>
                    <View style={{flex:.4,height:10,borderRadius:10,backgroundColor:'#bf7f89'}}></View>
     
                    </View>
                    <Text style={{color:"#a1a1a1", fontFamily:'Avenir Next',fontSize:18,marginLeft:10,flex:1,textAlign:'right',marginRight:10}}>1000 TL</Text>
                </View>

                <View style={{flexDirection:'row',marginHorizontal:10,alignItems:'center',marginTop:10}}>
                <View style={{width:40,height:40,borderRadius:20,backgroundColor:"#bbd9dd",justifyContent:'center',alignItems:'center'}}>
                    <Icon name="ios-cart" style={{  fontSize: 25,color:'white'}} />
                    </View>
                    <Text style={{color:"#a1a1a1", fontFamily:'Avenir Next',fontSize:18,marginLeft:10}}>Sirket Ismi</Text>
                    <View style={{flex:.4,height:10,backgroundColor:"#ebd8db",marginLeft:10,borderRadius:10,flexDirection:'row'}}>
                    <View style={{flex:.5,height:10,borderRadius:10,backgroundColor:'#bf7f89'}}></View>
     
                    </View>
                    <Text style={{color:"#a1a1a1", fontFamily:'Avenir Next',fontSize:18,marginLeft:10,flex:1,textAlign:'right',marginRight:10}}>1000 TL</Text>
                </View>


                <View style={{flexDirection:'row',marginHorizontal:10,alignItems:'center',marginTop:10}}>
                <View style={{width:40,height:40,borderRadius:20,backgroundColor:"#bbd9dd",justifyContent:'center',alignItems:'center'}}>
                    <Icon name="ios-cart" style={{  fontSize: 25,color:'white'}} />
                    </View>
                    <Text style={{color:"#a1a1a1", fontFamily:'Avenir Next',fontSize:18,marginLeft:10}}>Sirket Ismi</Text>
                    <View style={{flex:.4,height:10,backgroundColor:"#ebd8db",marginLeft:10,borderRadius:10,flexDirection:'row'}}>
                    <View style={{flex:.6,height:10,borderRadius:10,backgroundColor:'#bf7f89'}}></View>
     
                    </View>
                    <Text style={{color:"#a1a1a1", fontFamily:'Avenir Next',fontSize:18,marginLeft:10,flex:1,textAlign:'right',marginRight:10}}>1000 TL</Text>
                </View>

                <View style={{flexDirection:'row',marginHorizontal:10,alignItems:'center',marginTop:10}}>
                <View style={{width:40,height:40,borderRadius:20,backgroundColor:"#bbd9dd",justifyContent:'center',alignItems:'center'}}>
                    <Icon name="ios-cart" style={{  fontSize: 25,color:'white'}} />
                    </View>
                    <Text style={{color:"#a1a1a1", fontFamily:'Avenir Next',fontSize:18,marginLeft:10}}>Sirket Ismi</Text>
                    <View style={{flex:.4,height:10,backgroundColor:"#ebd8db",marginLeft:10,borderRadius:10,flexDirection:'row'}}>
                    <View style={{flex:.7,height:10,borderRadius:10,backgroundColor:'#bf7f89'}}></View>
     
                    </View>
                    <Text style={{color:"#a1a1a1", fontFamily:'Avenir Next',fontSize:18,marginLeft:10,flex:1,textAlign:'right',marginRight:10}}>1000 TL</Text>
                </View>

                <View style={{flexDirection:'row',marginHorizontal:10,alignItems:'center',marginTop:10}}>
                <View style={{width:40,height:40,borderRadius:20,backgroundColor:"#bbd9dd",justifyContent:'center',alignItems:'center'}}>
                    <Icon name="ios-cart" style={{  fontSize: 25,color:'white'}} />
                    </View>
                    <Text style={{color:"#a1a1a1", fontFamily:'Avenir Next',fontSize:18,marginLeft:10}}>Sirket Ismi</Text>
                    <View style={{flex:.4,height:10,backgroundColor:"#ebd8db",marginLeft:10,borderRadius:10,flexDirection:'row'}}>
                    <View style={{flex:.8,height:10,borderRadius:10,backgroundColor:'#bf7f89'}}></View>
     
                    </View>
                    <Text style={{color:"#a1a1a1", fontFamily:'Avenir Next',fontSize:18,marginLeft:10,flex:1,textAlign:'right',marginRight:10}}>1000 TL</Text>
                </View>

                <View style={{flexDirection:'row',marginHorizontal:10,alignItems:'center',marginTop:10}}>
                <View style={{width:40,height:40,borderRadius:20,backgroundColor:"#bbd9dd",justifyContent:'center',alignItems:'center'}}>
                    <Icon name="ios-cart" style={{  fontSize: 25,color:'white'}} />
                    </View>
                    <Text style={{color:"#a1a1a1", fontFamily:'Avenir Next',fontSize:18,marginLeft:10}}>Sirket Ismi</Text>
                    <View style={{flex:.4,height:10,backgroundColor:"#ebd8db",marginLeft:10,borderRadius:10,flexDirection:'row'}}>
                    <View style={{flex:.3,height:10,borderRadius:10,backgroundColor:'#bf7f89'}}></View>
     
                    </View>
                    <Text style={{color:"#a1a1a1", fontFamily:'Avenir Next',fontSize:18,marginLeft:10,flex:1,textAlign:'right',marginRight:10}}>1000 TL</Text>
                </View>

                
               </ScrollView>
               
            </View>
          </View>
        )
      }


}

const mapStateToProps = (state: AppState) => ({
    isLoading: state.report.isReportLoading,
    report: state.report.report,

})
function bindToAction(dispatch: any) {
    return {
        GetReport: (startDate: string, endDate: string) =>
            dispatch(GetReport(startDate, endDate)),
    };
}

export default connect(
    mapStateToProps,
    bindToAction
)(ReportNewScreen);
