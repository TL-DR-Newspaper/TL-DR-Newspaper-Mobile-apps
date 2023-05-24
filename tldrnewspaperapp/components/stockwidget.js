import React, { useState, useEffect } from 'react';
import {Text, ActivityIndicator,  Image, View, Linking, ImageBackground, TouchableOpacity } from 'react-native';

const Stockwidget = () => {
    const [loading, setLoading] = useState(true)
    const [stockData, setStockData] = useState([]);

    useEffect(() => {
        fetch('https://api.polygon.io/v2/aggs/ticker/I:DJI/range/1/hour/2023-03-10/2023-03-10?sort=asc&limit=120&apiKey=IyA3fGY4Ma7tUAxP1XLAavKMmZmQoeSm')
            .then((response) => response.json())
            .then((responseJson) => {
            console.log('Stock data arrived');
            setStockData(responseJson);
            setLoading(false)
            })
            .catch((error) => {
            console.error(error);
            });
        }, []);
  return loading ? (<View style={{flex:3, borderColor: 'lightgrey', borderWidth: 0, backgroundColor: 'white', margin:4, borderRadius:10, alignItems:'center', justifyContent:'center'}}>
                            <ActivityIndicator
                    style={{width: 50, height: 50}}
                    size="large"
                />
                  </View>
    ) : (<View style={{flex:3, borderColor: 'lightgrey', borderWidth: 0, backgroundColor: 'white', margin:4, borderRadius:10, alignItems:'center', justifyContent:'center'}}>
    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
        <Text style={{fontWeight:'bold', fontSize:24}}>📈 {stockData.results[0].c}</Text>
    </View>
    <Text style={{fontWeight:"bold"}}>Ticker: {stockData.ticker} S&P500</Text>
    <Text> H:{stockData.results[0].h}  L:{stockData.results[0].l}</Text>

</View>)
};

export default Stockwidget;