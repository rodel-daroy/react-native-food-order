import { Card, Container, Content, Thumbnail } from "native-base";
import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import _Header from '../Component/_Header';

export default class ProfileScreen extends React.Component {
    render() {
        return (
            <Container>
                <_Header navigation={this.props.navigation} />
                <Content>
                    <View style={{ width: '100%', height: 100, backgroundColor: '#C0CCDA' }}>
                        <Icon name="edit" size={25} color="black" style={{ position: 'absolute', top: 0, right: 0 }} />
                    </View>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Thumbnail source={require('../../assets/profile.png')} style={{ width: 100, height: 100, resizeMode: 'contain', marginTop: -50, marginBottom: 10 }} />
                        <Text style={{ fontSize: 20 }}>James Lee</Text>
                        <Text style={{ fontSize: 18 }}>20583 points</Text>
                    </View>
                    <View style={{ margin: 5 }}>
                        <Card>
                            <View style={{ height: 80, backgroundColor: '#EFF2F7', flexDirection: 'row' }}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#C0CCDA' }}></View>
                                </View>
                                <View style={{ flex: 3, justifyContent: 'center' }}>
                                    <Text>20% Off Voucher</Text>
                                    <Text>1000 points</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', height: 200, backgroundColor: '#C0CCDA', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity style={{ width: 200, height: 50, borderRadius: 10, backgroundColor: '#47525E', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 20, color: 'white' }}>Claim Now</Text>
                                </TouchableOpacity>
                            </View>
                        </Card>
                        <Card>
                            <View style={{ flexDirection: 'row', height: 80, backgroundColor: '#EFF2F7' }}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#C0CCDA' }}></View>
                                </View>
                                <View style={{ flex: 3, justifyContent: 'center', }}>
                                    <Text>Free Delivery</Text>
                                    <Text>2500 points</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', height: 200, backgroundColor: '#C0CCDA', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity style={{ width: 200, height: 50, borderRadius: 10, backgroundColor: '#47525E', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 20, color: 'white' }}>Claim Now</Text>
                                </TouchableOpacity>
                            </View>
                        </Card>
                    </View>
                </Content>
            </Container>
        );
    }
}
