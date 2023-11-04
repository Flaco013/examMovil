import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PokemonDetail = ({ route }) => {
  const { pokemon } = route.params;
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
   
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(pokemon.url);
        if (response.ok) {
          const data = await response.json();
          setPokemonDetails(data);
        } else {
          console.error('Failed to fetch Pokémon details');
        }
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    };

    fetchPokemonDetails();
  }, [pokemon]);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(
            pokemon.url
          )}.png`,
        }}
        style={styles.image}
      />
      <Text style={styles.name}>{pokemon.name}</Text>

    </View>
  );
};

const getPokemonId = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PokemonDetail;
