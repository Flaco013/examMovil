import React, { useState, useEffect } from "react";
import { View, Text, FlatList,StyleSheet } from "react-native";
import styles from "./Styles";
import PokemonCard from "./PokemonCard";

export default function Settings({ navigation }) {
    const [pokemonData, setPokemonData] = useState([]);
    const maxPokemonId = 9; // Change this to fetch more Pokémon
  
    useEffect(() => {
      const fetchPokemonData = async () => {
        const data = [];
        for (let id = 1; id <= maxPokemonId; id++) {
          try {
            const response = await fetch(`https://pokeapi.co/api/v2/generation/${id}`);
            if (response.ok) {
              const pokemon = await response.json();
              data.push(pokemon);
            } else {
              console.error(`Failed to fetch Pokemon with ID`);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
        setPokemonData(data);
      };
      fetchPokemonData();
    }, [maxPokemonId]);
  
    return (
      <View style={styles.container}>
        {pokemonData.length > 0 ? (
          <FlatList
            data={pokemonData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <PokemonCard pokemon={item} />}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  }
Settings.navigationOptions = {
  title: "Settings"
};