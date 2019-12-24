import React, { Component } from "react";
import {
    View,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    TouchableOpacity,
    StatusBar,
    Alert,
    AsyncStorage,
} from "react-native";
import { NavigationScreenProp, NavigationState, } from "react-navigation";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./../../../pages/styles";
import { employeeAdd } from "../../../redux/actions/employeeAddAction";
import { AppState } from '../../../redux/store'
import { connect } from "react-redux";
import { IEmployeeItem } from "../../../redux/models/addEmployeeModel";
import { IUserItem } from "../../../redux/models/addUserModel";
import { AddUser } from "../../../redux/actions/addUserAction"
import { Item, Label, Input, Textarea, Button } from "native-base";

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
    isSuccees: boolean;
    EmployeeAddMessage: string;
    employee: IEmployeeItem;
    user: IUserItem;
    employeeAdd: (nameSurname: string, monthlySalary: number, email: string, password: string) => void;
    AddUser: (nameSurname: string, mail: string, password: string) => void;
}

interface State {
    UserType: string | null
}

interface multi extends IEmployeeItem, IUserItem { }

const initialValues: multi = {
    nameSurname: "",
    monthlySalary: "",
    mail: "",
    password: "",
    phoneNumber: "",
    identityNumber: "",
    address: ""
}

const girdiler = Yup.object().shape({
    nameSurname: Yup.string()
        .matches(/./g, " ")
        .min(3, "*Çalışan adı 3 karakterden kısa olamaz!")
        .max(30, "*Çalışan adı 30 karakterden uzun olamaz!")
        .required("*Zorunlu Alan"),
    monthlySalary: Yup.number()
        .positive("Pozitif değer giriniz!")
        .required("*Zorunlu Alan")
        .moreThan(0, "Sıfırdan büyük olmalıdır!"),
    mail: Yup.string()
        .email("E-posta Giriniz!")
        .min(3, "*E-posta 3 karakterden kısa olamaz!")
        .max(30, "*E-posta 30 karakterden uzun olamaz!"),
    password: Yup.string()
        .min(3, "*Şifre 3 karakterden kısa olamaz!")
        .max(30, "*Şifre 30 karakterden uzun olamaz!"),
});


