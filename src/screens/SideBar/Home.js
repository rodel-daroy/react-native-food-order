import { Card, CardItem, Container, Content, Left, ListItem } from "native-base";
import React from 'react';
import { FlatList, Image, Text } from "react-native";
import { MaterialDialog } from 'react-native-material-dialog';
import _Header from "../Component/_Header";

export default class HomeScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      data: [],
      config: [],
      modalVisible: false
    };
  }

  componentDidMount() {
    this.getConfig()
    this.getData()
  }

  getConfig() {
    fetch('https://wanchaicafe.com/api/config.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          config: responseJson
        })
        this.popup()
      })
      .catch((error) => {
        console.error(error);
      });
  }

  popup() {
    var orderingHourStart = parseInt(this.state.config.orderingHourStart.substring(0, 2));
    var orderingHourEnd = parseInt(this.state.config.orderingHourEnd.substring(0, 2));
    var hours = new Date().getHours();
    if (orderingHourStart <= hours || hours <= orderingHourEnd) {
      this.setState({ modalVisible: false })
    } else {
      this.setState({ modalVisible: true })
    }
  }

  getData() {
    fetch('https://wanchaicafe.com/wp-json/wp/v2/posts?_embed')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderItem = ({ item }) => {
    return (
      <ListItem itemDivider onPress={() => this.props.navigation.navigate('HomeDetail', {
        media: item._embedded['wp:featuredmedia'][0].source_url,
        title: item.title.rendered,
        date: item.date,
        content: item.content.rendered
      })}>
        <Card>
          <CardItem>
            <Image source={{ uri: item._embedded['wp:featuredmedia'][0].source_url }} style={{ height: 180, width: '100%', resizeMode: 'center' }} />
          </CardItem>
          <CardItem style={{ backgroundColor: '#EFF2F7' }}>
            <Left>
              <Text>
                <Text style={{ fontSize: 20 }}>{item.title.rendered}{'\n'}</Text>
                <Text>{item.excerpt.rendered.replace("<p>", "").replace("</p>", "")}</Text>
                <Text>View now</Text>
              </Text>
            </Left>
          </CardItem>
        </Card>
      </ListItem>
    );
  };

  render() {
    return (
      <Container>
        <_Header navigation={this.props.navigation} />
        <Content>
          <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => item.title.rendered} />
          <MaterialDialog
            title="Alarm"
            visible={this.state.modalVisible}
            cancelLabel="OK"
            onCancel={() => {
              this.setState({ modalVisible: false });
            }}>
            <Text style={{ fontSize: 18 }}>
              Our Kitchen is not taking orders from 21:00PM to 11:00AM. Advanced orders for tomorrow are available
            </Text>
          </MaterialDialog>
        </Content>
      </Container>
    );
  }
}
