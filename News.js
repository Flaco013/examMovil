// import React, { useState, useEffect } from "react";
// import { View, Text, FlatList, StyleSheet } from "react-native";
// import styles from "./Styles";
// import PokemonCard from "./PokemonCard";
// import Generation from "./Generation"; // Import the Generations component
// import { TouchableOpacity } from "react-native-gesture-handler";


// export default function News({ navigation }) {
//   const [generationData, setGenerationData] = useState([]);

//   useEffect(() => {
//     const fetchGenerationData = async () => {
//       try {
//         const response = await fetch('https://pokeapi.co/api/v2/generation');
//         if (response.ok) {
//           const data = await response.json();
//           setGenerationData(data.results);
//         } else {
//           console.error('Failed to fetch generation data');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchGenerationData();
//   }, []);

//   return (
//     <View>
//       <Text  style={styles.title}>Generations of Pokemon</Text>
//       {generationData.map((generation) => (
//         <TouchableOpacity key={generation.name} onPress = {() =>{
//           navigation.navigate('GenerationDetail', { generationName: generation.name });
//         }}
//         style={styles.card}
//       >
//           <Text style={styles.name}>{generation.name}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };


// News.navigationOptions = {
//   title: "News"
// };