import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text,RefreshControl, ActivityIndicator,  Image, StyleSheet, View, Linking, ScrollView, ImageBackground } from 'react-native';
import FlipCard from 'react-native-flip-card';
import ItemSeparatorView from './ItemSeparatorView';
import { DataTable } from 'react-native-paper';


const Latest = () => {
    const [loading, setLoading] = useState(true)
    const [dataSource, setDataSource] = useState([]);

    //Fetching most recent items
    useEffect(() => {
        fetch('https://tldrnewspaper.com/article/mobileapi/recent')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('Latest news arrived');
                setDataSource(responseJson);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
        }, []);

    //Mapping each item to this styling
    const ItemView = (item, key) => {
        return (
        // Flat List Item
        <View key={key}>
            <FlipCard>
            {/* Face Side */}
            <View>
            <ImageBackground style={styles.frontpagecard}resizeMode="cover" imageStyle={{ borderRadius: 6}} source={{ uri: `${item.imageurl}` }}>
                <Text style={styles.headlinecardtext}>{item.title}</Text>
                <ItemSeparatorView />
            </ImageBackground>
            </View >
            {/* Back Side */}
            <View style={{flex:1, width:"100%", backgroundColor:"#111827", borderRadius:20}}>
                <ScrollView>
                <Text style={styles.apptitledark}>{item.title}</Text>
                <Text style={styles.datestyle} >
                {item.pubdate}
                </Text>
                <Text style={styles.subtitlestyledark}>Summary</Text>
                <Text style={styles.bodystyledark}>{item.summary}</Text>
                <Image style={styles.frontpagecard}resizeMode="cover" imageStyle={{ borderRadius: 6}} source={{ uri: `${item.imageurl}` }}></Image>
                <Text style={styles.subtitlestyledark}>Source comparison</Text>
                <Text style={styles.bodystyledark} >{item.comparison}</Text>
                <DataTable textStyle={{color:'white'}}>
                    <DataTable.Header>
                    <DataTable.Title textStyle={{color:'white'}}>Source</DataTable.Title>
                    <DataTable.Title textStyle={{color:'white'}}>Title</DataTable.Title>
                    </DataTable.Header>

                    {item.sources.map((item, key) => (
                    // key is the index of the array
                    // item is the single item of the array

                    <DataTable.Row key={key} onPress={ ()=>{ Linking.openURL(`${item.url}`)}}>
                    <DataTable.Cell textStyle={{color:'white'}}>{item.sourcename}</DataTable.Cell>
                    <DataTable.Cell textStyle={{color:'white'}}>{item.title}</DataTable.Cell>
                </DataTable.Row>
                ))}
                </DataTable>
                <Text style={styles.subtitlestyledark}>Read more</Text>
                <Text style={styles.bodystyledark} >{item.long_content}</Text>
                </ScrollView>
            </View>
            </FlipCard>
            <ItemSeparatorView />
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
            //render all articles
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
        height:200, 
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

export default Latest;