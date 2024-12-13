// components/ImageCard.js
import React from 'react';
import { View, Text, Image, Button } from 'react-native';

const ImageCard = ({ item, onPress }) => {
  // Verificar se 'links' e 'data' existem antes de usá-los
  if (!item || !item.links || !item.links[0] || !item.data || !item.data[0]) {
    return null;  // Não renderiza nada se o item não tiver as propriedades esperadas
  }

  return (
    <View style={{ marginBottom: 20, alignItems: 'center' }}>
      <Image
        source={{ uri: item.links[0].href }}
        style={{ width: 200, height: 200 }}
      />
      <Text>{item.data[0].title}</Text>
      <Button title="Ver Detalhes" onPress={() => onPress(item)} />
    </View>
  );
};

export default ImageCard;
