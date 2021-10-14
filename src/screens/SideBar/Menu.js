import axios from "axios";
import { Container, Content } from "native-base";
import React from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import _Header from '../Component/_Header';

export default class MenuScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            categories: [],
        };
    }

    componentWillMount() {
        this.getCategories()
    }

    getCategories() {

        const url = 'https://wanchaicafe.com/wp-json/wc/v3/products/categories?consumer_key=ck_9638edaefc3e0d4bb1ef8185a6dd9706ba217599&consumer_secret=cs_70afa1f240cc1a083a96f2f826555ed3607b2438'

        axios.get(url).then(response => {
            this.setState({
                isLoading: false,
                categories: response.data,
            });
        }).catch(err => {
            console.log(err.error);
        })
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Entree', {
                categoryid: item.id
            })}>
                <View style={{ width: '100%', height: 200, borderColor: 'white', borderWidth: 1, marginTop: -1, alignItems: 'center', justifyContent: 'center' }}>
                    {
                        item.image == null ? null : <Image source={{ uri: item.image.src }} style={{ width: '100%', height: '100%', resizeMode: 'stretch' }} />
                    }
                    <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute' }}></View>
                    <Text style={{ fontSize: 20, color: '#FCE91E', position: 'absolute' }}>{item.name}</Text>
                </View>
            </TouchableOpacity>
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
            return (
                <Container>
                    <_Header navigation={this.props.navigation} />
                    <Content>
                        <FlatList
                            data={this.state.categories}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.name} />
                    </Content>
                </Container>
            );
        }
    }
}
