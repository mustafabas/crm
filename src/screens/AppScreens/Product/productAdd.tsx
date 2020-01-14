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
import { NavigationScreenProp, NavigationState, } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../../../pages/styles";
import { productAddAction } from "../../../redux/actions/productAddAction";
import { AppState } from '../../../redux/store'
import { connect } from "react-redux";
import { Item, Label, Input, Button, Spinner } from "native-base";
import { showMessage } from "react-native-flash-message";


interface Props {
    navigation: NavigationScreenProp<NavigationState>;
    isSuccees: boolean;
    productAddAction: (productName: string, productCode: string, price: string, productCount: number) => void;
    ProductAddMessage: string;
    urun: productData;
    isAddLoading: boolean;
}

interface productData {
    urunAdi: string;
    urunKodu: string;
    urunFiyati: string;
    productCount: number;
}

const initialValues: productData = {
    urunAdi: "",
    urunKodu: "",
    urunFiyati: "",
    productCount: 0
}

const girdiler = Yup.object().shape({
    urunAdi: Yup.string()
        .min(1)
        .max(30)
        .required(),
    urunKodu: Yup.string()
        .min(1)
        .max(30)
        .required(),
    urunFiyati: Yup.number()
        .positive()
        .required()
        .moreThan(0),
    productCount: Yup.number()
        .positive()
        .required()
        .moreThan(0),
});


class productAdd extends Component<Props, {}> {

    constructor(props: Props) {
        super(props);
        this.state = {

        };
    }
    static navigationOptions = ({ navigation }: Props) => {
        return {
            title: "Ürün Ekle",
            headerStyle: {
                backgroundColor: '#216AF4',
                justifyContent: 'center'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    };
    showSimpleMessage() {
        if (this.props.ProductAddMessage) {

            showMessage({
                message: this.props.ProductAddMessage,
                type: this.props.isSuccees ? "success" : "danger",
                icon: "auto"
            }
            );
        }

    }
    handleCreateProduct(values: productData) {
        const { productAddAction } = this.props;
        productAddAction(values.urunAdi, values.urunKodu, values.urunFiyati, values.productCount);
    };

    _renderButtonText() {
        if (!this.props.isAddLoading) {
            return (<Text style={{ color: 'white', fontFamily: "Avenir Next", fontWeight: 'bold', fontSize: 16 }} >Ekle</Text>);
        }
        return (<Spinner color='01C3E3' />)
    }
    render() {
        if(this.props.isSuccees) {
            this.props.navigation.goBack()
        }
        return (
            <View style={styles.addCustomerContainer}>
                <StatusBar backgroundColor="#2B6EDC" />

                <View style={{ marginBottom: 30 }}></View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <ScrollView bounces={false}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={girdiler}
                            onSubmit={values => this.handleCreateProduct(values)}
                        >
                            {props => {
                                return (
                                    <View style={{marginHorizontal:20}}>
                                        <View style={styles.containerNew} >
                                            <View style={[styles.input,{marginTop:15}]}>
                                                <Item floatingLabel style={{ marginTop: 0, borderBottomColor: (props.touched.urunAdi && props.errors.urunAdi != null) ? 'red' : '#2069F3' }}>
                                                    <Label style={{ color: (props.touched.urunAdi && props.errors.urunAdi != null) ? 'red' : '#959595' }}>Ürün Adı</Label>
                                                    <Input
                                                        style={{ fontFamily: 'Avenir Next', fontSize: 18 }}
                                                        placeholderTextColor="#9A9A9A"
                                                        value={props.values.urunAdi}
                                                        autoCapitalize="words"
                                                        onChangeText={props.handleChange("urunAdi")}
                                                        onBlur={props.handleBlur("urunAdi")}
                                                    />
                                                </Item>
                                            </View>

                                            <View style={[styles.input,{marginTop:15}]}>
                                                <Item floatingLabel style={{ marginTop: 0, borderBottomColor: (props.touched.urunKodu && props.errors.urunKodu != null) ? 'red' : '#2069F3' }}>
                                                    <Label style={{ color: (props.touched.urunKodu && props.errors.urunKodu != null) ? 'red' : '#959595' }}>Ürün Kodu</Label>
                                                    <Input
                                                        style={{ fontFamily: 'Avenir Next', fontSize: 18 }}
                                                        placeholderTextColor="#9A9A9A"
                                                        value={props.values.urunKodu}
                                                        autoCapitalize="words"
                                                        onChangeText={props.handleChange("urunKodu")}
                                                        onBlur={props.handleBlur("urunKodu")}
                                                    />
                                                </Item>

                                            </View>
                                            <View style={[styles.input,{marginTop:15}]}>
                                                <Item floatingLabel style={{ marginTop: 0, borderBottomColor: (props.touched.urunFiyati && props.errors.urunFiyati != null) ? 'red' : '#2069F3' }}>
                                                    <Label style={{ color: (props.touched.urunFiyati && props.errors.urunFiyati != null) ? 'red' : '#959595' }}>Ürün Fiyatı</Label>
                                                    <Input

                                                        style={{ fontFamily: 'Avenir Next', fontSize: 18 }}
                                                        placeholderTextColor="#9A9A9A"
                                                        autoCapitalize="none"
                                                        keyboardType="numeric"
                                                        onChangeText={props.handleChange("urunFiyati")}
                                                        onBlur={props.handleBlur("urunFiyati")}
                                                    />
                                                </Item>

                                            </View>
                                            <View style={[styles.input,{marginTop:15}]}>
                                                <Item floatingLabel style={{ marginTop: 0, borderBottomColor: (props.touched.productCount && props.errors.productCount != null) ? 'red' : '#2069F3' }}>
                                                    <Label style={{ color: (props.touched.productCount && props.errors.productCount != null) ? 'red' : '#959595' }}>Ürün Sayısı</Label>
                                                    <Input
                                                        style={{ fontFamily: 'Avenir Next', fontSize: 18 }}
                                                        placeholderTextColor="#9A9A9A"
                                                        autoCapitalize="none"
                                                        keyboardType="numeric"

                                                        onChangeText={props.handleChange("productCount")}
                                                        onBlur={props.handleBlur("productCount")}
                                                    />
                                                </Item>

                                            </View>
                                            <Button onPress={() => props.handleSubmit()}
                                                style={{
                                                    justifyContent: 'center', marginTop: 30, marginBottom: 30, marginHorizontal: 40, borderRadius: 20, backgroundColor: '#01C3E3',
                                                    shadowRadius: 5.00,
                                                    elevation: 12,
                                                    shadowColor: "#006c7e",
                                                    shadowOffset: { width: 3, height: 3 },
                                                    shadowOpacity: .5,
                                                }}>
                                                {this._renderButtonText()}
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
    isSuccees: state.productAdd.isSuccess,
    ProductAddMessage: state.productAdd.ProductAddMessage,
    isAddLoading: state.productAdd.isAddLoading
})

function bindToAction(dispatch: any) {
    return {
        productAddAction: (productName: string, productCode: string, price: string, productCount: number) =>
            dispatch(productAddAction(productName, productCode, price, productCount))
    };
}

export default connect(mapStateToProps, bindToAction)(productAdd);