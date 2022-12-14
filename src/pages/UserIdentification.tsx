import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function UserIdentification({ navigation }: { navigation: any }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFocusedUsername, setIsFocusedUsername] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleInputBlurUsername = () => {
    setIsFocusedUsername(false);
  };

  const handleInputBlurPassword = () => {
    setIsFocusedPassword(false);
  };

  const handleInputFocusUsername = () => {
    setIsFocusedUsername(true);
  };

  const handleInputFocusPassword = () => {
    setIsFocusedPassword(true);
  };

  const iconPassword = !visiblePassword ? "eye-off" : "eye";

  const handleSubmit = async () => {
    const getUsername = await AsyncStorage.getItem("@plantmanager:user");
    const getPassword = await AsyncStorage.getItem("@plantmanager:password");

    if (!username) {
      setErrorUsername("username is required");
    } else if (username !== getUsername) {
      setErrorUsername("username doesn't exist");
    } else {
      setErrorUsername("");
    }

    if (!password) {
      setErrorPassword("password is required");
    } else if (password !== getPassword) {
      setErrorPassword("password is not correct");
    } else {
      setErrorPassword("");
    }

    if (username === getUsername && password === getPassword) {
      navigation.navigate("Confirmation");
    }
  };

  const newAccount = async () => {
    navigation.navigate("UserNewAccount");
    setUsername("");
    setPassword("");
    setErrorUsername("");
    setErrorPassword("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.title}>Login</Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  isFocusedUsername && {
                    borderColor: colors.green,
                  },
                ]}
                placeholder="Type your name"
                value={username}
                onBlur={handleInputBlurUsername}
                onFocus={handleInputFocusUsername}
                autoCapitalize={"none"}
                onChangeText={(text) => setUsername(text)}
              />
              {errorUsername.length > 0 && (
                <Text style={styles.error}>{errorUsername}</Text>
              )}

              <View style={styles.containerInput}>
                <TextInput
                  style={[
                    styles.input,
                    isFocusedPassword && {
                      borderColor: colors.green,
                    },
                  ]}
                  placeholder="Type your password"
                  value={password}
                  onBlur={handleInputBlurPassword}
                  onFocus={handleInputFocusPassword}
                  autoCapitalize={"none"}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={!visiblePassword}
                />
                <MaterialCommunityIcons
                  name={iconPassword}
                  style={styles.icon}
                  onPress={() => setVisiblePassword(!visiblePassword)}
                />
                {errorPassword.length > 0 && (
                  <Text style={styles.error}>{errorPassword}</Text>
                )}
              </View>

              <View style={styles.footer}>
                <Button title="Sign in" onPress={handleSubmit} />
              </View>

              <Pressable onPress={newAccount}>
                <Text style={styles.newAccount}>
                  New account? <Text style={styles.signup}>Sign up</Text>
                </Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    marginBottom: 35,
  },
  containerInput: {
    position: "relative",
  },
  input: {
    position: "relative",
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: "100%",
    fontSize: 18,
    padding: 10,
    marginTop: 25,
  },
  icon: {
    fontSize: 24,
    color: colors.gray_icon,
    position: "absolute",
    top: 30,
    right: 10,
  },
  error: {
    color: colors.red,
    fontFamily: fonts.text,
    marginTop: 5,
    paddingLeft: 10,
  },
  footer: {
    width: "100%",
    marginTop: 50,
  },
  newAccount: {
    color: colors.heading,
    fontFamily: fonts.text,
    textAlign: "center",
    marginTop: 50,
  },
  signup: {
    fontFamily: fonts.heading,
  },
});
