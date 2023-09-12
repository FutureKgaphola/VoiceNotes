import { View,Image, StyleSheet } from "react-native";

const MakeRecord = ({isAppListen}) => {
  

    return ( 
        <View style={styles.Makecontainer}>
            {isAppListen ? <Image style={styles.card} source={require('../assets/islistening.gif')} /> :
            <Image style={styles.card} source={require('../assets/microphone.png')} />}
            
        </View>
     );
}
const styles = StyleSheet.create({
    Makecontainer:{
      flex: 4,
      justifyContent:"center"
    },
    card: {
        height: 300,
        borderRadius: 5,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        margin: 15,
        padding: 5,
        aspectRatio:3/4,
        objectFit:"contain"
      }
  })
 
export default MakeRecord;