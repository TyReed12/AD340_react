//Main
import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomePage extends Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style = {styles.container}>
        <Text style= {{fontSize: 30, color: 'blue'}}>
        SDOT Traffic Cameras
        </Text>
        <View style = {{margin:10}}>
          <Button style = {styles.button}
          onPress = { () => navigate("Cameras") }
          title = "View Cameras"
          color="#C82D2D"
          />
        </View>
      </View>
    );
  }
}
//Cameras Page
class CameraPage extends Component {

  static navigationOptions = {
    title: 'Cameras',
  };

  state = {
    data: []
  };

  //-----Fetch from mounted component-------
  componentWillMount() {
    this.fetchData();
  }

  //fetch data from sdot api
  fetchData = async () => {
    const response = await fetch('https://web6.seattle.gov/Travelers/api/Map/Data?zoomId=18&type=2');
    const json = await response.json();
    this.setState({ data: json.Features });
  };

  cameraType(camera) {
      if(camera.Type == 'sdot'){
            return  "http://www.seattle.gov/trafficcams/images/"+camera.ImageUrl;
      }else{
            return "http://images.wsdot.wa.gov/nw/"+camera.ImageUrl;
      }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (

      <View style={styles.container}>

        <FlatList
          data={this.state.data}
          keyExtractor={(obj, idx) => idx.toString()}
          renderItem={ ({item}) =>
            <View style={styles.textM}>
             <Image
                source = {{ uri: this.cameraType(item.Cameras[0]) }}
                style = {{height: 250, margin: 3}}
                />

              <Text style = {{fontSize: 16, color:'blue' }}>
                {`${item.Cameras[0].Description}`}
              </Text>
            </View>
          }
         />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B7CEEB',
  },
  textM: {
    marginBottom: 30
  }
});

export default class App extends Component {
  render () {
    return <NavigationApp />;
  }
}

const NavigationApp = StackNavigator({
    Home: { screen: HomePage },
    Cameras: { screen: CameraPage },
});
