// import React in our code
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text,RefreshControl, ActivityIndicator,  Image, StyleSheet, View, ScrollView } from 'react-native';
import Header from './components/header';
import Homepage from './components/homepage';
import Latest from './components/latest';
import Summaries from './components/summaries';

const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("Loading")
    setLoading(false)
  }, []);

  const onRefresh = React.useCallback(async () => {
    setLoading(true);
    fetch('https://tldrnewspaper.com/article/mobileapi/sources')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('Refresh arrived');
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [loading]);


  return loading ? (
    //if we're loading
    <SafeAreaView>
      <View style={styles.container}>
        <ActivityIndicator style={{paddingVertical:'50%'}} size="large" />
      </View>
      <Image style={styles.logo} source={require('./assets/logo.png')} /> 
      <Text style={{alignSelf:'center'}}>Loading more news...</Text>
    </SafeAreaView> ) : (
      //If we're not loading
    <View style={{ flex: 1 }}>
    <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}>
      <View style={{height:40}}></View>
      <Header />
      <Homepage />
        <Text style={styles.apptitle}>Summaries</Text>
        <Text style={styles.subtitlestyle}>Just TL:DR</Text>
        <View style={{height:400, flexDirection:'row', paddingLeft:10}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Summaries />
        </ScrollView>
      </View>
      <Text style={styles.apptitle}>Latest</Text>
      <Text style={styles.subtitlestyle}>Most recent</Text>
      <Latest/>
      <View style={{height:40, alignItems:'center'}}>
        <Text>tldrnewspaper.com © 2023</Text>
      </View>
    </ScrollView>
    </View>
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
  headlinecardimage: {
    flex: 1,
    justifyContent: 'center',
    borderRadius:20,
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  container: {
    backgroundColor: 'white',
  },
  logo: {
    width: '20%',
    resizeMode: 'contain',
    height: 50,
    marginHorizontal: 0,
    margin: 5,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
    
  },
  articleheading: {
    color: '#000',
    fontWeight: 'bold',
  },
  headertext: {
    fontWeight: 'cursive',
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
  articleimage: {
    resizeMode: 'cover',
    padding: 20,
    margin: 10,
    height: 200,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 8,
  }
});

export default App;
