import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TextInput, Alert,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles';

const GenerationDetail = ({ route }) => {
  const { generationName } = route.params;
  const [pokemonList, setPokemonList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const fetchGenerationData = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/generation/${generationName}`);
      if (response.ok) {
        const data = await response.json();
        const pokemonSpecies = data.pokemon_species.map((species) => ({
          name: species.name,
          url: species.url,
        }));
        setPokemonList(pokemonSpecies);
      } else {
        console.error(`Failed to fetch data for ${generationName}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchGenerationData();
  }, [generationName]);

  const handleSearch = () => {
    const searchResult = pokemonList.find((pokemon) => pokemon.name.toLowerCase() === searchText.toLowerCase());
    if (searchResult) {
      navigation.navigate('PokemonDetail', { pokemon: searchResult });
    } else {
      Alert.alert('Pokemon Not Found', 'The entered Pokemon is not in this generation.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{generationName} Pokemon</Text>
      <TextInput
        style={localStyles.input}
        placeholder="Search for a Pokemon"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
       <TouchableOpacity style={localStyles.button} onPress={handleSearch}>
        <Text style={localStyles.buttonText}>Search</Text>
      </TouchableOpacity>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PokemonDetail', { pokemon: item });
            }}
          >
            <View style={styles.card} key={item.name}>
              <Image
                source={{
                  uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(
                    item.url
                  )}.png`,
                }}
                style={styles.image}
              />
              <Text style={styles.name}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const getPokemonId = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};


const localStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    margin: 10,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default GenerationDetail;

