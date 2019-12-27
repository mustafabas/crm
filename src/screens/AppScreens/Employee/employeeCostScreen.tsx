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
  Alert,
} from "react-native";
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation";
import styles from "../../../pages/styles";
import { GetEmployeeCost } from "../../../redux/actions/getEmployeeCostAction";
import { AppState } from "../../../redux/store";
import { IEmployeeCostItem } from "../../../redux/models/employeeCostModel";
import RBSheet from "react-native-raw-bottom-sheet";
import { employeeCostDelete } from "../../../redux/actions/deleteEmployeeCostAction";
import { Icon, Card, CardItem, Body } from "native-base";
import { connect } from "react-redux";


interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isLoading: boolean;
  employeeCosts: IEmployeeCostItem[];
  GetEmployeeCost: () => void;
  employeeCostDelete: (id: number) => void;
}

interface State {
  modalVisible: boolean;
  refreshing: boolean;
  id: number;
  employeId: number;
  cost: number;
}

class employeeCostScreen extends Component<Props, State> {



  static navigationOptions = ({ navigation }: Props) => {
    return {

      title: 'Çalışan Giderleri',
      headerStyle: {
        backgroundColor: '#2B6EDC',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },

    }


  };


  AmountSheet: any;
  DeleteSheet : any;
  constructor(props: Props) {
    super(props);
    this.state = {
      modalVisible: false,
      refreshing: false,
      id: 0,
      employeId: 0,
      cost: 0,
    };
  }


  componentWillMount() {
    this.props.GetEmployeeCost();
    this.setState({ refreshing: false });
  }


  openModal(id: number, employeId: number, cost: number) {
    this.setState({
      id: id,
      employeId: employeId,
      cost: cost,
    });
    this.AmountSheet.open();
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }


  deleteSelectedCost() {
    const { employeeCostDelete } = this.props;
    employeeCostDelete(this.state.id);
  }

  _renderProductSheetContent() {
    return (<View style={styles.SheetContainer}>
      <TouchableOpacity style={styles.SheetItemContainer}
        onPress={() => {
          this.AmountSheet.close();
          this.editProduct();
        }}>
        <Icon name="ios-arrow-round-forward"  style={styles.SheetItemIcon}></Icon>
        <Text style={styles.SheetItemText}
        >Düzenle</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.SheetItemContainer}
        onPress={() => {
          this.AmountSheet.close();
     
            this.DeleteSheet.open();
        }}>
        <Icon name="ios-trash" style={styles.SheetItemIcon}></Icon>
        <Text style={styles.SheetItemText}
        >Sil</Text>
      </TouchableOpacity>
    </View>);

  }
  _renderDeleteSheetContent() {
    return (<View style={styles.SheetContainer}>
      <TouchableOpacity style={styles.SheetItemContainer}
        onPress={() => {
          this.DeleteSheet.close();
          this.deleteSelectedCost();
        }}>
        <Icon name="ios-trash"  style={styles.SheetItemIcon}></Icon>
        <Text style={styles.SheetItemText}
        >Sil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.SheetItemContainer}
        onPress={() => {
          this.DeleteSheet.close();
        }}>
        <Icon name="ios-close"  style={styles.SheetItemIcon}></Icon>
        <Text style={styles.SheetItemText}
        >Vazgeç</Text>
      </TouchableOpacity>
    </View>);

  }

  editProduct() {
    this.closeModal();
    this.props.navigation.navigate("EditEmployeeCost",
      {
        id: this.state.id,
        cost: this.state.cost,
        employeId: this.state.employeId,
      })

  }

  onRefresh() {
    this.setState({ refreshing: true });
  }

  _renderView() {
    const { employeeCosts, isLoading, navigation } = this.props;
    if (isLoading) {
      return (<ActivityIndicator></ActivityIndicator>);
    }
    else {
      if(this.props.employeeCosts.length>0){
             return (<FlatList
        refreshing={this.state.refreshing}
        onRefresh={() => this.onRefresh()}
        data={this.props.employeeCosts}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.row_cell5}>
              <View style={styles.row_cell7}>
                <Text style={styles.musteri_adi}>{item.employeName}</Text>
                <Text style={styles.alt_bilgi}>Tarih: {item.createdDate.slice(8, 10) + "." +
                  item.createdDate.slice(5, 7) + "." +
                  item.createdDate.slice(0, 4) + " " + item.createdDate.slice(11, 13) + ":" + item.createdDate.slice(14, 16)}</Text>
              </View>
              <View style={styles.row_cell2}>
                <Text style={styles.productUrunfiyatText}>Gider: {item.cost} TL</Text>
              </View>
              <View style={styles.row_cell6}>
                <TouchableOpacity
                  style={styles.iconButtonOrder}
                  onPress={() => this.openModal(item.id, item.employeId, item.cost)}>
                  <Icon name="md-more" color={"#C4B47B"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>)}
        keyExtractor={item => item.createdDate.toString()}
      />);
      }
      else{
        return (<View > 

          <Card style={{borderColor:'#f5f5f5'}}>
   
            <CardItem>
              <Body style={{ flexDirection:"column", justifyContent:"center", alignItems:"center"}} >
                <Icon name="ios-information-circle-outline" style={{fontSize:40,}} ></Icon>
                <Text>                  
                  Sisteme eklediğiniz herhangi bir maliyet bulunmamaktadır.
              </Text>
              </Body>
            </CardItem>
          </Card>
      
      </View>);
      }
 
    }
  }
  render() {
    return (
      <View style={styles.containerNew}>
        <StatusBar backgroundColor="#2B6EDC" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Modal
            visible={this.state.modalVisible}
            animationType={'slide'}
            onRequestClose={() => this.closeModal()}
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                <TouchableOpacity style={styles.modalCancelButtonContainer}
                  onPress={() => this.closeModal()}>
                  <Icon name="md-close"  color={"#6E6E6E"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalEditButtonContainer}
                  onPress={() => this.editProduct()}>
                  <Text style={styles.modalEditButtonText}
                  >Düzenle</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <RBSheet
            ref={ref => {
              this.AmountSheet = ref;
            }}
            height={150}
            duration={100}
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
            {this._renderProductSheetContent()}
          </RBSheet>
          <RBSheet
            ref={ref => {
              this.DeleteSheet = ref;
            }}
            height={150}
            duration={100}
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
            {this._renderDeleteSheetContent()}
          </RBSheet>

          <View style={{ marginTop: 10 }}></View>
        </KeyboardAvoidingView>
        {this._renderView()}
      </View>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isHomeLoading: state.getEmployeeCost.isLoading,
  employeeCosts: state.getEmployeeCost.employees,
})
function bindToAction(dispatch: any) {
  return {
    GetEmployeeCost: () =>
      dispatch(GetEmployeeCost()),
    employeeCostDelete: (id: number) =>
      dispatch(employeeCostDelete(id))
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(employeeCostScreen);
