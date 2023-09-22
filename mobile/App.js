import { useFonts } from "expo-font";
import StackNavigator from "./navigation/StackNavigator";
import { Text } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading ...</Text>;
  } else {
    return <StackNavigator />;
  }
}
