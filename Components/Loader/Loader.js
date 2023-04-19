import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function Loading() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    }}>
      <ActivityIndicator size="large" color = "blue" />
    </View>
  );
}
