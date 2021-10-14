import { Container, Content, List, ListItem, Text } from "native-base";
import React from 'react';
import { TouchableOpacity, View } from "react-native";

const routes = ["Home", "Menu", "Rewards", "MyOrders"];

export default class SideBar extends React.Component {
    render() {
        return (
            <Container>
                <Content style={{ backgroundColor: '#42180E' }}>
                    <List
                        style={{ marginTop: 120 }}
                        dataArray={routes}
                        renderRow={data => {
                            return (
                                <ListItem style={{ borderBottomWidth: 0 }}
                                    button
                                    onPress={() => this.props.navigation.navigate(data)}>
                                    {data == "MyOrders" ? <Text style={{ color: 'white' }}>My Orders</Text> : <Text style={{ color: 'white' }}>{data}</Text>}
                                </ListItem>
                            );
                        }}
                    />
                    <View style={{ marginTop: 100, borderTopWidth: 1, borderTopColor: 'white' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={{ color: 'white', marginStart: 20, marginTop: 10 }}>Log out</Text>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        );
    }
}
