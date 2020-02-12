'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,

    View,
    Platform,
    FlatList,
    Animated,
    ScrollView,
    TouchableOpacity,
    Image,

    ActivityIndicator,
    Modal,
    SectionList,
    TouchableHighlight,
} from 'react-native';
import newStyles from "../../AuthScreens/Login/styles";
import { AsyncStorage } from 'react-native'



import { Icon, Text, Input, Item, Tabs, Tab, TabHeading, Button, ScrollableTab, ListItem, Left, Body, Right, Switch, Spinner, List } from 'native-base';
import { Alert } from 'react-native';
import { SafeAreaView, NavigationScreenProp, NavigationState } from 'react-navigation';
import { IOrderItem } from '../../../redux/models/orderModel';
import RBSheet from 'react-native-raw-bottom-sheet';

import * as Yup from "yup";
import { connect } from 'react-redux';
import { AppState } from '../../../redux/store';

import { Dimensions } from 'react-native';
import Swiper from 'react-native-swiper'
import { notificationListItem, getNotifications, INotificationItem } from '../../../redux/actions/notificationAction';

import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';




interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  loading: boolean;
  message : string;
  notificationList : INotificationItem[]
  getNotifications : () => void;

}

interface State {
    notificationListTmp : INotificationItem[]
}

class NotificationScreen extends Component<Props, State>{



  static navigationOptions = ({ navigation }) => ({
    title: 'Bildirimler',

  })

  componentWillMount(){
      this.props.getNotifications()
  }

  constructor(props) {
    super(props);
    this.state = {
        listType: 'FlatList',
        // notificationListTmp: Array(20)
        //     .fill('')
        //     .map((_, i) => ({ key: `${i}`, text: `item #${i}` })),
        sectionListData: Array(5)
            .fill('')
            .map((_, i) => ({
                title: `title${i + 1}`,
                data: [
                    ...Array(5)
                        .fill('')
                        .map((_, j) => ({
                            key: `${i}.${j}`,
                            text: `item #${j}`,
                        })),
                ],
            })),
            notificationListTmp : []
    };

    }

    closeRow(rowMap, rowKey) {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }

deleteRow(rowMap, rowKey) {
    this.closeRow(rowMap, rowKey);
    const newData = [...this.state.notificationListTmp];
    const prevIndex = this.state.notificationListTmp.findIndex(
        item => item.key === rowKey
    );
    newData.splice(prevIndex, 1);
    this.setState({ notificationListTmp: newData });
}

deleteSectionRow(rowMap, rowKey) {
    this.closeRow(rowMap, rowKey);
    const [section] = rowKey.split('.');
    const newData = [...this.state.sectionListData];
    const prevIndex = this.state.sectionListData[section].data.findIndex(
        item => item.key === rowKey
    );
    newData[section].data.splice(prevIndex, 1);
    this.setState({ sectionListData: newData });
}

onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
};

onSwipeValueChange = swipeData => {
    const { key, value } = swipeData;
    this.rowSwipeAnimatedValues[key].setValue(Math.abs(value));
};

render() {


    if(this.props.notificationList.length > 1 && this.state.notificationListTmp.length < 1){
        this.setState({notificationListTmp : this.props.notificationList})

        Array(this.props.notificationList.length)
        .fill('')
        .forEach((_, i) => {
            this.rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
        });
    }
    return (
        <View style={styles.container}>





                <SwipeListView
                    contentContainerStyle={{paddingTop:20}}
                    data={this.state.notificationListTmp}
                    renderItem={data => (
                        <TouchableHighlight
                            onPress={() => this.props.navigation.navigate('OrderDetail',{orderId : data.item.value.orderId})}
                            style={styles.rowFront}
                            underlayColor="#bfbfbf"

                        >
                           <View style={{paddingHorizontal:20,paddingTop:10,paddingBottom:10}}>
                           <View style={{flexDirection:'row'}}>
                                <Image source={require('../../../images/order.png')} style={{marginRight:10,alignSelf:'center'}} />
                                <Text style={{marginRight:5,fontFamily:'Avenir Next'}}>
                                 {data.item.value.message}
                                </Text>
                                
                            </View>
                            <Text style={{marginRight:5,textAlign:'right',fontSize:14,color:'#bfbfbf',fontFamily:'Avenir Next'}}>
                                 {data.item.value.createdDate}
                             </Text>
                           </View>
                        </TouchableHighlight>
                    )}
                    disableRightSwipe={true}
                    renderHiddenItem={(data, rowMap) => (
                        <View style={styles.rowBack}>

                            <TouchableOpacity
                                style={[
                                    styles.backRightBtn,
                                    styles.backRightBtnLeft,
                                ]}
                                onPress={() =>
                                    this.closeRow(rowMap, data.item.key)
                                }
                            >
                                
                                <Icon name="ios-close" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.backRightBtn,
                                    styles.backRightBtnRight,
                                ]}
                                onPress={() =>
                                    this.deleteRow(rowMap, data.item.key)
                                }
                            >
                                <Animated.View
                                    style={[
                                        styles.trash,
                                        {
                                            transform: [
                                                {
                                                    scale: this.rowSwipeAnimatedValues[
                                                        data.item.key
                                                    ].interpolate({
                                                        inputRange: [
                                                            45,
                                                            90,
                                                        ],
                                                        outputRange: [0, 1],
                                                        extrapolate:
                                                            'clamp',
                                                    }),
                                                },
                                            ],
                                        },
                                    ]}
                                >
                                    <Image
                                        source={require('../../../images/bin.png')}
                                        style={styles.trash}
                                    />
                                </Animated.View>
                            </TouchableOpacity>
                        </View>
                    )}
                    leftOpenValue={75}
                    rightOpenValue={-150}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onRowDidOpen={this.onRowDidOpen}
                    onSwipeValueChange={this.onSwipeValueChange}
                />


         

        </View>
    );
}
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    standalone: {
        marginTop: 30,
        marginBottom: 30,
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',

        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#8BC645',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

        padding: 15,
    },
    backTextWhite: {
        color: 'black',
    },
    rowFront: {
        alignItems: 'center',

        paddingHorizontal: 5,

        backgroundColor: 'white',


        borderBottomWidth: 1,
        borderBottomColor: '#bfbfbf'

    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: '#EFF3F9',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: '#FD0D55',
        right: 0,
    },
    controls: {
        alignItems: 'center',
        marginBottom: 30,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5,
    },
    switch: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 10,
        width: Dimensions.get('window').width / 4,
    },
    trash: {
        height: 30,
        width: 30,
    },
});

const mapStateToProps = (state: AppState) => ({
loading : state.notification.isLoading,
message : state.notification.message,
notificationList : state.notification.notificationListItem

});

function bindToAction(dispatch: any) {
  return {
    getNotifications : () => 
    dispatch(getNotifications()),

    };
}




export default connect(
    mapStateToProps,
    bindToAction
)(NotificationScreen);




