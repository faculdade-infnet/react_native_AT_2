// components/ProgressBar.js
import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ProgressBar = ({ progress }) => {
  return (
    <View style={{ marginVertical: 10, alignItems: 'center' }}>
      <Text>Progresso: {Math.round(progress * 100)}%</Text>
      <View style={{ width: 200, height: 10, borderRadius: 5, overflow: 'hidden' }}>
        <LinearGradient
          colors={['#4c9aff', '#1e60d6']}
          start={{ x: 0, y: 0 }}
          end={{ x: progress, y: 0 }}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
};

export default ProgressBar;
