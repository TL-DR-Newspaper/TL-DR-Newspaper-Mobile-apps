import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text,RefreshControl, ActivityIndicator,  Image, StyleSheet, View, Linking, ScrollView, ImageBackground } from 'react-native';
import FlipCard from 'react-native-flip-card';
import ItemSeparatorView from './ItemSeparatorView';
import { DataTable } from 'react-native-paper';


const Summaries = () => {
    const [loading, setLoading] = useState(true)
    const [dataSource, setDataSource] = useState([]);

    //Fetching most recent items
    useEffect(() => {
        fetch('https://tldrnewspaper.com/article/mobileapi/sources')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('Summary news arrived');
                setDataSource(responseJson);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
        }, []);

    const ItemView = (item, key) => {
        return (
            // Flat List Item
            <View key={key} style={{maxHeight: 1200}}>
            <FlipCard
                friction={25}
                perspective={1000}
                flipHorizontal={false}
                flipVertical={true}>
                {/* Face Side */}
                <View>
                <ImageBackground style={styles.headlinecard}resizeMode="cover" imageStyle={{ borderRadius: 6}} source={{ uri: `${item.imageurl}` }}>
                    <Text style={styles.headlinecardtext}>{item.title}</Text>
                </ImageBackground>
                </View >
                {/* Back Side */}
                <View style={{height:400, width:250, backgroundColor:"#111827", alignItems:'center', justifyContent:'center', margin:4, borderRadius:10}}>
                    <Text style={styles.bodystyledark }>{item.summary}</Text>
                </View>
            </FlipCard>
            </View>
        );
        };

    return loading ? (
        <SafeAreaView>
            <View style={styles.container}>
                <ActivityIndicator style={{paddingVertical:'50%'}} size="large" />
            </View>
        </SafeAreaView>
        ) : (
            dataSource.map(ItemView)
        );
};

const styles = StyleSheet.create({
    frontpagecard: {
        width:'100%', 
        height:250, 
        marginHorizontal:10, 
        paddingHorizontal:10,
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },
    headlinecard: {
        width:250, 
        height:400, 
        backgroundColor: '#1A56DB', 
        margin:4, 
        borderRadius:10,
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },
    headlinecardtext: {
        margin:4, 
        fontWeight:"bold",
        fontSize: 20,
        color: 'white',
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        borderRadius: 20,
        alignSelf: 'center'
        
    },
    container: {
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
        
    },
    apptitledark: {
        padding: 10,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff'
    },
    titlestyle: {
        padding: 10,
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitlestyle: {
        padding: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitlestyledark: {
        padding: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color:'white'
    },
    bodystyle: {
        padding: 10,
        fontSize: 14,

    },
    bodystyledark: {
        padding: 10,
        fontSize: 14,
        color:'white',
    },
    datestyle: {
        fontSize: 14,
        color: '#D3D3D3',
        paddingLeft: 10,
    },
    });

export default Summaries;