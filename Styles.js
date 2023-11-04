import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
   
        flex: 1,
       
        justifyContent: "center"


    // flex: 1,
    // flexDirection: "column",
    // paddingTop: 20
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: "#058789",
    borderRadius: 5,
    padding: 15,
    margin: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "green"
  },


});