import axios from "axios";
import { Card, Container, Content, Input, Item, Left, ListItem, Right, Text } from "native-base";
import React from 'react';
import { ActivityIndicator, AsyncStorage, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import _Header from '../Component/_Header';

class MyOrdersScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            user: {},
            myOrders: [],
            completed: [],
            processing: []
        };
        this.init()
    }

    async init() {
        let user = await AsyncStorage.getItem('user');
        this.setState({ user: JSON.parse(user) }, () => { this.fetchData() })
    }

    componentDidUpdate(prevProps) {
        if (this.props.count !== prevProps.count) {
            this.fetchData();
        }
    }

    fetchData() {

        const url = 'https://wanchaicafe.com/wp-json/wc/v3/orders?customer=' + this.state.user.id + '&consumer_key=ck_9638edaefc3e0d4bb1ef8185a6dd9706ba217599&consumer_secret=cs_70afa1f240cc1a083a96f2f826555ed3607b2438'

        axios.get(url).then(response => {
            this.setState({ myOrders: response.data, isLoading: false }, () => { this.separate() })
        }).catch(err => {
            console.log(err.error);
        })
    }

    separate() {
        let _completed = [], _processing = []
        for (let i = 0; i < this.state.myOrders.length; i++) {
            if (this.state.myOrders[i].status == "completed") {
                _completed.push(this.state.myOrders[i])
            } else {
                _processing.push(this.state.myOrders[i])
            }
        }
        this.setState({ completed: _completed, processing: _processing })
    }

    renderItem = ({ item }) => {
        return (
            <ListItem itemDivider style={{ backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E5E9F2' }}>
                <Left >
                    <Text>
                        <Text style={{ fontWeight: "bold" }}>Active Orders{'\n'}{'\n'}</Text>
                        <Text style={{ fontWeight: "bold" }}>{item.number}#</Text>{'\n'}
                        <Text>{item.date_completed}</Text>{'\n'}
                        <Text>Order Status: {item.status}</Text>
                    </Text>
                </Left >
                <Right >
                    <Icon name="chevron-right" size={25} color="black" />
                </Right>
            </ListItem >
        );
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            );
        } else {
            if (this.state.myOrders.length == 0) {
                return (
                    <Container>
                        <_Header navigation={this.props.navigation} />
                        <Content padder>
                            <Item searchBar rounded style={{ height: 40, padding: 10, backgroundColor: '#E5E9F2' }}>
                                <Item>
                                    <Icon name="search" size={20} color="#8190A5" style={{ marginEnd: 10 }} />
                                    <Input placeholder="Search" />
                                </Item>
                            </Item>
                            {alert("No orders")}
                        </Content>
                    </Container >

                );
            } else {
                return (
                    <Container>
                        <_Header navigation={this.props.navigation} />
                        <Content padder>
                            <Item searchBar rounded style={{ height: 40, padding: 10, backgroundColor: '#E5E9F2' }}>
                                <Item>
                                    <Icon name="search" size={20} color="#8190A5" style={{ marginEnd: 10 }} />
                                    <Input placeholder="Search" />
                                </Item>
                            </Item>
                            <Card style={{ marginTop: 5 }}>
                                <FlatList
                                    data={this.state.processing}
                                    renderItem={this.renderItem}
                                    keyExtractor={item => item.name}
                                />
                            </Card>
                            <FlatList
                                style={{ marginTop: 5 }}
                                data={this.state.completed}
                                renderItem={this.renderItem}
                                keyExtractor={item => item.name}
                            />
                        </Content>
                    </Container >
                );
            }
        }
    }
}

const mapStateToProps = state => ({
    count: state.order_state.count
})

export default connect(mapStateToProps)(MyOrdersScreen)