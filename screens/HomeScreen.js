import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, RefreshControl, Dimensions, ScrollView } from 'react-native';
import { fetchImages } from '../api/fetchImages';  // Função que consome a API
import { Picker } from '@react-native-picker/picker';  // Usando o Picker da biblioteca React Native

const HomeScreen = ({ navigation }) => {
  const [category, setCategory] = useState('earth');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Página inicial
  const [totalImages, setTotalImages] = useState(0); // Total de imagens
  const [isRefreshing, setIsRefreshing] = useState(false); // Controle do Pull to Refresh

  // Função para carregar imagens da API (com paginação)
  const loadImages = async (category, page = 1) => {
    setLoading(true);
    const newImages = await fetchImages(category, page);
    setImages((prevImages) => (page === 1 ? newImages : [...prevImages, ...newImages])); // Append ou replace
    setTotalImages(100); // Definido como 100 apenas como exemplo, pois a API não retorna o total de imagens disponível
    setLoading(false);
  };

  // Carrega as imagens ao alterar a categoria ou ao puxar para atualizar
  useEffect(() => {
    setImages([]);  // Reseta as imagens sempre que a categoria mudar
    setPage(1);  // Reseta a página para 1 ao mudar de categoria
    loadImages(category, 1);  // Sempre começa a página 1
  }, [category]);

  // Função para carregar mais imagens ao rolar até o final
  const loadMoreImages = () => {
    if (!loading) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        loadImages(category, nextPage);
        return nextPage;
      });
    }
  };

  // Função para o Pull to Refresh
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setPage(1); // Reseta a página para 1
    loadImages(category, 1).then(() => setIsRefreshing(false)); // Carrega as imagens novamente
  }, [category]);

  const progress = totalImages ? Math.min((images.length / totalImages) * 100, 100) : 0; // Impede que a barra ultrapasse 100%

  // Responsividade da tela
  const screenWidth = Dimensions.get('window').width;
  const imageSize = screenWidth / 7 - 20; // Ajusta o tamanho das imagens para ocupar 25% da tela com espaçamento

  return (
    <ScrollView contentContainerStyle={styles.container}> {/* Adicionando rolagem para a página inteira */}
      <Text style={styles.title}>Galeria NASA</Text>

      {/* Seletor de categorias (centralizado com texto à direita) */}
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Escolha uma Categoria:</Text>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue) => setCategory(itemValue)} // Atualiza a categoria
        >
          <Picker.Item label="Sol" value="sun" />
          <Picker.Item label="Terra" value="earth" />
          <Picker.Item label="Lua" value="moon" />
          <Picker.Item label="Marte" value="mars" />
          <Picker.Item label="Júpiter" value="jupiter" />
        </Picker>
      </View>

      {/* Barra de progresso */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {Math.round(progress)}% Carregado
        </Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
      </View>

      {/* Exibe o botão de carregamento ou as imagens */}
      {loading && page === 1 ? (
        <Text style={styles.loadingText}>Carregando imagens...</Text>
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          numColumns={4}  // Exibe as imagens em 4 colunas para ocupar bem a tela
          columnWrapperStyle={styles.row}  // Estilo para controlar o espaçamento entre as imagens
          renderItem={({ item }) => (
            <View style={[styles.imageCard, { width: imageSize }]}> {/* Responsivo, ajusta as imagens com base na largura da tela */}
              {/* Verificação de segurança para garantir que links existam */}
              {item.links && item.links[0] ? (
                <Image
                  source={{ uri: item.links[0].href }}
                  style={[styles.image, { width: imageSize, height: imageSize, resizeMode: 'cover' }]} // Tamanho da imagem ajustado
                />
              ) : (
                <Text>Imagem indisponível</Text>
              )}
              <Button
                title="Ver Detalhes"
                onPress={() => navigation.navigate('Detalhes da Imagem', { image: item })}
              />
            </View>
          )}
          onEndReached={loadMoreImages}  // Carrega mais imagens quando o final da lista é atingido
          onEndReachedThreshold={0.5}  // Quando o final da lista chegar a 50%, começa a carregar mais
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F0F4F8',  // Cor de fundo suave
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2A3D3F',  // Cor escura suave para o título
    marginBottom: 20,
  },
  pickerContainer: {
    width: '80%',  // Centraliza o Picker
    marginBottom: 20,
    alignItems: 'center',  // Centraliza o conteúdo dentro do Picker
  },
  pickerLabel: {
    fontSize: 16,
    color: '#4F5D75',  // Cor suave para o texto do seletor
    marginBottom: 10,
  },
  picker: {
    width: '100%',  // Largura ajustada para preencher a área
    height: 40,  // Altura reduzida para ficar mais fino
    backgroundColor: '#FFF',  // Cor de fundo do seletor
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D9E6',  // Cor de borda suave
    textAlign: 'right',  // Alinha o texto à direita
    paddingRight: 10,  // Adiciona um pouco de espaçamento à direita
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
  imageCard: {
    marginBottom: 16,
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,  // Sombra para dar um efeito elevado nas imagens
  },
  image: {
    borderRadius: 8,
  },
  row: {
    justifyContent: 'space-around',  // Ajusta para que as imagens fiquem bem distribuídas
    marginBottom: 10,
  },
  progressContainer: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 16,
  },
  progressText: {
    fontSize: 14,
    color: '#4F5D75',
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#D1D9E6',
    borderRadius: 8,
    marginTop: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',  // Cor verde para a barra de progresso
    borderRadius: 8,
  },
});

export default HomeScreen;
