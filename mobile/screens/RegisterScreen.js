import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import React, { useState } from "react";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {};
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 50,
              fontWeight: "thin",
              marginTop: 80,
              color: "#132339",
              fontFamily: "Poppins-Bold",
            }}
          >
            Register
          </Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderBottomWidth: 2,
              borderColor: "#81aded",
              paddingVertical: 8,
              paddingHorizontal: 6,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={[
                {
                  paddingLeft: 5,
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: email ? 16 : 16,
                },
                styles.text,
              ]}
              placeholder="Enter your Email"
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderBottomWidth: 2,
              borderColor: "#81aded",
              paddingVertical: 8,
              paddingHorizontal: 6,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={
                ([
                  {
                    paddingLeft: 5,
                    color: "gray",
                    marginVertical: 10,
                    width: 300,
                    color: "#007FFF",
                  },
                ],
                styles.text)
              }
              placeholder="Enter your Password"
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderBottomWidth: 2,
              borderColor: "#81aded",
              paddingVertical: 8,
              paddingHorizontal: 6,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <TextInput
              value={password}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={true}
              style={
                ([
                  {
                    paddingLeft: 5,
                    color: "gray",
                    marginVertical: 10,
                    width: 300,
                    color: "#007FFF",
                  },
                ],
                styles.text)
              }
              placeholder="Confirm your password"
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Text style={[{ color: "#007FFF" }, styles.text]}>
            Forgot Password
          </Text>
        </View>

        <View style={{ marginTop: 40 }}></View>

        <Pressable
          style={{
            backgroundColor: "#3386ff",
            borderRadius: 6,
            paddingVertical: 20,
          }}
          onPress={handleLogin}
        >
          <Text
            style={[
              {
                textAlign: "center",
                color: "white",
                fontFamily: "Poppins-Bold",
                fontSize: 18,
              },
            ]}
          >
            Login
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Login")}
          style={{ marginTop: 15 }}
        >
          <Text style={[{ textAlign: "center", color: "gray" }, styles.text]}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins-Light",
    fontSize: 16,
  },
});
