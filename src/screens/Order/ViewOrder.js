import axios from "axios";
import { Body, Card, Container, Content, Header, Left, Right, Thumbnail } from "native-base";
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
//import MapView from 'react-native-maps';
//import ProgressBarAnimated from 'react-native-progress-bar-animated';
import BackIcon from 'react-native-vector-icons/FontAwesome';
import RoundCheckbox from 'rn-round-checkbox';

//const barWidth = Dimensions.get('screen').width - 40;

export default class ViewOrderScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orderID: 0,
            progress: 80,
            self_collection: true,
            orderReceived: false,
            beingPrepared: false,
            readyForCollection: false,
            onTheWay: false
        };
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', this.load);
        this.interval = setInterval(() => this.getOrderState(), 30000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    load = () => {
        let orderID = this.props.navigation.state.params.orderID
        this.setState({ orderID: orderID }, () => { this.getOrderState() })
    }

    getOrderState() {

        const url = 'https://wanchaicafe.com/wp-json/wc/v3/orders/' + this.state.orderID + '?consumer_key=ck_9638edaefc3e0d4bb1ef8185a6dd9706ba217599&consumer_secret=cs_70afa1f240cc1a083a96f2f826555ed3607b2438'

        axios.get(url).then(response => {
            if (response.data.status == "pending") {
                this.setState({ orderReceived: true });
            } else if (response.data.status == "processing") {
                this.setState({ orderReceived: true, beingPrepared: true });
            } else if (response.data.status == "completed") {
                this.setState({ orderReceived: true, beingPrepared: true });
                this.setState({ readyForCollection: true });
            }
        }).catch(err => {
            console.log(err.error);
        })
    }

    increase = (key, value) => {
        this.setState({
            [key]: this.state[key] + value,
        });
    }

    render() {
        return (
            <Container>
                <Header style={{ height: 80, backgroundColor: 'white', flexDirection: 'row' }}>
                    <Left>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Menu')}>
                            <BackIcon name="chevron-left" size={20} color="black" />
                            <Text style={{ fontSize: 18, marginStart: 5 }}>Back</Text>
                        </TouchableOpacity>
                    </Left>
                    <Body style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Thumbnail square source={require('../../assets/logo.png')} style={{ width: 60, height: 60 }} />
                    </Body>
                    <Right />
                </Header>
                <Content contentContainerStyle={{ flex: 1 }}>
                    {/* <View style={{ width: '100%', height: 200 }}>
                        <MapView
                            showsUserLocation={true}
                            showsMyLocationButton={false}
                            zoomEnabled={true}
                            style={{ flex: 1, position: 'absolute', left: 5, top: 5, right: 5, bottom: 5, ...StyleSheet.absoluteFillObject }}
                            initialRegion={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ marginTop: 15, marginBottom: 15, fontWeight: '500', fontSize: 20, textAlign: 'center', }}>5 minutes remaining</Text>
                        <ProgressBarAnimated
                            width={barWidth}
                            value={this.state.progress}
                            backgroundColorOnComplete="#FEF104"
                        />
                    </View> */}
                    <ScrollView>
                        {this.state.self_collection ?
                            <View>
                                <Card style={{ backgroundColor: '#FDF20A', padding: 15, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 20, fontWeight: '500', color: 'black' }}>Order ID</Text>
                                    <Text style={{ fontSize: 24, fontWeight: '500', color: 'black' }}># {this.state.orderID}</Text>
                                </Card>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', padding: 15, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <RoundCheckbox
                                            size={36}
                                            backgroundColor="#00A57A"
                                            checked={this.state.orderReceived}
                                            onValueChange={(newValue) => { console.log(newValue) }} />
                                    </View>
                                    <View style={{ flex: 4, paddingStart: 10 }}>
                                        <Text style={{ fontSize: 20, fontWeight: '500' }}>Order received</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text>20 minutes ago</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', padding: 15, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <RoundCheckbox
                                            size={36}
                                            backgroundColor="#00A57A"
                                            checked={this.state.beingPrepared}
                                            onValueChange={(newValue) => { console.log(newValue) }} />
                                    </View>
                                    <View style={{ flex: 4, paddingStart: 10 }}>
                                        <Text style={{ fontSize: 20, fontWeight: '500' }}>Being prepared</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text>20 minutes ago</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', padding: 15, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <RoundCheckbox
                                            size={36}
                                            backgroundColor="#00A57A"
                                            checked={this.state.readyForCollection}
                                            onValueChange={(newValue) => { console.log(newValue) }} />
                                    </View>
                                    <View style={{ flex: 4, paddingStart: 10 }}>
                                        <Text style={{ fontSize: 20, fontWeight: '500' }}>Ready for collection</Text>
                                    </View>
                                </View>
                            </View>
                            :
                            <View>
                                <Card style={{ padding: 20 }}>
                                    <Text style={{ fontSize: 24, fontWeight: '500', color: 'black' }}>Order status</Text>
                                </Card>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', padding: 15, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <RoundCheckbox
                                            size={36}
                                            backgroundColor="#00A57A"
                                            checked={this.state.orderReceived}
                                            onValueChange={(newValue) => { console.log(newValue) }} />
                                    </View>
                                    <View style={{ flex: 4, paddingStart: 10 }}>
                                        <Text style={{ fontSize: 20, fontWeight: '500' }}>Order received</Text>
                                    </View>
                                </View>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', padding: 15, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <RoundCheckbox
                                            size={36}
                                            backgroundColor="#00A57A"
                                            checked={this.state.beingPrepared}
                                            onValueChange={(newValue) => { console.log(newValue) }} />
                                    </View>
                                    <View style={{ flex: 4, paddingStart: 10 }}>
                                        <Text style={{ fontSize: 20, fontWeight: '500' }}>Being prepared</Text>
                                    </View>
                                </View>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', padding: 15, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <RoundCheckbox
                                            size={36}
                                            backgroundColor="#00A57A"
                                            checked={this.state.onTheWay}
                                            onValueChange={(newValue) => { console.log(newValue) }}
                                        />
                                    </View>
                                    <View style={{ flex: 4, paddingStart: 10 }}>
                                        <Text style={{ fontSize: 20, fontWeight: '500' }}>On the way</Text>
                                    </View>
                                </View>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', padding: 15, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <RoundCheckbox
                                            size={36}
                                            backgroundColor="#00A57A"
                                            checked={this.state.readyForCollection}
                                            onValueChange={(newValue) => { console.log(newValue) }} />
                                    </View>
                                    <View style={{ flex: 4, paddingStart: 10 }}>
                                        <Text style={{ fontSize: 20, fontWeight: '500' }}>Ready for collection</Text>
                                    </View>
                                </View>
                            </View>
                        }
                    </ScrollView>
                </Content>
            </Container >
        );
    }
}

