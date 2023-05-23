import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text,RefreshControl, ActivityIndicator,  Image, StyleSheet, View, Linking, ScrollView, ImageBackground } from 'react-native';

const Header = () => {
    const [loading, setLoading] = useState(true)
    const [weatherSource, setWeatherSource] = useState([]);

    useEffect(() => {
        fetch('https://samples.openweathermap.org/data/2.5/weather?q=London&appid=b1b15e88fa797225412429c1c50c122a1')
            .then((response) => response.json())
            .then((responseJson) => {
            console.log('Weather data arrived');
            setWeatherSource(responseJson);
            setLoading(false)
            })
            .catch((error) => {
            console.error(error);
            });
        }, []);

    return loading ? (
        //if we're loading
        <View style={{height:100, flexDirection:'row', paddingHorizontal:10}}>
    <ImageBackground style={{flex:1, margin:4 }}resizeMode="cover" imageStyle={{ borderRadius: 10}} source={require('../assets/logo.png')}>
    </ImageBackground>
    <View style={{flex:2 , borderColor: 'lightgrey', borderWidth: 0, backgroundColor: 'white', margin:4, borderRadius:10, alignItems:'center', justifyContent:'center'}}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <ActivityIndicator
                style={{width: 50, height: 50}}
                size="large"
            />
            <Text style={{fontWeight:'bold', fontSize:24}}> C°</Text>
        </View>
        <Text>Loading weather</Text>
    </View>
</View>
         ) : (<View style={{height:100, flexDirection:'row', paddingHorizontal:10}}>
    <ImageBackground style={{flex:1, margin:4 }}resizeMode="cover" imageStyle={{ borderRadius: 10}} source={require('../assets/logo.png')}>
    </ImageBackground>
    <View style={{flex:2 , borderColor: 'lightgrey', borderWidth: 0, backgroundColor: 'white', margin:4, borderRadius:10, alignItems:'center', justifyContent:'center'}}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <Image
                style={{width: 50, height: 50}}
                source={{uri: 'https://openweathermap.org/img/wn/'+String(weatherSource.weather[0].icon)+'@2x.png'}}
            />
            <Text style={{fontWeight:'bold', fontSize:24}}>{Math.round(weatherSource.main.temp/10)} C°</Text>
        </View>
        <Text>{weatherSource.weather[0].description}</Text>
        <Text>Windspeed: {weatherSource.wind.speed}</Text>

    </View>
</View>);
};

export default Header;