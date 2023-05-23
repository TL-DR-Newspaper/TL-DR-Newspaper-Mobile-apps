import React from 'react';
import {Text, ActivityIndicator,  Image, View, ImageBackground } from 'react-native';

const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View style={{
        height: 0.5,
        width: '100%',
        backgroundColor: '#C8C8C8',
        marginBottom: 20,
      }} />
    );
  };

export default ItemSeparatorView;