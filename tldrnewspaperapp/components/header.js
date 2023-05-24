import React, { useState, useEffect } from 'react';
import {Text, ActivityIndicator,  Image, View, Linking, ImageBackground, TouchableOpacity } from 'react-native';
import FlipCard from 'react-native-flip-card'

const Header = () => {
    const [loading, setLoading] = useState(true)
    const [weatherSource, setWeatherSource] = useState([]);

    const handleOpenWithLinking = () =>{
        Linking.openURL("https://www.buymeacoffee.com/petervd")};

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
    ) : (
    <View style={{height:100, flexDirection:'row', paddingHorizontal:10}}>
    <FlipCard style={{flex:1}} clickable={true}>
        {/* Face Side */}
        <ImageBackground style={{flex:1, margin:4 }}resizeMode="cover" imageStyle={{ borderRadius: 10}} source={require('../assets/logo.png')}>
        </ImageBackground>
       {/* Back Side */}
    <View style={{flex:3, borderColor: 'lightgrey', borderWidth: 1, backgroundColor: '#1A56DB', margin:4, borderRadius:10, alignItems:'center', justifyContent:'center'}}>
        <TouchableOpacity onPress={() => handleOpenWithLinking()}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontWeight:'bold', fontSize:36, color:"white"}}>☕️</Text>
            <Text style={{fontWeight:'bold', color:"white", padding:4}}>Buy us a coffee</Text>
        </View>
        </TouchableOpacity>
    </View>
    </FlipCard>
    <FlipCard 
        style={{flex:2}}
        friction={25}
        perspective={1000}
        flipHorizontal={true}
        flipVertical={true}>
    {/* Face Side */}
    <View style={{flex:3 , borderColor: 'lightgrey', borderWidth: 1, backgroundColor: 'white', margin:4, borderRadius:10, alignItems:'center', justifyContent:'center'}}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <Image
                style={{width: 50, height: 50}}
                source={{uri: 'https://openweathermap.org/img/wn/'+String(weatherSource.weather[0].icon)+'@2x.png'}}
            />
            <Text style={{fontWeight:'bold', fontSize:24}}>{Math.round(weatherSource.main.temp/10)} C°</Text>
        </View>
        <Text style={{fontWeight:'bold'}}>{weatherSource.weather[0].description}</Text>
        <Text>Windspeed: {weatherSource.wind.speed}</Text>
    </View>
    {/* Back Side */}
    <View style={{flex:3, borderColor: 'lightgrey', borderWidth: 1, backgroundColor: 'white', margin:4, borderRadius:10, alignItems:'center', justifyContent:'center'}}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <Image
                style={{width: 50, height: 50}}
                source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPOy7J00Z3TvNk1hFIyKY3jWnVCGF1TPnwnA&usqp=CAU'}}
            />
            <Text style={{fontWeight:'bold', fontSize:24}}>+2,1 %</Text>
        </View>
        <Text style={{fontWeight:'bold'}}>S&P 500</Text>
        <Text> 4.145,58 points</Text>
    </View>
    </FlipCard>
</View>);
};

export default Header;