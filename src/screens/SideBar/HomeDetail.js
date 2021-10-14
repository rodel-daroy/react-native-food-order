import { Body, Container, Content, Header, Item, Left, Right, Thumbnail } from "native-base";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import HTML from 'react-native-render-html';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HomeDetailScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            media: '',
            title: '',
            date: '',
            content: ''
        };
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', this.getHomeDetail);
    }

    getHomeDetail = () => {
        let media = this.props.navigation.state.params.media
        let title = this.props.navigation.state.params.title
        this.setState({ media: media, title: title })
        let date = this.props.navigation.state.params.date
        let content = this.props.navigation.state.params.content
        this.setState({ date: date, content: content })
    }

    render() {
        return (
            <Container>
                <Header style={{ height: 80, backgroundColor: 'white', flexDirection: 'row' }}>
                    <Left>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => this.props.navigation.goBack()}>
                            <Icon name="chevron-left" size={20} color="black" />
                            <Text style={{ fontSize: 18, marginStart: 5 }}>Back</Text>
                        </TouchableOpacity>
                    </Left>
                    <Body style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Image source={require('../../assets/logo.png')} style={{ width: 60, height: 60 }} />
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Thumbnail square source={{ uri: this.state.media }} style={{ width: '100%', height: 200, resizeMode: 'contain' }} />
                    <Item style={{ marginTop: 20 }}>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontSize: 24 }}>{this.state.title}</Text>
                            <Text style={{ fontSize: 18, marginTop: 10, marginBottom: 10 }}>{this.state.date.substring(0, this.state.date.indexOf("T"))}</Text>
                            <HTML html={this.state.content.replace("<p>", "<span>").replace("</p>", "</span>")} baseFontStyle={{ fontSize: 18 }} />
                        </View>
                    </Item>
                </Content>
            </Container>
        );
    }
}