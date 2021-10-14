import { Container, Content, Header, Thumbnail } from "native-base";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TextField } from 'react-native-material-textfield';

export default class ForgotScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            email: ''
        };
    }

    forgot = () => {

        fetch("https://wanchaicafe.com/wp-json/wp/v2/users/lostpassword", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_login": this.state.email
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.code == "200") {
                    alert("Reset password link had been sent to your email.")
                    this.props.navigation.navigate('Login')
                } else {
                    alert("Retry")
                }
            })
            .catch((error) => {
                console.error(error);
            });
        this.props.navigation.navigate('Login')
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
                            <Text style={{ fontWeight: '700', fontSize: 24 }}>Forgot Password</Text>
                            <Text style={{ marginTop: 10, textAlign: 'center' }}>Please enter the email you used to register.{'\n'} We will send a password recovery link to that email.</Text>
                        </View>
                        <TextField
                            label="Email"
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            value={this.state.email}
                            onChangeText={(text) => this.setState({ email: text })}
                            returnKeyType='next' />
                        <TouchableOpacity style={{ width: '100%', height: 50, backgroundColor: '#FEF00C', marginTop: 25, alignItems: 'center', justifyContent: 'center' }}
                            onPress={this.forgot}>
                            <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        );
    }
}