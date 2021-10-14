import { Body, Button, Header, Icon, Left, Right } from "native-base";
import React from 'react';
import { Image } from "react-native";

class _Header extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Header style={{ height: 80, backgroundColor: 'white' }}>
                <Left>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.openDrawer()}>
                        <Icon ios='ios-menu' android="md-menu" style={{ fontSize: 35, color: 'black' }} />
                    </Button>
                </Left>
                <Body style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                    <Image source={require('../../assets/logo.png')} style={{ width: 60, height: 60 }} />
                </Body>
                <Right />
            </Header>
        )
    }
}

export default _Header
