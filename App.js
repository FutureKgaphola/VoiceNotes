import { StyleSheet } from "react-native";
import { ProfileProvider } from "./Manager/ProfileManager";
import LoginScreen from "./screen/Login";
import HomeRecorder from "./screen/HomeRecorder";
import Forgotpassword from "./screen/Forgotpassword";
import RegistrationPage from "./screen/Register";
import Profile from "./screen/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const options={title:'',headerShown: false};
export default function App() {
  return (
    <ProfileProvider>
    <NavigationContainer>
       <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={options}/>
        <Stack.Screen name="HomeRecorder" component={HomeRecorder} options={options}/>
        <Stack.Screen name="Forgotpassword" component={Forgotpassword} options={options}/> 
        <Stack.Screen name="RegistrationPage" component={RegistrationPage} options={options}/>
        <Stack.Screen name="Profile" component={Profile} options={options}/>
      </Stack.Navigator>
    </NavigationContainer>
    </ProfileProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
