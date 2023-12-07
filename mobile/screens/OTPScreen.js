import {
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Icon } from "@rneui/themed";

const OTPScreen = () => {
  const [otpCode, setOtpCode] = useState("");
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
      <Stack.Screen
        options={{
          title: "",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "blue",
          },
          headerShadowVisible: false,
          headerLeft: () => <Icon name="rowing" />,
        }}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 50,
              fontWeight: "thin",
              marginTop: 60,
              color: "#132339",
              fontFamily: "Poppins-Bold",
            }}
          >
            Register
          </Text>
        </View>

        <View style={{ marginTop: 0 }}>
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
              value={otpCode}
              onChangeText={(text) => setOtpCode(text)}
              style={[
                {
                  paddingLeft: 5,
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: 16,
                },
                styles.text,
              ]}
              placeholder="Enter OTP code"
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
            Submit
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Login")}
          style={{ marginTop: 15 }}
        >
          <Text style={[{ textAlign: "center", color: "gray" }, styles.text]}>
            OTP has not been sent? Resend now
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins-Light",
    fontSize: 16,
  },
});
