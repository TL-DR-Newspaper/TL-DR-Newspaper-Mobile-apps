import React, { useState, useEffect } from 'react';
import {Text, ActivityIndicator,  Image, View, Linking, ImageBackground, TouchableOpacity } from 'react-native';

const Weatherwidget = () => {
    const [loading, setLoading] = useState(true)
    const [weatherSource, setWeatherSource] = useState([]);

    useEffect(() => {
        fetch('https://api.weatherapi.com/v1/current.json?q=amsterdam&key=6fe8cbbdcad1423883b151734232405')
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
    ) : (<View style={{flex:3 , borderColor: 'lightgrey', borderWidth: 0, backgroundColor: 'white', margin:4, borderRadius:10, alignItems:'center', justifyContent:'center'}}>
    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
        <Image
            style={{width: 50, height: 50}}
            source={{uri: 'https:'+String(weatherSource.current.condition.icon)}}
        />
        <Text style={{fontWeight:'bold', fontSize:24}}>{weatherSource.current.temp_c} C°</Text>
    </View>
    <Text style={{fontWeight:'bold'}}>{weatherSource.current.condition.text}</Text>
    <Text>Wind: {weatherSource.current.wind_kph}km/h from {weatherSource.current.wind_dir}</Text>
</View>)
};

export default Weatherwidget;