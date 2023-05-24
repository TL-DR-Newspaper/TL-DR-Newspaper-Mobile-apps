import React, { useState, useEffect } from 'react';
import {Text, ActivityIndicator,  Image, View, Linking, ImageBackground, TouchableOpacity } from 'react-native';
import FlipCard from 'react-native-flip-card'
import Weatherwidget from './weatherwidget';
import Stockwidget from './stockwidget';

const Header = () => {

    const handleOpenWithLinking = () =>{
        Linking.openURL("https://www.buymeacoffee.com/petervd")};


    return <View style={{height:100, flexDirection:'row', paddingHorizontal:10}}>
    <FlipCard style={{flex:1}} clickable={true}>
        {/* Face Side */}
        <ImageBackground style={{flex:1, margin:4 }}resizeMode="contain" imageStyle={{ borderRadius: 10}} source={require('../assets/logo.png')}>
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
    <Weatherwidget/>
    {/* Back Side */}
    <Stockwidget/>
    </FlipCard>
</View>
};

export default Header;