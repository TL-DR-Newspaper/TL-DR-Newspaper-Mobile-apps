import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text,RefreshControl, ActivityIndicator,  Image, StyleSheet, View, Linking, ScrollView, ImageBackground } from 'react-native';
import FlipCard from 'react-native-flip-card';
import ItemSeparatorView from './ItemSeparatorView';
import { DataTable } from 'react-native-paper';


const Homepage = () => {
    const [loading, setLoading] = useState(true)
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        fetch('https://tldrnewspaper.com/article/mobileapi/random')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('Homepage arrived');
                setDataSource(responseJson);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
        }, []);

    return loading ? (
        <SafeAreaView>
            <View style={styles.container}>
                <ActivityIndicator style={{paddingVertical:'50%'}} size="large" />
            </View>
        </SafeAreaView>
        ) : ( 
    <View>
    <Text style={styles.apptitle}>Front page</Text>
    <FlipCard>
    {/* Face Side */}
    <View>
    <ImageBackground style={styles.frontpagecard}resizeMode="cover" imageStyle={{ borderRadius: 6}} source={{ uri: `${dataSource[0].imageurl}` }}>
    <Text style={styles.headlinecardtext}>{dataSource[0].title}</Text>
    <ItemSeparatorView />
    </ImageBackground>
    </View >
    {/* Back Side */}
    <View style={{flex:1, width:"100%", backgroundColor:"#111827", borderRadius:20}}>
    <ScrollView>
    <Text style={styles.apptitledark}>{dataSource[0].title}</Text>
    <Text style={styles.datestyle} >
        {dataSource[0].pubdate}
    </Text>
    <Text style={styles.subtitlestyledark}>Summary</Text>
    <Text style={styles.bodystyledark}>{dataSource[0].summary}</Text>
    <Image style={styles.frontpagecard}resizeMode="cover" imageStyle={{ borderRadius: 6}} source={{ uri: `${dataSource[0].imageurl}` }}></Image>
    <Text style={styles.subtitlestyledark}>Source comparison</Text>
    <Text style={styles.bodystyledark} >{dataSource[0].comparison}</Text>
    <DataTable textStyle={{color:'white'}}>
        <DataTable.Header>
            <DataTable.Title textStyle={{color:'white'}}>Source</DataTable.Title>
            <DataTable.Title textStyle={{color:'white'}}>Title</DataTable.Title>
        </DataTable.Header>
        {dataSource[0].sources.map((item, key) => (
        // key is the index of the array
        // item is the single item of the array
        <DataTable.Row key={key} onPress={ ()=>{ Linking.openURL(`${item.url}`)}}>
            <DataTable.Cell textStyle={{color:'white'}}>{item.sourcename}</DataTable.Cell>
            <DataTable.Cell textStyle={{color:'white'}}>{item.title}</DataTable.Cell>
        </DataTable.Row>
        ))}
    </DataTable>
    <Text style={styles.subtitlestyledark}>Read more</Text>
    <Text style={styles.bodystyledark} >{dataSource[0].long_content}</Text>
    </ScrollView>
    </View>
    </FlipCard>
    </View>
        );
};

const styles = StyleSheet.create({
    frontpagecard: {
        width:'100%', 
        height:350, 
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
    apptitle: {
        padding: 10,
        fontSize: 32,
        fontWeight: 'bold',
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

export default Homepage;