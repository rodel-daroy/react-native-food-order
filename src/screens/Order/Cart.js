import axios from "axios";
import { Body, Button, Container, Content, Footer, Header, Icon, Left, Radio, Right, SwipeRow, Thumbnail } from "native-base";
import React from 'react';
import { AsyncStorage, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import BackIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

class CartScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {},
            carts: [],
            totalprice: 0,
            visible: false,
            selected1: false,
            selected2: true,
            promoCode: '',
            time: '',
            disabled: false,
            disabledPromo: false
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', this.flag);
    }

    flag = () => {
        let flag = this.props.navigation.state.params.flag;
        if (flag == "Entree") {
            this.setState({ carts: [] }, () => { this.load() })
        }
    }

    load = () => {
        this.getTime()
        this.getUser()
        for (let i = 0; i < this.props.pTotalPrices.length; i++) {
            let temp = {
                "id": this.props.pIds[i],
                "quantity": this.props.pQuantities[i],
                "name": this.props.pNames[i],
                "description": this.props.pDescriptions[i],
                "totalprice": this.props.pTotalPrices[i]
            }
            this.state.carts.push(temp)
        }

        let tempPrice = 0;
        for (let i = 0; i < this.props.pTotalPrices.length; i++) {
            tempPrice = tempPrice + parseInt(this.props.pTotalPrices[i].value);
        }
        this.setState({ totalprice: tempPrice })
    }

    async getUser() {
        let user = await AsyncStorage.getItem('user');
        this.setState({ user: JSON.parse(user) })
    }

    remove(item) {
        const newCarts = this.state.carts.filter(cart => { return cart !== item })
        this.setState({ carts: [...newCarts] })
        let updatedTotalPrice = parseInt(this.state.totalprice) - parseInt(item.totalprice.value)
        this.setState({ totalprice: updatedTotalPrice })
    }

    order = () => {

        this.setState({ disabled: true })
        this.setState({ visible: false })

        let line_items = [];
        for (let i = 0; i < this.state.carts.length; i++) {
            let temp = {
                "product_id": this.state.carts[i].id.value,
                "quantity": this.state.carts[i].quantity.value,
                "meta_data": [
                    {
                        "key": "Note",
                        "value": this.state.carts[i].description.value
                    }
                ]
            }
            line_items.push(temp)
        }

        orders = {
            "payment_method": "cod",
            "payment_method_title": "Cash On Delivery",
            "customer_id": this.state.user.id,
            "billing": {
                "first_name": this.state.user.username,
                "email": this.state.user.email,
                "phone": this.state.user.mobileNumber
            },
            "line_items": line_items,
        }

        fetch("https://api.authy.com/protected/json/phones/verification/start", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Authy-API-Key': '7B4TGWr5UbsvrhTl3oLIxxRteH8r3FTA',
            },
            body: JSON.stringify({
                "via": 'sms',
                "phone_number": this.state.user.mobileNumber,
                "country_code": 65,
                "code_length": 4,
                "locale": 'en'
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success) {
                    this.setState({ disabled: false })
                    alert(responseJson.message)
                    this.props.navigation.navigate('OrderVerify', {
                        _orders: JSON.stringify(orders)
                    })
                } else {
                    this.setState({ disabled: false })
                    alert("Phone number is invalid")
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    selected1 = () => {
        if (this.state.selected1) {
            this.setState({ selected1: false, selected2: true })
        } else {
            this.setState({ selected1: true, selected2: false })
        }
    }

    selected2 = () => {
        if (this.state.selected2) {
            this.setState({ selected1: true, selected2: false })
        } else {
            this.setState({ selected1: false, selected2: true })
        }
    }

    getTime() {

        let date = new Date();
        let timeType = ''

        let hours = date.getHours();
        let minutes = date.getMinutes();

        if (hours <= 11) { timeType = 'AM'; }
        else { timeType = 'PM'; }

        if (hours > 12) {
            hours = hours - 12;
        }

        if (hours == 0) {
            hours = 12;
        }

        function makeTwoDigits(time) {
            const timeString = `${time}`;
            if (timeString.length === 2) return time
            return `0${time}`
        }

        let current = `${makeTwoDigits(hours)}:${makeTwoDigits(minutes)}` + timeType;
        this.setState({ time: current })
    }

    promoCode = () => {

        const url = 'https://wanchaicafe.com/wp-json/wc/v3/coupons?consumer_key=ck_9638edaefc3e0d4bb1ef8185a6dd9706ba217599&consumer_secret=cs_70afa1f240cc1a083a96f2f826555ed3607b2438'

        let check = false

        axios.get(url).then(response => {
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].code == this.state.promoCode) {
                    if (response.data[i].discount_type == "percent") {
                        let updatePrice = this.state.totalprice * ((100 - response.data[i].amount) / 100);
                        this.setState({ totalprice: updatePrice })
                    }
                    if (response.data[i].discount_type == "fixed_cart") {
                        let updatePrice = this.state.totalprice - response.data[i].amount;
                        this.setState({ totalprice: updatePrice })
                    }
                    check = true;
                    this.setState({ disabledPromo: true })
                }
            }
            if (!check) {
                alert("Promo Code failed, Please retry")
                this.setState({ disabledPromo: false })
            }
        }).catch(err => {
            console.log(err.error);
        })
    }

    renderItem = ({ item }) => {
        return (
            <SwipeRow
                style={{ height: 60, borderBottomWidth: 0 }}
                // leftOpenValue={75}
                // left={
                //     <Button success onPress={() => alert('Add')}>
                //         <Icon active name="add" />
                //     </Button>
                // }
                rightOpenValue={-60}
                right={
                    <Button danger onPress={() => this.remove(item)}>
                        <Icon active name="trash" />
                    </Button>
                }
                body={
                    <View style={{ height: 60, width: '100%', backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E5E9F2', flexDirection: 'row' }}>
                        <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 20 }}>{item.quantity.value}x</Text>
                        </View>
                        <View style={{ flex: 6, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 20 }}>{item.name.value}</Text>
                        </View>
                        <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 18 }}>${parseFloat(item.totalprice.value).toFixed(2)}</Text>
                        </View>
                    </View>
                }
            />
        );
    };

    render() {
        return (
            <Container>
                <Header style={{ height: 80, backgroundColor: 'white', flexDirection: 'row' }}>
                    <Left>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Entree')}>
                            <BackIcon name="chevron-left" size={20} color="black" />
                            <Text style={{ fontSize: 18, marginStart: 5 }}>Back</Text>
                        </TouchableOpacity>
                    </Left>
                    <Body style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Image source={require('../../assets/logo.png')} style={{ width: 60, height: 60 }} />
                    </Body>
                    <Right />
                </Header>
                <Content contentContainerStyle={{ flex: 1, flexDirection: 'column' }}>
                    <FlatList
                        style={{ marginTop: 10 }}
                        data={this.state.carts}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.name.value}
                    />
                </Content>
                <Footer style={{ height: 300, backgroundColor: 'white', flexDirection: 'column' }}>
                    <View style={{ width: '100%', height: 50, borderTopColor: 'lightgray', borderTopWidth: 1, borderBottomColor: 'lightgray', borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20 }}>COLLECTION TIME: {this.state.time}</Text>
                    </View>
                    <View style={{ width: '100%', height: 150, flexDirection: 'column' }}>
                        <TouchableOpacity
                        //onPress={this.selected1}
                        >
                            <View style={{ width: '100%', height: 50, flexDirection: 'row', borderBottomColor: 'lightgray', borderBottomWidth: 1 }}>
                                <View style={{ flex: 5, flexDirection: 'row', alignItems: 'center' }}>
                                    <Radio selected={this.state.selected1} style={{ marginStart: 15 }} />
                                    <Text style={{ marginStart: 15, fontSize: 18 }}>Delivery</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>$3.00</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                        //onPress={this.selected2}
                        >
                            <View style={{ width: '100%', height: 50, flexDirection: 'row', borderBottomColor: 'lightgray', borderBottomWidth: 1 }}>
                                <View style={{ flex: 5, flexDirection: 'row', alignItems: 'center' }}>
                                    <Radio selected={this.state.selected2} style={{ marginStart: 15 }} />
                                    <Text style={{ marginStart: 15, fontSize: 18 }}>Self Collection</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>FREE</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: '100%', height: 50, flexDirection: 'row', borderBottomColor: 'lightgray', borderBottomWidth: 1 }}>
                            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <TextInput style={{ width: '80%', height: 35, borderBottomColor: 'lightgray', borderBottomWidth: 1, textAlign: 'center', fontSize: 16, padding: 0 }}
                                    onChangeText={(text) => this.setState({ promoCode: text.toLowerCase() })}
                                    value={this.state.prowmoCode} />
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={this.promoCode} disabled={this.state.disabledPromo}>
                                    <Text style={{ backgroundColor: 'yellow', fontSize: 16, fontWeight: '500', padding: 5 }}>APPLY</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 18 }}>Promo Code</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: '100%', height: 50, alignItems: 'center', justifyContent: 'center' }}>
                        {this.state.selected1 ?
                            <Text style={{ fontWeight: '500', fontSize: 22 }}>Total Price: ${parseFloat(this.state.totalprice + 3).toFixed(2)}</Text>
                            :
                            <Text style={{ fontWeight: '500', fontSize: 22 }}>Total Price: ${parseFloat(this.state.totalprice).toFixed(2)}</Text>
                        }
                    </View>
                    <View style={{ width: '100%', height: 50 }}>
                        <TouchableOpacity style={{ flex: 1, backgroundColor: '#3E1C0C', alignItems: 'center', justifyContent: 'center', margin: 2.5, borderRadius: 10 }}
                            //onPress={() => this.setState({ visible: true })}
                            onPress={this.order}
                            disabled={this.state.disabled}>
                            <Text style={{ fontWeight: '700', fontSize: 22, color: 'white' }}>Confirm Order</Text>
                        </TouchableOpacity>
                    </View>
                </Footer>
                <Modal style={{ alignItems: 'center', justifyContent: 'center' }}
                    isVisible={this.state.visible}
                    animationInTiming={500}
                    animationOutTiming={500}
                    backdropTransitionInTiming={500}
                    backdropTransitionOutTiming={500}>
                    <View style={{ width: 350, height: 420, backgroundColor: 'white', borderRadius: 20, flexDirection: 'column' }}>
                        <View style={{ width: '100%', height: 300 }}>
                            <Thumbnail square source={require('../../assets/map.jpg')} style={{ width: '100%', height: '100%' }} />
                        </View>
                        <View style={{ width: '100%', height: 120, flexDirection: 'column' }}>
                            <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: 'lightgray', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontSize: 18 }}>Delivery only to Hong Kong Island!</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <TouchableOpacity style={{ flex: 1, borderRightWidth: 1, borderRightColor: 'lightgray', alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => this.setState({ visible: false })}>
                                    <Text style={{ fontSize: 20, fontWeight: '500', color: 'black' }}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                                    onPress={this.order}>
                                    <Text style={{ fontSize: 20, fontWeight: '500', color: 'black' }}>Ok</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </Container >
        );
    }
}

const mapStateToProps = state => ({
    pIds: state.product.pIds,
    pQuantities: state.product.pQuantities,
    pNames: state.product.pNames,
    pDescriptions: state.product.pDescriptions,
    pTotalPrices: state.product.pTotalPrices
})

export default connect(mapStateToProps)(CartScreen)