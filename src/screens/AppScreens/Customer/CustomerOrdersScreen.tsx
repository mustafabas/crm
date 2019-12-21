'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    FlatList,
    Animated,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';

import { Icon, Input, Item, Tabs, Tab, TabHeading, Button, ScrollableTab } from 'native-base';
import { Alert } from 'react-native';
import { SafeAreaView, NavigationScreenProp, NavigationState } from 'react-navigation';


const title = "Home Screen"


interface Props {

  navigation: NavigationScreenProp<NavigationState>;
}


  function shouldShowBackButton(stackRouteNavigation) {
    let parent = stackRouteNavigation.dangerouslyGetParent();
    return parent.state.routes.indexOf(stackRouteNavigation.state) > 0;
  }



export default class CustomerOrdersScreen extends Component<Props,{}>{


    static navigationOptions = ({ navigation }) => ({
        header: () => <SafeAreaView forceInset={{horizontal:'never'}}  style={{flexDirection:'row',justifyContent:'space-between',height:'100%',backgroundColor:'#216AF4',paddingHorizontal:10}}>

<TouchableOpacity

             onPress={()=>navigation.popToTop()}

            ><Image style={{width:21,height:33,marginBottom:5}}  source={require('../../../images/Vector3.png')} /></TouchableOpacity>
            <Text style={{fontWeight: '600',
        fontFamily:'Avenir Next',
        fontSize:18,color:'white'}}>
              Müşteri Siparişleri
            </Text>

<TouchableOpacity

             

><Icon  style={{color:'white',width:33,height:33,fontSize:33}}  name="ios-add-circle" /></TouchableOpacity>
        </SafeAreaView>,
      });



    // static navigationOptions = {
    //     title: 'Müşteri Siparişleri',
    
    //     // headerStyle: {
    //     //   backgroundColor: '#e83537',
    //     // },
    //     // headerTintColor: '#fff',
    //     // headerTitleStyle: {
    //     //   fontWeight: 'bold',
    //     // },

    //       headerLeft: shouldShowBackButton(navigation) ? (
    //         <TouchableOpacity

             

    //         ><Icon style={{color:'white'}}  name="ios-add-circle" /></TouchableOpacity>
    //       ) : null,



    //     headerRight: () => (
    //         <TouchableOpacity

             

    //         ><Icon style={{color:'white'}}  name="ios-add-circle" /></TouchableOpacity>
    //       ),


    //   };
    


    constructor(props) {
        super(props);
  
        this.state = {
           
        };
      }



