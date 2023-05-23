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
  apptitle: {
    padding: 10,
    fontSize: 32,
    fontWeight: 'bold',
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
});

export default App;
