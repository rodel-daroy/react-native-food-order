import { Container, Content, Header, Thumbnail } from "native-base";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as order_stateActions from '../../services/actions/order_state';
import * as productActions from '../../services/actions/product';

class OrderVerifyScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            orders: {},
            orderID: 0,
            verifyCode: '',
            isModalVisible: false
        };
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', this.getUserInfo);
    }

    getUserInfo = () => {
        let orders = this.props.navigation.state.params._orders
        this.setState({ orders: JSON.parse(orders) }, function () {
            console.log(this.state.orders)
        })
    }

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible })

    verify = () => {

        let url = "https://api.authy.com/protected/json/phones/verification/check?country_code=65&phone_number=" + this.state.orders.billing.phone + "&verification_code=" + this.state.verifyCode;

        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Authy-API-Key': '7B4TGWr5UbsvrhTl3oLIxxRteH8r3FTA',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {              
                if (responseJson.success) {
                    this.order()
                } else {
                    alert("Verification code is not correct")
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    order() {

        url = 'https://wanchaicafe.com/wp-json/wc/v3/orders?consumer_key=ck_9638edaefc3e0d4bb1ef8185a6dd9706ba217599&consumer_secret=cs_70afa1f240cc1a083a96f2f826555ed3607b2438'

        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.orders),
        }).then((response) => response.json())
            .then((responseJson) => {              
                this.setState({ orderID: responseJson.id })
                let count = this.props.count + 1;
                this.props.order_actions.orderState(count);
                this.props.product_actions.resetProduct()
                this.setState({ isModalVisible: true })
            })
            .catch((error) => {
                console.error(error);
                alert('Failure')
            });
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: 'white', height: 50, elevation: 0 }} />
                <Content contentContainerStyle={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Thumbnail square source={require('../../assets/logo.png')} style={{ width: 150, height: 150, resizeMode: 'contain' }} />
                    </View>
                    <View style={{ flex: 1, paddingStart: 30, paddingEnd: 30 }}>
                        <View style={{ marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '700', fontSize: 24, textAlign: 'center' }}>Verify Phone Number{'\n'}to confirm order</Text>
                            <Text style={{ marginTop: 10, fontSize: 20 }}>+852 6123 4567</Text>
                        </View>
                        <View style={{ marginTop: 25, padding: 20, alignItems: 'center' }}>
                            <SmoothPinCodeInput
                                placeholder=""
                                cellStyle={{ borderRadius: 5, backgroundColor: '#E4E8F2' }}
                                cellSize={60}
                                cellSpacing={15}
                                codeLength={4}
                                keyboardType='number-pad'
                                value={this.state.verifyCode}
                                onTextChange={verifyCode => this.setState({ verifyCode })} />
                        </View>
                        <TouchableOpacity style={{ width: '100%', height: 50, backgroundColor: '#FEF00C', marginTop: 25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={this.verify}>
                            <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>Verify</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal style={{ alignItems: 'center', justifyContent: 'center' }}
                        isVisible={this.state.isModalVisible}
                        animationInTiming={1000}
                        animationOutTiming={1000}
                        backdropTransitionInTiming={1000}
                        backdropTransitionOutTiming={1000}>
                        <View style={{ width: 300, height: 150, backgroundColor: 'white', borderRadius: 20, flexDirection: 'column' }}>
                            <View style={{ flex: 2, borderBottomWidth: 1, borderBottomColor: 'lightgray', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Order Successful!</Text>
                                <Text style={{ textAlign: 'center', fontSize: 16, }}>Congratulations! Your order has been {'\n'} successfully placed!</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: 'lightgray', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ isModalVisible: false }), this.props.navigation.navigate('Cart', {
                                            flag: "OrderVerify"
                                        })
                                    }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => { this.setState({ isModalVisible: false }), this.props.navigation.navigate('ViewOrder', { orderID: this.state.orderID }) }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>View Order</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    count: state.order_state.count
})

const mapDispatchToProps = dispatch => ({
    order_actions: bindActionCreators(order_stateActions, dispatch),
    product_actions: bindActionCreators(productActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderVerifyScreen)