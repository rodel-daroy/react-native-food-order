import { Container, Content, Header, Thumbnail } from "native-base";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TextField } from 'react-native-material-textfield';

export default class SignUpScreen extends React.Component {

    state = {
        data: { username: '', mobileNumber: '', email: '', password: '', confirmPassword: '' }
    };

    constructor() {
        super();

        this.onFocus = this.onFocus.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.signup = this.signup.bind(this);
    }

    onFocus() {

        let { errors = {} } = this.state;

        for (let name in errors) {
            let ref = this[name];
            if (ref && ref.isFocused()) {
                delete errors[name];
            }
        }

        this.setState({ errors });
    }

    onChangeText = (name) => (text) => {
        let { data } = this.state;
        data[name] = text;
        this.setState({ data, errors: {} });
    }

    signup() {

        let { data } = this.state;
        let errors = {};

        let username = data['username'];
        let mobileNumber = data['mobileNumber'];
        let email = data['email'];
        let password = data['password'];
        let confirmPassword = data['confirmPassword'];
        let isError = false;

        if (username === '') {
            errors['username'] = 'Should not be empty';
            isError = true;
        }
        if (mobileNumber === '') {
            errors['mobileNumber'] = 'Should not be empty';
            isError = true;
        }
        if (email === '') {
            errors['email'] = 'Should not be empty';
            isError = true;
        }
        if (password === '') {
            errors['password'] = 'Should not be empty';
            isError = true;
        }
        if (confirmPassword === '') {
            errors['confirmPassword'] = 'Should not be empty';
            isError = true;
        }
        if (!this.validate(email)) {
            errors['email'] = 'Email is not correct';
            isError = true;
        }
        if (password.length < 6) {
            errors['password'] = 'Too short';
            isError = true;
        }
        if (password != confirmPassword) {
            errors['confirmPassword'] = 'Not match password';
            isError = true;
        }

        if (isError) {
            this.setState({ errors });
        } else {
            fetch("https://api.authy.com/protected/json/phones/verification/start", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Authy-API-Key': '7B4TGWr5UbsvrhTl3oLIxxRteH8r3FTA',
                },
                body: JSON.stringify({
                    "via": 'sms',
                    "phone_number": mobileNumber,
                    "country_code": 65,
                    "code_length": 4,
                    "locale": 'en'
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {        
                    if (responseJson.success) {
                        alert(responseJson.message)
                        this.props.navigation.navigate('Verify', {
                            _username: username,
                            _mobileNumber: mobileNumber,
                            _email: email,
                            _password: password
                        })
                    } else {
                        alert("Phone number is invalid")
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) { return false; }
        else { return true; }
    }

    render() {

        let { errors = {}, data = {} } = this.state;

        return (
            <Container>
                <Header style={{ backgroundColor: 'white', height: 50, elevation: 0 }} />
                <Content contentContainerStyle={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Thumbnail square source={require('../../assets/logo.png')} style={{ width: 150, height: 150, resizeMode: 'contain' }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '700', fontSize: 24 }}>Sign Up</Text>
                        </View>
                        <ScrollView style={{ paddingStart: 30, paddingEnd: 30 }}>
                            <TextField
                                containerStyle={{ height: 65 }}
                                label="Name"
                                value={data.username}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText("username")}
                                onSubmitEditing={() => this.mobileNumber.focus()}
                                ref={(ref) => { this.username = ref }}
                                returnKeyType='next'
                                error={errors.username} />
                            <TextField
                                containerStyle={{ height: 65 }}
                                label="Mobile Number"
                                value={data.mobileNumber}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText("mobileNumber")}
                                onSubmitEditing={() => this.email.focus()}
                                ref={(ref) => { this.mobileNumber = ref }}
                                returnKeyType='next'
                                error={errors.mobileNumber} />
                            <TextField
                                containerStyle={{ height: 65 }}
                                label="Email"
                                value={data.email}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onChangeText={this.onChangeText("email")}
                                onSubmitEditing={() => this.password.focus()}
                                ref={(ref) => { this.email = ref }}
                                returnKeyType='next'
                                error={errors.email} />
                            <TextField
                                containerStyle={{ height: 65 }}
                                label="Password"
                                value={data.password}
                                autoCorrect={false}
                                secureTextEntry={true}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText("password")}
                                onSubmitEditing={() => this.confirmPassword.focus()}
                                ref={(ref) => { this.password = ref }}
                                returnKeyType='next'
                                error={errors.password} />
                            <TextField
                                containerStyle={{ height: 65 }}
                                label="Confirm Password"
                                value={data.confirmPassword}
                                autoCorrect={false}
                                secureTextEntry={true}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText("confirmPassword")}
                                ref={(ref) => { this.confirmPassword = ref }}
                                returnKeyType='next'
                                error={errors.confirmPassword} />
                            <TouchableOpacity style={{ width: '100%', height: 50, backgroundColor: '#FEF00C', marginTop: 25, marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}
                                onPress={this.signup}>
                                <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>Sign Up</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </Content>
            </Container>
        );
    }
}