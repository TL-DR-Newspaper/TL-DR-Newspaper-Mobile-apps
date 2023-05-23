// import React in our code
import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text,RefreshControl, ActivityIndicator,  Image, StyleSheet, View, Linking, ScrollView, ImageBackground } from 'react-native';
import { DataTable } from 'react-native-paper';
import FlipCard from 'react-native-flip-card'

const App = () => {
  const [dataSource, setDataSource] = useState([]);
  const [dataRecent, setDataRecent] = useState([]);
  const [frontpageSource, setfrontpageSource] = useState([]);
  const [weatherSource, setWeatherSource] = useState([]);
  const [expanded, setExpanded] = React.useState(true);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    setLoading(true);
    fetch('https://tldrnewspaper.com/article/mobileapi/sources')
      .then((response) => response.json())
      .then((responseJson) => {
        setDataSource(responseJson);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
    fetch('https://tldrnewspaper.com/article/mobileapi/recent')
      .then((response) => response.json())
      .then((responseJson) => {
        setDataRecent(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
    fetch('https://tldrnewspaper.com/article/mobileapi/random')
      .then((response) => response.json())
      .then((responseJson) => {
        setfrontpageSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
    fetch('https://samples.openweathermap.org/data/2.5/weather?q=London&appid=b1b15e88fa797225412429c1c50c122a1')
      .then((response) => response.json())
      .then((responseJson) => {
        setWeatherSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

   const onRefresh = React.useCallback(async () => {
    setLoading(true);
    fetch('https://tldrnewspaper.com/article/mobileapi/sources')
      .then((response) => response.json())
      .then((responseJson) => {
        setDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
    fetch('https://tldrnewspaper.com/article/mobileapi/recent')
      .then((response) => response.json())
      .then((responseJson) => {
        setDataRecent(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
    fetch('https://tldrnewspaper.com/article/mobileapi/random')
      .then((response) => response.json())
      .then((responseJson) => {
        setfrontpageSource(responseJson);
    
      })
      .catch((error) => {
        console.error(error);
      });
      setLoading(false);
  }, [loading]);


  //Render ieach article into this component
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
            <Text style={styles.subtitlestyledark}>Full article comparison</Text>
            <Text style={styles.bodystyledark} >{item.long_content}</Text>
            </ScrollView>
          </View>
        </FlipCard>
        <ItemSeparatorView />
      </View>
    );
  };

  const CardView = (item, key) => {
    return (
      // Flat List Item
      <View key={key} style={{maxHeight: 1200}}>
        <FlipCard>
          {/* Face Side */}
          <View>
            <ImageBackground style={styles.headlinecard}resizeMode="cover" imageStyle={{ borderRadius: 6}} source={{ uri: `${item.imageurl}` }}>
              <Text style={styles.headlinecardtext}>{item.title}</Text>
            </ImageBackground>
          </View >
          {/* Back Side */}
            <View style={{height:1200, width:300, backgroundColor:"#111827", borderRadius:10}}>
              <Text style={styles.subtitlestyledark}>TL:DR</Text>
              <Text style={styles.bodystyledark }>{item.summary}</Text>
            </View>
        </FlipCard>
      </View>
      



    );
  };

  // A component to separate each article
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View style={styles.itemSeparatorStyle} />
    );
  };


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
      <View style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}>
        <View style={{height:40}}></View>
        <View style={{height:100, flexDirection:'row', paddingHorizontal:10}}>
        <ImageBackground style={{flex:1, margin:4 }}resizeMode="cover" imageStyle={{ borderRadius: 10}} source={require('./assets/logo.png')}>
        </ImageBackground>
        <View style={{flex:2 , borderColor: 'lightgrey', borderWidth: 0, backgroundColor: 'white', margin:4, borderRadius:10, alignItems:'center', justifyContent:'center'}}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
        <Image
            style={{width: 50, height: 50}}
            source={{
              uri: 'https://openweathermap.org/img/wn/'+String(weatherSource.weather[0].icon)+'@2x.png',
            }}
          />
          <Text style={{fontWeight:'bold', fontSize:24}}>{Math.round(weatherSource.main.temp/10)} C°</Text>
        </View>
          <Text>{weatherSource.weather[0].description}</Text>
          <Text>Windspeed: {weatherSource.wind.speed}</Text>
        </View>
      </View>
      <Text style={styles.apptitle}>Front page</Text>


      <FlipCard>
      {/* Face Side */}
      <View>
      <ImageBackground style={styles.frontpagecard}resizeMode="cover" imageStyle={{ borderRadius: 6}} source={{ uri: `${frontpageSource[0].imageurl}` }}>
        <Text style={styles.headlinecardtext}>{frontpageSource[0].title}</Text>
        <ItemSeparatorView />
      </ImageBackground>
      </View >
      {/* Back Side */}
      <View style={{flex:1, width:"100%", backgroundColor:"#111827", borderRadius:20}}>
        <ScrollView>
        <Text style={styles.apptitledark}>{frontpageSource[0].title}</Text>
        <Text style={styles.datestyle} >
          {frontpageSource[0].pubdate}
        </Text>
        <Text style={styles.subtitlestyledark}>Summary</Text>
        <Text style={styles.bodystyledark}>{frontpageSource[0].summary}</Text>
        <Image style={styles.frontpagecard}resizeMode="cover" imageStyle={{ borderRadius: 6}} source={{ uri: `${frontpageSource[0].imageurl}` }}></Image>
        <Text style={styles.subtitlestyledark}>Source comparison</Text>
        <Text style={styles.bodystyledark} >{frontpageSource[0].comparison}</Text>
        <DataTable textStyle={{color:'white'}}>
            <DataTable.Header>
              <DataTable.Title textStyle={{color:'white'}}>Source</DataTable.Title>
              <DataTable.Title textStyle={{color:'white'}}>Title</DataTable.Title>
            </DataTable.Header>

          {frontpageSource[0].sources.map((item, key) => (
            // key is the index of the array
            // item is the single item of the array

            <DataTable.Row key={key} onPress={ ()=>{ Linking.openURL(`${item.url}`)}}>
            <DataTable.Cell textStyle={{color:'white'}}>{item.sourcename}</DataTable.Cell>
            <DataTable.Cell textStyle={{color:'white'}}>{item.title}</DataTable.Cell>
          </DataTable.Row>
          ))}
          </DataTable>
        <Text style={styles.subtitlestyledark}>Full article comparison</Text>
        <Text style={styles.bodystyledark} >{frontpageSource[0].long_content}</Text>
        </ScrollView>
      </View>
    </FlipCard>
      <Text style={styles.apptitle}>Summaries</Text>
      <Text style={styles.subtitlestyle}>Just TL:DR</Text>


      <View style={{height:250, flexDirection:'row', paddingLeft:10}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {
            //render all articles
            dataSource.map(CardView)
          }

          
        </ScrollView>
      </View>
      <Text style={styles.apptitle}>Latest</Text>
      <Text style={styles.subtitlestyle}>Most recent</Text>
          {
            //render all articles
            dataRecent.map(ItemView)
          }
        </ScrollView>
      </View>
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
  itemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
    marginBottom: 20,
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
