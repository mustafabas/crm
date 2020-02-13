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
import { SafeAreaView, NavigationScreenProp, NavigationState, NavigationEvents } from 'react-navigation';
import { IOrderItem } from '../../../redux/models/orderModel';
import RBSheet from 'react-native-raw-bottom-sheet';

import * as Yup from "yup";
import { connect } from 'react-redux';
import { AppState } from '../../../redux/store';

import { Dimensions } from 'react-native';

import { getNotifications, INotificationItem } from '../../../redux/actions/notificationAction';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { DeleteNotification } from '../../../services/RequestService';


interface Props {
    navigation: NavigationScreenProp<NavigationState>;
    loading: boolean;
    message: string;
    notificationList: INotificationItem[]
    getNotifications: (isUpdate: boolean, page: number, pageSize: number) => void;
    isFinishedMore: boolean;

}

interface State {
    notificationListTmp: INotificationItem[];
    updatStateList: boolean;
    page: number;
    refreshing: boolean;
}

const PAGE_SIZE: number = 15;
class NotificationScreen extends Component<Props, State>{



    static navigationOptions = ({ navigation }) => ({
        title: 'Bildirimler'
    })

    componentWillMount() {
        this.props.getNotifications(true, 1, PAGE_SIZE);
    }

    constructor(props: any) {
        super(props);
        this.state = {
            listType: 'FlatList',
            updatStateList: false,
            refreshing: false,
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
            notificationListTmp: []
        };

        this.rowSwipeAnimatedValues = {};

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
        const valueChoosed: INotificationItem = this.state.notificationListTmp.find(
            item => item.key === rowKey
        );
        this.setState({ notificationListTmp: newData });
        DeleteNotification(valueChoosed.value.notificationId);

    }

    deleteSectionRow(rowMap: any, rowKey: any) {
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
    componentDidMount() {

    }

    maptoStateProps() {
            console.log(this.props.isFinishedMore,"isFinishedMore");

        if ((this.props.loading == false && this.state.notificationListTmp.length < 1) || this.props.notificationList.length > this.state.notificationListTmp.length || this.state.refreshing ) {
            this.setState({ notificationListTmp: this.props.notificationList, updatStateList: false, page: 1, refreshing: false }, () => {
                this.props.notificationList.forEach(element => {
                    this.setState(element => {
                        const list = this.state.notificationListTmp.concat(element);
                        return {
                          list
                        };
                      });

                });
            });
        }
    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.props.getNotifications(true, 1, PAGE_SIZE);
        this.maptoStateProps();
    }
    render() {

        this.maptoStateProps();


        Array(this.props.notificationList.length)
            .fill('')
            .forEach((_, i) => {
                this.rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
            });


        return (
            <View style={styles.container}>
                <NavigationEvents
                    onWillFocus={payload => { this.props.getNotifications(true, 1, PAGE_SIZE); this.setState({ updatStateList: true }) }}
                />

                <SwipeListView
                    data={this.state.notificationListTmp}
                    renderItem={data => (
                        <TouchableHighlight
                            onPress={() => this.props.navigation.navigate('OrderDetail', { orderId: data.item.value.orderId })}
                            style={styles.rowFront}
                            underlayColor="#bfbfbf"

                        >
                            <View style={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10,  backgroundColor: data.item.value.viewed == false ? "#EEEEEE" : "#ffff" }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../../../images/order.png')} style={{ marginRight: 10, alignSelf: 'center' }} />
                                    <Text style={{ paddingRight: 10, fontFamily: 'Avenir Next' }}>
                                        {data.item.value.message}
                                    </Text>

                                </View>
                                <Text style={{ paddingRight: 5, textAlign: 'right', fontSize: 14, color: '#bfbfbf', fontFamily: 'Avenir Next' }}>
                                    {data.item.value.createdDate}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    )}
                    disableRightSwipe={true}
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.onRefresh()}
                    onEndReached={() => {
                        var pagenew = this.state.page + 1;
                        this.setState({ page: pagenew });
                        if (pagenew == 1) {
                            pagenew = pagenew + 1;
                            this.setState({ page: pagenew });
                        }
                        this.setState({ updatStateList: this.props.isFinishedMore });
                        this.props.getNotifications(true, pagenew, PAGE_SIZE);
                    }}
                    onEndReachedThreshold={0.5}
                    initialNumToRender={5}
                    extraData={this.state.notificationListTmp}
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
    loading: state.notification.isLoading,
    message: state.notification.message,
    notificationList: state.notification.notificationListItem,
    isFinishedMore: state.notification.isMoreFinished

});

function bindToAction(dispatch: any) {
    return {
        getNotifications: (isUpdate: boolean, page: number, pageSize: number) =>
            dispatch(getNotifications(isUpdate, page, pageSize)),

    };
}




export default connect(
    mapStateToProps,
    bindToAction
)(NotificationScreen);