    render() {
        return (
            <View style={{}}>
               <ScrollView style={{paddingTop:20}}>

               <View style={{marginHorizontal:5,flexDirection:'row',backgroundColor:'#EFF3F9',paddingVertical:20,paddingHorizontal:5,justifyContent:'space-between',borderRadius:15}}>
            <View style={{width:33,height:33,borderRadius: 16.5,backgroundColor:'#2069F3',justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'white'}}>A</Text>
            </View>
            <View>
                <Text style={{color:'#404243',fontSize:12,fontFamily:'Avenir Next'}}>
                    Müşteri Adı
                </Text>
                <Text style={{color:'#2069F3',fontWeight:'600',fontSize:16,fontFamily:'Avenir Next'}}>
                    Aday Park
                </Text>
            </View>
            <View style={{width:1,height:'80%',backgroundColor:'#CFD3D7'}} />
            <View>
                <Text style={{color:'#404243',fontSize:12,fontFamily:'Avenir Next'}}>
                    Alınan
                </Text>
                <Text style={{color:'#404243',fontWeight:'600',fontSize:14,fontFamily:'Avenir Next'}}>
                    22.50 TL
                </Text>
            </View>
            <View style={{width:1,height:'80%',backgroundColor:'#CFD3D7'}} />
            <View>
                <Text style={{color:'#404243',fontSize:12,fontFamily:'Avenir Next'}}>
                    Kalan
                </Text>
                <Text style={{color:'#404243',fontWeight:'600',fontSize:14,fontFamily:'Avenir Next'}}>
                    22.50 TL
                </Text>
            </View>
            <View style={{width:1,height:'80%',backgroundColor:'#CFD3D7'}} />

            <View>
                <Text style={{color:'#404243',fontSize:12,fontFamily:'Avenir Next'}}>
                    Toplam
                </Text>
                <Text style={{color:'#404243',fontWeight:'600',fontSize:14,fontFamily:'Avenir Next'}}>
                    22.50 TL
                </Text>
            </View>
            </View>
            
{/* Other Components */}

<View style={{height:30}}/>


<View style={{marginHorizontal:10,flexDirection:'column',backgroundColor:'#EFF3F9',paddingVertical:10,paddingHorizontal:10,justifyContent:'space-between',borderRadius:15}}>
            
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>

           <View style={{justifyContent:'center'}}>
                
                <Text style={{color:'#2069F3',fontWeight:'600',fontSize:20,fontFamily:'Avenir Next'}}>
                    Ege Life Damacana
                </Text>
            </View>
            {/* <View style={{width:1,height:'80%',backgroundColor:'#CFD3D7'}} /> */}
            <View style={{alignItems:'flex-end'}}>
              <TouchableOpacity>
                <Icon style={{color:"#2069F3"}} name="ios-more" />
              </TouchableOpacity>
                <Text style={{color:'#404243',fontSize:14,fontFamily:'Avenir Next'}}>
                    13/12/2019
                </Text> 
                <Text style={{color:'#404243',fontSize:14,fontFamily:'Avenir Next'}}>
                    16.15
                </Text>
                </View>
            
            
             </View>


             <View style={{width:"100%",height:1,backgroundColor:'#CFD3D7',marginVertical:10}} />
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View>
                <View style={{flexDirection:'row'}}>
                <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                    Adet: 
                </Text>
                <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                    5 
                </Text>

                </View>

                <View style={{flexDirection:'row'}}>
                <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                    Birim Fiyat: 
                </Text>
                <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                    7,5 TL 
                </Text>

                </View>

                <View style={{flexDirection:'row'}}>
                <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                    Toplam Fiyat: 
                </Text>
                <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                    45 TL
                </Text>

                </View>


              
            </View>
            {/* <View style={{width:1,height:'80%',backgroundColor:'#CFD3D7'}} /> */}

            <View>
            <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                    Alınan: 
                </Text>
                <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                    5 
                </Text>

                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                    Kalan: 
                </Text>
                <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                    22.5 TL
                </Text>

                </View>


            </View>
            </View>
           </View>

           <View style={{height:30}}/>


<View style={{marginHorizontal:10,flexDirection:'column',backgroundColor:'#EFF3F9',paddingVertical:10,paddingHorizontal:10,justifyContent:'space-between',borderRadius:15}}>
            
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>

           <View>
                
                <Text style={{color:'#2069F3',fontWeight:'600',fontSize:16,fontFamily:'Avenir Next'}}>
                    Ege Life Damacana
                </Text>
            </View>
            {/* <View style={{width:1,height:'80%',backgroundColor:'#CFD3D7'}} /> */}
            <View style={{alignItems:'flex-end'}}>
              <TouchableOpacity>
                <Icon style={{color:"#2069F3"}} name="ios-more" />
              </TouchableOpacity>
                <Text style={{color:'#404243',fontSize:14,fontFamily:'Avenir Next'}}>
                    13/12/2019
                </Text> 
                <Text style={{color:'#404243',fontSize:14,fontFamily:'Avenir Next'}}>
                    16.15
                </Text>
                </View>
            
            
             </View>


             <View style={{width:"100%",height:1,backgroundColor:'#CFD3D7',marginVertical:10}} />
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View>
                <View style={{flexDirection:'row'}}>
                <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                    Adet: 
                </Text>
                <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                    5 
                </Text>

                </View>

                <View style={{flexDirection:'row'}}>
                <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                    Birim Fiyat: 
                </Text>
                <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                    7,5 TL 
                </Text>

                </View>

                <View style={{flexDirection:'row'}}>
                <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                    Toplam Fiyat: 
                </Text>
                <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                    45 TL
                </Text>

                </View>


              
            </View>
            {/* <View style={{width:1,height:'80%',backgroundColor:'#CFD3D7'}} /> */}

            <View>
            <View style={{flexDirection:'row'}}>
                <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                    Alınan: 
                </Text>
                <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                    5 
                </Text>

                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                    Kalan: 
                </Text>
                <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                    22.5 TL
                </Text>

                </View>


            </View>
            </View>
           </View>


           <View style={{height:30}}/>


<View style={{marginHorizontal:10,flexDirection:'column',backgroundColor:'#EFF3F9',paddingVertical:10,paddingHorizontal:10,justifyContent:'space-between',borderRadius:15}}>
            
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>

           <View>
                
                <Text style={{color:'#2069F3',fontWeight:'600',fontSize:16,fontFamily:'Avenir Next'}}>
                    Ege Life Damacana
                </Text>
            </View>
            {/* <View style={{width:1,height:'80%',backgroundColor:'#CFD3D7'}} /> */}
            <View style={{alignItems:'flex-end'}}>
              <TouchableOpacity>
                <Icon style={{color:"#2069F3"}} name="ios-more" />
              </TouchableOpacity>
                <Text style={{color:'#404243',fontSize:14,fontFamily:'Avenir Next'}}>
                    13/12/2019
                </Text> 
                <Text style={{color:'#404243',fontSize:14,fontFamily:'Avenir Next'}}>
                    16.15
                </Text>
                </View>
            
            
             </View>


             <View style={{width:"100%",height:1,backgroundColor:'#CFD3D7',marginVertical:10}} />
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View>
                <View style={{flexDirection:'row'}}>
                <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                    Adet: 
                </Text>
                <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                    5 
                </Text>

                </View>

                <View style={{flexDirection:'row'}}>
                <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                    Birim Fiyat: 
                </Text>
                <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                    7,5 TL 
                </Text>

                </View>

                <View style={{flexDirection:'row'}}>
                <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                    Toplam Fiyat: 
                </Text>
                <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                    45 TL
                </Text>

                </View>


              
            </View>
            {/* <View style={{width:1,height:'80%',backgroundColor:'#CFD3D7'}} /> */}

            <View>
            <View style={{flexDirection:'row'}}>
                <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                    Alınan: 
                </Text>
                <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                    5 
                </Text>

                </View>
                <View style={{flexDirection:'row'}}>
                <Text style={{color:'#404243',fontSize:16,fontFamily:'Avenir Next'}}>
                    Kalan: 
                </Text>
                <Text style={{color:'#404243',fontSize:16,fontWeight:'600',fontFamily:'Avenir Next'}}>
                    22.5 TL
                </Text>

                </View>


            </View>
            </View>
           </View>


{/*  */}
             
          
{/*  */}

               </ScrollView>
                </View>

        )
    }
}

const styles = StyleSheet.create({
   
});

