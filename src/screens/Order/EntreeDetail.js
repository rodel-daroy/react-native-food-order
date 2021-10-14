import { Body, Container, Content, Footer, Header, Left, Right, Thumbnail } from "native-base";
import React from 'react';
import { Image, Keyboard, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Textarea from 'react-native-textarea';
import Icon, { default as BackIcon } from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as productActions from '../../services/actions/product';

class EntreeDetailScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            id: 0,
            image: '',
            name: '',
            price: 0,
            quantity: 0,
            note: '',
            totalprice: 0,
            display: 'flex'
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', this.getDeatail);
    }

    getDeatail = () => {
        this.setState({ quantity: 1 })
        this.setState({ note: '' })
        let id = this.props.navigation.state.params.id
        this.setState({ id: id })
        let image = this.props.navigation.state.params.image
        this.setState({ image: image })
        let name = this.props.navigation.state.params.name
        this.setState({ name: name })
        let price = this.props.navigation.state.params.price
        this.setState({ price: price })
        this.setState({ totalprice: price })
    }

    plusQuantity = () => {
        this.setState({ quantity: this.state.quantity + 1, totalprice: this.state.price * (this.state.quantity + 1) })
    }

    minusQuantity = () => {
        if (this.state.quantity == 1) { } else {
            this.setState({ quantity: this.state.quantity - 1, totalprice: this.state.price * (this.state.quantity - 1) })
        }
    }

    next = () => {
        this.props.actions.productId(this.state.id);
        this.props.actions.productQuantity(this.state.quantity)
        this.props.actions.productName(this.state.name)
        this.props.actions.productDescription(this.state.note)
        this.props.actions.productTotalPrice(this.state.totalprice)
        this.props.navigation.navigate('Entree')
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    _keyboardDidShow() {
        this.setState({ display: 'none' });
    }

    _keyboardDidHide() {
        this.setState({ display: 'flex' });
    }

    render() {
        return (
            <Container>
                <Header style={{ height: 80, backgroundColor: 'white', flexDirection: 'row' }}>
                    <Left>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Entree')}>
                            <BackIcon name="chevron-left" size={20} color="black" />
                            <Text style={{ fontSize: 18, marginStart: 5 }}>Back</Text>
                        </TouchableOpacity>
                    </Left>
                    <Body style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Thumbnail square source={require('../../assets/logo.png')} style={{ width: 60, height: 60 }} />
                    </Body>
                    <Right />
                </Header>
                <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }} >
                    <ScrollView>
                        <KeyboardAvoidingView behavior='padding'>
                            <View style={{ marginTop: 10 }}>
                                <Image source={{ uri: this.state.image }} style={{ width: '100%', height: 150, resizeMode: 'contain' }} />
                            </View>
                            <View style={{ flex: 1, marginTop: 20, alignItems: 'center' }}>
                                <View style={{ height: 50, marginStart: 20, marginEnd: 20 }}>
                                    <Text style={{ fontWeight: '500', fontSize: 22 }}>{this.state.name}: ${parseFloat(this.state.price).toFixed(2)}</Text>
                                </View>
                                <View style={{ height: 45, marginStart: 20, marginEnd: 20, flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flex: 3 }}><Text style={{ fontSize: 18 }}>Quantity</Text></View>
                                    <View style={{ flex: 1 }}><Text style={{ fontSize: 18 }}>{this.state.quantity}</Text></View>
                                    <View style={{ flex: 2 }}>
                                        <View style={{ height: 35, borderWidth: 1, borderColor: '#8190A5', flexDirection: 'row' }}>
                                            <TouchableOpacity onPress={this.plusQuantity} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#8190A5' }}>
                                                <Icon name="plus" size={20} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={this.minusQuantity} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <Icon name="minus" size={20} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: '100%', marginTop: 20, paddingStart: 20, paddingEnd: 20 }}>
                                    <Textarea
                                        containerStyle={{ height: 120, borderColor: '#EEEEEE', borderWidth: 1, paddingStart: 5 }}
                                        style={{ textAlignVertical: 'top', fontSize: 16 }}
                                        onChangeText={(text) => this.setState({ note: text })}
                                        defaultValue={this.state.note}
                                        maxLength={150}
                                        placeholder={'Please note your opinion.'}
                                        placeholderTextColor={'#757575'}
                                        underlineColorAndroid={'transparent'}
                                    />
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </Content >
                <Footer style={{ height: 100, backgroundColor: 'white', flexDirection: 'column', alignItems: 'center', display: this.state.display }}>
                    <Text style={{ marginBottom: 10, fontWeight: '500', fontSize: 22, }}>Total Price: ${parseFloat(this.state.totalprice).toFixed(2)}</Text>
                    <TouchableOpacity style={{ width: 200, height: 40, backgroundColor: '#47525E', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                        onPress={this.next}>
                        <Text style={{ fontWeight: '500', fontSize: 20, color: 'white' }}>Add to Cart</Text>
                    </TouchableOpacity>
                </Footer>
            </Container >
        );
    }
}

const mapStateToProps = state => ({
    pIds: state.product.pIds,
    pQuantities: state.product.pQuantities,
    pNames: state.product.pNames,
    pDescriptions: state.product.pDescriptions,
    pTotalPrices: state.product.pTotalPrices
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(productActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(EntreeDetailScreen)
