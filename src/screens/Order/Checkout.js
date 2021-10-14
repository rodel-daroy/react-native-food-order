import { Card, Container, Content, Header, Left, Right, Text, Title } from "native-base";
import React from 'react';
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Checkoutscreen extends React.Component {

    constructor() {
        super();
        this.state = {
            isModalVisible: false,
        };
    }

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible })

    _onChange = (formData) => console.log(JSON.stringify(formData, null, " "));

    render() {
        return (
            <Container>
                <Header style={{ height: 80, backgroundColor: 'white', flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => this.props.navigation.navigate('Cart', {
                                flag: "Checkout"
                            })}>
                            <Icon name="chevron-left" size={20} color="black" />
                            <Text style={{ fontSize: 18, marginStart: 5 }}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Title style={{ fontWeight: '700', fontSize: 24, color: 'black' }}>CHECK OUT</Title>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ marginEnd: 5 }}>
                            <Icon name="shopping-cart" size={25} color="black" />
                        </TouchableOpacity>
                    </View>
                </Header>
                <Content contentContainerStyle={{ flex: 1 }}>
                    <View style={{ backgroundColor: "#F5F5F5", width: '100%', height: 300, padding: 20, alignItems: 'center' }}>
                        <CreditCardInput onChange={this._onChange} />
                    </View>
                    <View style={{ flex: 1, paddingTop: 5 }}>
                        <TouchableOpacity>
                            <Card style={{ height: 40, padding: 10, flexDirection: 'row' }}>
                                <Left>
                                    <Text>ADD NEW CARD</Text>
                                </Left>
                                <Right>
                                    <Icon name="plus" size={20} color="black" />
                                </Right>
                            </Card>
                        </TouchableOpacity>
                        <ScrollView style={{ height: 60 }}>
                            <Card style={{ height: 120, flexDirection: 'column' }}>
                                <View style={{ flex: 1, paddingStart: 10, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text>BILLING ADDRESS</Text></View>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <TextInput style={{ height: 40 }} placeholder="MILKY STREET 40"></TextInput>
                                    </View>
                                </View>
                                <View style={{ flex: 1, paddingStart: 10, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text>CONTACT PHONE</Text></View>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <TextInput style={{ height: 40 }} placeholder="+7(914)2356 8740"></TextInput>
                                    </View>
                                </View>
                                <View style={{ flex: 1, paddingStart: 10, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text>SHIPPING ADDRESS</Text></View>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <TextInput style={{ height: 40 }} placeholder="MILKY STREET 40"></TextInput>
                                    </View>
                                </View>
                            </Card>
                        </ScrollView>
                        <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
                            <TouchableOpacity style={{ width: '100%', height: 50, backgroundColor: '#4AC761', borderRadius: 10, position: 'absolute', bottom: 10, alignItems: 'center', justifyContent: 'center' }}
                                onPress={this._toggleModal}>
                                <Text style={{ fontSize: 20, color: 'white' }}>PAY NOW</Text>
                            </TouchableOpacity>
                        </View>
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
                                    <TouchableOpacity onPress={this._toggleModal}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => { this.setState({ isModalVisible: false }), this.props.navigation.navigate('ViewOrder') }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>View Order</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </Content>
            </Container >
        );
    }
}
