import { Container, Content, View } from "native-base";
import React from 'react';
import { Text } from "react-native";
import _Header from "../Component/_Header";

export default class RewardsScreen extends React.Component {

    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() { }

    render() {
        return (
            <Container>
                <_Header navigation={this.props.navigation} />
                <Content contentContainerStyle={{ flex: 1 }}>
                    <View style={{ height: 200, backgroundColor: '#E4DF73', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <Text style={{ fontSize: 32, fontWeight: '900' }}>5000</Text>
                        <Text>Points</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 32, fontWeight: '700' }}>Rewards coming soon</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}
