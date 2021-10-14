import axios from "axios";
import { Container, Content, Header, Thumbnail } from "native-base";
import React from "react";
import { AsyncStorage, Text, TouchableOpacity, View } from "react-native";
import { TextField } from 'react-native-material-textfield';

export default class LoginScreen extends React.Component {

    state = {
        data: { username: '', password: '' }
    };

    constructor(props) {
        super(props);

        this.onFocus = this.onFocus.bind(this);
        this.login = this.login.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
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

    login() {

        let { data } = this.state;
        let errors = {};

        let username = data['username'];
        let password = data['password'];
        let isError = false;

        if (username === '') {
            errors['username'] = 'Should not be empty';
            isError = true;
        }
        if (password === '') {
            errors['password'] = 'Should not be empty';
            isError = true;
        }

        if (isError) {
            this.setState({ errors });
        } else {
            let url = "https://wanchaicafe.com/api/auth/generate_auth_cookie/?username=" + username + "&password=" + password;
            axios.get(url)
                .then(this.onLoginSuccess)
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    onLoginSuccess(response) {     
        if (response.data.status == "ok") {
            let user = {
                id: response.data.user.id,
                username: response.data.user.firstname,
                mobileNumber: response.data.user.username,
                email: response.data.user.email
            }
            this.saveUser(user)
            this.setState({ data: { username: '', password: '' }, errors: {} })
        } else {
            alert("Login failed!")
        }
    }

    async saveUser(user) {   
        await AsyncStorage.setItem('user', JSON.stringify(user));
        this.props.navigation.navigate('HomeScreenRouter');
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
                    <View style={{ flex: 1, height: '100%', flexDirection: 'column', paddingStart: 30, paddingEnd: 30 }}>
                        <TextField
                            containerStyle={{ height: 70 }}
                            label="Username or Email"
                            value={data.username}
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeText("username")}
                            onSubmitEditing={() => this.password.focus()}
                            ref={(ref) => { this.username = ref }}
                            returnKeyType='next'
                            error={errors.username} />
                        <TextField
                            containerStyle={{ height: 70 }}
                            label="Password"
                            value={data.password}
                            autoCorrect={false}
                            secureTextEntry={true}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeText("password")}
                            ref={(ref) => { this.password = ref }}
                            returnKeyType='next'
                            error={errors.password} />
                        <TouchableOpacity style={{ width: '100%', height: 50, backgroundColor: '#FEF00C', marginTop: 25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={this.login}>
                            <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>LOG IN</Text>
                        </TouchableOpacity>
                        <View style={{ width: '100%', height: 75, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#E0E0E0' }}></View>
                            <Text style={{ marginStart: 10, marginEnd: 10 }}>OR</Text>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#E0E0E0' }}></View>
                        </View>
                        <TouchableOpacity style={{ width: '100%', height: 50, backgroundColor: '#634539', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => this.props.navigation.navigate('Forgot')}>
                            <Text style={{ fontSize: 18, fontWeight: '300', color: 'white' }}>Forgot Username/Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '100%', height: 50, backgroundColor: '#634539', marginTop: 20, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => this.props.navigation.navigate('SignUp')}>
                            <Text style={{ fontSize: 18, fontWeight: '300', color: 'white' }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        );
    }
}