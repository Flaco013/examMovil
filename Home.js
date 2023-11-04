// import React, { useState, useEffect } from "react";
// import { View, Text, FlatList } from "react-native";
// import styles from "./Styles";
// import PokemonCard from "./PokemonCard";

// export default function Home({ navigation }) {
//   const [pokemonData, setPokemonData] = useState([]);
//   const maxPokemonId = 20; // Change this to fetch more Pokémon

//   useEffect(() => {
//     const fetchPokemonData = async () => {
//       const data = [];
//       for (let id = 1; id <= maxPokemonId; id++) {
//         try {
//           const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
//           if (response.ok) {
//             const pokemon = await response.json();
//             data.push(pokemon);
//           } else {
//             console.error(`Failed to fetch Pokemon with ID ${id}`);
//           }
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       }
//       setPokemonData(data);
//     };
//     fetchPokemonData();
//   }, [maxPokemonId]);

//   return (
//     <View style={styles.container}>
//       {pokemonData.length > 0 ? (
//         <FlatList
//           data={pokemonData}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => <PokemonCard pokemon={item} />}
//         />
//       ) : (
//         <Text>Loading...</Text>
//       )}
//     </View>
//   );
// }

// Home.navigationOptions = {
//   title: "Home"
// };

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import styles from './Styles';


export default function Home({ navigation }) {
  const [generationData, setGenerationData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchGenerationData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/generation');
        if (response.ok) {
          const data = await response.json();
          setGenerationData(data.results);
        } else {
          console.error('Failed to fetch generation data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchGenerationData();
  }, []);

  const handleSearch = () => {
    // Check if the search input matches any generation name
    const foundGeneration = generationData.find((generation) =>
      generation.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (foundGeneration) {
      navigation.navigate('GenerationDetail', { generationName: foundGeneration.name });
    } else {
      Alert.alert('Not Found', `No information found for generation: ${searchInput}`);
    }
  };

  return (
    <ScrollView>
      <Text style={styles.title}>Generations of Pokemon</Text>
      <TextInput
        placeholder="Search Generation..."
        style={localStyles.input}
        value={searchInput}
        onChangeText={(text) => setSearchInput(text)}
      />
      <TouchableOpacity style={localStyles.button} onPress={handleSearch}>
        <Text style={localStyles.buttonText}>Search</Text>
      </TouchableOpacity>
      {generationData.map((generation) => (
        <TouchableOpacity
          key={generation.name}
          onPress={() => {
            navigation.navigate('GenerationDetail', { generationName: generation.name });
          }}
          style={styles.card}
        >
          <Text style={styles.name}>{generation.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

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
