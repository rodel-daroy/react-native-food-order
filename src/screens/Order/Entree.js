import axios from "axios";
import { Body, Container, Content, Header, Input, Item, Left, ListItem, Right, Text, Thumbnail } from "native-base";
import React from 'react';
import { FlatList, TouchableOpacity, View } from "react-native";
import { default as BackIcon, default as Icon } from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

class EntreeScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            flag: 'none',
            categoryid: 0,
            totalquantities: 0,
            totalprice: 0,
            data: []
        };
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', this.load);
    }

    load = () => {      

        if (this.props.product.pIds.length == 0) {
            this.setState({ flag: 'none' })
        } else {
            this.setState({ flag: 'flex' })

            let tempQuantities = 0;
            let tempPrice = 0;
            for (let i = 0; i < this.props.product.pTotalPrices.length; i++) {
                tempQuantities = tempQuantities + parseInt(this.props.product.pQuantities[i].value);
                tempPrice = tempPrice + parseInt(this.props.product.pTotalPrices[i].value);
            }
            this.setState({ totalquantities: tempQuantities, totalprice: tempPrice })
        }

        let categoryid = this.props.navigation.state.params.categoryid
        this.setState({ categoryid: categoryid })

        this.getEntree()
    }

    getEntree() {

        const url = 'https://wanchaicafe.com/wp-json/wc/v3/products?consumer_key=ck_9638edaefc3e0d4bb1ef8185a6dd9706ba217599&consumer_secret=cs_70afa1f240cc1a083a96f2f826555ed3607b2438'

        let temp = [];
        this.setState({ data: temp });

        axios.get(url).then(response => {
            for (let i = 0; i < response.data.length; i++) {
                if (this.state.categoryid == response.data[i].categories[0].id) {
                    temp.push(response.data[i])
                }
            }
            this.setState({ data: temp });
        }).catch(err => {
            console.log(err.error);
        })
    }

    renderItem = ({ item }) => {
        return (
            <ListItem itemDivider onPress={() => this.props.navigation.navigate('EntreeDetail', {
                id: item.id,
                image: item.images[0].src,
                name: item.name,
                price: item.price
            })}
                style={{ backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E5E9F2' }}>
                <Left>
                    <Text>
                        <Text style={{ fontWeight: '500', fontSize: 20 }}>{item.name}{'\n'}</Text>
                        <Text style={{ marginTop: 5 }}>{item.description.replace("<p>", "").replace('</p>', '')}</Text>
                    </Text>
                </Left>
                <Right>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontWeight: '500', fontSize: 24, marginEnd: 15 }}>{item.price}</Text>
                        <Icon name="plus" size={25} color="black" />
                    </View>
                </Right>
            </ListItem >
        );
    };

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
                <Content padder>
                    <Item searchBar rounded style={{ height: 40, padding: 10, backgroundColor: '#E5E9F2' }}>
                        <Item>
                            <Icon name="search" size={20} color="#8190A5" style={{ marginEnd: 10 }} />
                            <Input placeholder="Search" />
                        </Item>
                    </Item>
                    <FlatList
                        style={{ marginTop: 10 }}
                        data={this.state.data}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.name}
                    />
                </Content>
                <View style={{ display: this.state.flag, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart', {
                        flag: "Entree"
                    })}
                        style={{ width: '95%', height: 50, backgroundColor: '#FEF104', position: 'absolute', bottom: 10, borderRadius: 10, flexDirection: 'row' }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#FFB300', alignItems: 'center', justifyContent: 'center' }}>
                                <Text>{this.state.totalquantities}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: '500', fontSize: 20 }}>VIEW YOUR CART ${parseFloat(this.state.totalprice).toFixed(2)}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    product: state.product
})

export default connect(mapStateToProps)(EntreeScreen)
