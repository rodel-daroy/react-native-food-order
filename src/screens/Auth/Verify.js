import { Container, Content, Header, Thumbnail } from "native-base";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

export default class VerifyScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            username: '',
            mobileNumber: '',
            email: '',
            password: '',
            verifyCode: ''
        };
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', this.getUserInfo);
    }

    getUserInfo = () => {
        let _username = this.props.navigation.state.params._username
        this.setState({ username: _username })
        let _mobileNumber = this.props.navigation.state.params._mobileNumber
        this.setState({ mobileNumber: _mobileNumber }, function () {
            console.log(this.state.mobileNumber)
        })
        let _email = this.props.navigation.state.params._email
        this.setState({ email: _email })
        let _password = this.props.navigation.state.params._password
        this.setState({ password: _password })
    }

    verify = () => {

        let url = "https://api.authy.com/protected/json/phones/verification/check?country_code=65&phone_number=" + this.state.mobileNumber + "&verification_code=" + this.state.verifyCode;

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
                    this.register()
                } else {
                    alert("Verification code is not correct")
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    register() {
        fetch("https://wanchaicafe.com/wp-json/wc/v3/customers?consumer_key=ck_9638edaefc3e0d4bb1ef8185a6dd9706ba217599&consumer_secret=cs_70afa1f240cc1a083a96f2f826555ed3607b2438", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "first_name": this.state.username,
                "username": this.state.mobileNumber,
                "email": this.state.email,
                "password": this.state.password,
                "billing": {
                    "first_name": this.state.username,
                    "email": this.state.email,
                    "phone": this.state.mobileNumber
                }
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {              
                if (JSON.stringify(responseJson).indexOf("status") > -1) {
                    alert("Signup failed")
                } else {
                    this.props.navigation.navigate('Login')
                }
            })
            .catch((error) => {
                console.error(error);
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
                        <View style={{ marginTop: 25, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '700', fontSize: 24 }}>Verify Phone Number</Text>
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
                </Content>
            </Container>
        );
    }
}