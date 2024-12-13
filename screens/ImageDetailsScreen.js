import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';

const ImageDetailScreen = ({ route }) => {
  const { image } = route.params || {};  // Fallback to empty object if no image is passed

  if (!image || !image.links || !image.links[0]) {
    return <Text>Image details are unavailable</Text>;
  }

  // Safely access the image URL
  const imageUrl = image.links[0].href;

  // Get screen width to adjust for mobile and desktop responsiveness
  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{image.title || 'No Title'}</Text>
      <Image source={{ uri: imageUrl }} style={[styles.image, { width: screenWidth * 0.9 }]} /> {/* Responsive image size */}

      <Text style={styles.description}>
        {image.description || 'No description available'}
      </Text>
      <Text style={styles.author}>
        Author: {image.photographer || 'Unknown'}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  author: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default ImageDetailScreen;