class addEmployee extends Component<Props, State> {
    static navigationOptions = ({ navigation }: Props) => {
        return {
            title: 'Çalışan Ekle',
            headerStyle: {
                backgroundColor: '#216AF4',
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
            UserType: "",
        };
    }

    handleAlert() {

        this.props.navigation.navigate("Employee");
        Alert.alert(
            //title
            'Çalışan Ekleme Başarılı!',
            //body
            '',
            [
                { text: 'Tamam' }
            ],
            { cancelable: false }
        );
    }

    componentWillMount() {
        this.getUserType();
    }

    handleAddEmployee(values: multi) {
        const { employeeAdd, AddUser } = this.props;
        employeeAdd(values.nameSurname, Number(values.monthlySalary), values.mail, values.password);
        // if (values.mail != "" && values.password != "") {
        //     AddUser(values.nameSurname, values.mail, values.password);
        // }
        this.handleAlert();
    };

    getUserType() {
        //function to make three option alert
        AsyncStorage.getItem("UserType").then((value) => {
            this.setState({
                UserType: value,
            })
        });
    }

    render() {
        if (this.state.UserType === "2") {
            return (<View style={styles.musteribulunamadiContainer}>
                <Text style={styles.musteribulunamadiText}>Bu Sayfaya Erişim İzniniz Yok</Text>
            </View>);
        }
        else {
            return (
                <View style={styles.addCustomerContainer}>
                    <StatusBar backgroundColor="#2B6EDC" />
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                        <ScrollView bounces={false} >
                            <Formik
                                initialValues={initialValues}
                                validationSchema={girdiler}
                                onSubmit={values => this.handleAddEmployee(values)}
                            >
                                {({ values, errors, handleChange, handleBlur, handleSubmit, resetForm, touched, setFieldValue }) => {
                                    const propsNew = { trackColor: { true: "#2069F3", false: null } }
                                    return (
                                        <View style={styles.containerNew} >
                                            <View style={styles.input}>
                                                <Item floatingLabel style={{ marginTop: 0, borderBottomColor: (touched.nameSurname && errors.nameSurname != null) ? 'red' : '#2069F3' }}>
                                                    <Label style={{ color: (touched.nameSurname && errors.nameSurname != null) ? 'red' : '#959595' }}>Adı Soyadı</Label>
                                                    <Input
                                                        style={{ fontFamily: 'Avenir Next', fontSize: 18 }}
                                                        placeholderTextColor="#9A9A9A"
                                                        value={values.nameSurname}
                                                        autoCapitalize="words"
                                                        onChangeText={handleChange("nameSurname")}
                                                        onBlur={handleBlur("nameSurname")}
                                                    />
                                                </Item>
                                            </View>
                                            <View style={styles.input}>

                                                <Item floatingLabel style={{ marginTop: 15, borderBottomColor: (touched.identityNumber && errors.identityNumber != null) ? 'red' : '#2069F3' }}>
                                                    <Label style={{ color: (touched.identityNumber && errors.identityNumber != null) ? 'red' : '#959595' }}>Şirket Adı</Label>
                                                    <Input
                                                        placeholderTextColor="#9A9A9A"
                                                        value={values.identityNumber}
                                                        keyboardType="number-pad"
                                                        autoCapitalize="words"
                                                        onChangeText={handleChange("identityNumber")}
                                                        onBlur={handleBlur("identityNumber")}
                                                    />
                                                </Item>
                                                <Item floatingLabel style={{ marginTop: 15, borderBottomColor: (touched.phoneNumber && errors.phoneNumber != null) ? 'red' : '#2069F3' }}>
                                                    <Label style={{ color: (touched.phoneNumber && errors.phoneNumber != null) ? 'red' : '#959595' }}>Telefon Numarası</Label>
                                                    <Input
                                                        keyboardType="phone-pad"
                                                        placeholderTextColor="#9A9A9A"
                                                        value={values.phoneNumber}
                                                        autoCapitalize="words"
                                                        onChangeText={handleChange("phoneNumber")}
                                                        onBlur={handleBlur("phoneNumber")}
                                                    />
                                                </Item>
                                          
                                                <Textarea style={{ marginTop: 15, borderBottomWidth: 1, borderBottomColor: (touched.address && errors.address != null) ? 'red' : '#2069F3' }} rowSpan={5}
                                                    // underline
                                                    value={values.address}
                                                    autoCapitalize="words"
                                                    placeholderTextColor={(touched.address && errors.address != null) ? 'red' : '#959595'}
                                                    onChangeText={handleChange("address")}
                                                    onBlur={handleBlur("address")}

                                                    placeholder="Adres" />
                                             
                                            </View>

                                            <Button onPress={() => { handleSubmit() }}
                                                style={{
                                                    justifyContent: 'center', marginTop: 30, marginBottom: 30, marginHorizontal: 40, borderRadius: 20, backgroundColor: '#01C3E3',
                                                    shadowRadius: 5.00,
                                                    elevation: 12,
                                                    shadowColor: "#006c7e",
                                                    shadowOffset: { width: 3, height: 3 },
                                                    shadowOpacity: .5,
                                                }}>
                                                <Text style={{ color: 'white', fontFamily: "Avenir Next", fontWeight: 'bold', fontSize: 16 }} >Ekle</Text>
                                            </Button>
                                        </View>
                                    );
                                }}
                            </Formik>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            );
        }
    }
}

const mapStateToProps = (state: AppState) => ({
    isSuccees: state.addEmployee.isSuccess,
    EmployeeAddMessage: state.addEmployee.EmployeeAddMessage,
    isSucceesUser: state.addUser.isSuccess,
})

function bindToAction(dispatch: any) {
    return {
        employeeAdd: (nameSurname: string, monthlySalary: number, mail: string, password: string) =>
            dispatch(employeeAdd(nameSurname, monthlySalary, mail, password)),
        AddUser: (nameSurname: string, mail: string, password: string) =>
            dispatch(AddUser(nameSurname, mail, password)),
    };
}

export default connect(mapStateToProps, bindToAction)(addEmployee);