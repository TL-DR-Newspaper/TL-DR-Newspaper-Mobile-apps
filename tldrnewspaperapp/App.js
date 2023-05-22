// import React in our code
import React, { useState, useEffect } from 'react';
// import all the components we are going to use
import { SafeAreaView, Text,RefreshControl, ActivityIndicator,  Image, StyleSheet, View, Linking, ScrollView } from 'react-native';
import { List, DataTable } from 'react-native-paper';


const App = () => {
  const [dataSource, setDataSource] = useState([]);
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [loading, setLoading] = useState(true)


  

  useEffect(() => {
    fetch('https://tldrnewspaper.com/article/mobileapi/json')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('Data arrived');
        setDataSource(responseJson);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

   const onRefresh = React.useCallback(async () => {
    setLoading(true);
    fetch('https://tldrnewspaper.com/article/mobileapi/json')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('Data refreshed');
        setDataSource(responseJson);
        setTimeout(() => {setLoading(false)}, 2000);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [loading]);


  //Render ieach article into this component
  const ItemView = (item, key) => {
    return (
      // Flat List Item
      <View key={key}>
        <Image style={styles.articleimage} source={{ uri: `${item.imageurl}` }} />
        <Text style={styles.titlestyle} >
          {item.title}
        </Text>
        <Text style={styles.datestyle} >
          {item.pubdate}
        </Text>
        <List.Section>
        <List.Accordion
          theme={{colors: {background: 'white'}}}
          title="TL:DR - AI Summary"
          style={styles.articleheading}
          expanded={expanded}
          onPress={handlePress}>
          <Text style={styles.bodystyle} >
          {item.summary}
        </Text>
        </List.Accordion>
        <List.Accordion
          theme={{colors: {background: 'white'}}}
          title="Differences between sources">
          <Text style={styles.bodystyle} >
            {item.comparison}
          </Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Title</DataTable.Title>
              <DataTable.Title >Source</DataTable.Title>
            </DataTable.Header>

          {item.sources.map((item, key) => (
            // key is the index of the array
            // item is the single item of the array

            <DataTable.Row key={key} onPress={ ()=>{ Linking.openURL(`${item.url}`)}}>
            <DataTable.Cell>{item.title}</DataTable.Cell>
            <DataTable.Cell>{item.sourcename}</DataTable.Cell>
          </DataTable.Row>
          ))}
          </DataTable>
        </List.Accordion>
        <List.Accordion
          theme={{colors: {background: 'white'}}}
          title="Full Article">
          <Text style={styles.bodystyle} >
          {item.long_content}
        </Text>
        </List.Accordion>
      </List.Section>
        <ItemSeparatorView />
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
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.apptitle}>Headlines</Text>
        <Image style={styles.logo} source={require('./assets/logo.png')} />  
      </View>
      <View style={styles.container}>
        <Text style={styles.subtitlestyle}>The news in TL:DR format, written by AI </Text>
        <ActivityIndicator style={{paddingVertical:'50%'}} size="large" />
      </View>
    </SafeAreaView> ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.apptitle}>Headlines</Text>
        <Image style={styles.logo} source={require('./assets/logo.png')} />  
      </View>
      {ItemSeparatorView}
      <View style={styles.container}>
        {/* List Item as a function */}
        
        <ScrollView
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}>
        <Text style={styles.subtitlestyle}>The news in TL:DR format, written by AI </Text>
          {
            //render all articles
            dataSource.map(ItemView)
          }
        </ScrollView>
      </View>
    </SafeAreaView>
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
    alignSelf: 'flex-start',
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
    alignSelf: 'center',
    padding: 10,
    fontSize: 48,
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
  bodystyle: {
    padding: 10,
    fontSize: 14,

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
