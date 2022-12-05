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
  Alert,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function UserNewAccount({ navigation }: { navigation: any }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isFocusedUsername, setIsFocusedUsername] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedPasswordConfirm, setIsFocusedPasswordConfirm] = useState(false);
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePasswordConfirm, setVisiblePasswordConfirm] = useState(false);

  const handleInputBlurUsername = () => {
    setIsFocusedUsername(false);
  };

  const handleInputBlurPassword = () => {
    setIsFocusedPassword(false);
  };

  const handleInputBlurPasswordConfirm = () => {
    setIsFocusedPasswordConfirm(false);
  };

  const handleInputFocusUsername = () => {
    setIsFocusedUsername(true);
  };

  const handleInputFocusPassword = () => {
    setIsFocusedPassword(true);
  };

  const handleInputFocusPasswordConfirm = () => {
    setIsFocusedPasswordConfirm(true);
  };

  const iconPassword = !visiblePassword ? "eye-off" : "eye";
  const iconPasswordConfirm = !visiblePasswordConfirm ? "eye-off" : "eye";

  const handleSubmit = async () => {
    if (!username) {
      setErrorUsername("username is required");
    } else {
      setErrorUsername("");
    }

    if (!password) {
      setErrorPassword("password is required");
    } else {
      setErrorPassword("");
    }

    if (!passwordConfirm) {
      setErrorPasswordConfirm("password is required");
    } else {
      setErrorPasswordConfirm("");
    }

    if (password !== passwordConfirm) {
      setErrorPassword("password aren't the same");
      setErrorPasswordConfirm("password aren't the same");
    }

    if (username && password && password === passwordConfirm) {
      Alert.alert("User sign up with success");
      navigation.navigate("UserIdentification");
      setUsername("");
      setPassword("");
      setPasswordConfirm("");
    }

    try {
      await AsyncStorage.setItem("@plantmanager:user", username);
      await AsyncStorage.setItem("@plantmanager:password", password);
    } catch (error) {
      Alert.alert("Error saving data" + error);
    }
  };

  const goBack = () => {
    navigation.navigate("UserIdentification");
    setUsername("");
    setPassword("");
    setPasswordConfirm("");
    setErrorUsername("");
    setErrorPassword("");
    setErrorPasswordConfirm("");
  };

  const clearLocalStorage = async () => {
    try {
      AsyncStorage.clear();
      Alert.alert("Cleared");
    } catch (error) {
      Alert.alert("Error" + error);
    }
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
                <Text style={styles.title}>New Account</Text>
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

              <View>
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

              <View>
                <TextInput
                  style={[
                    styles.input,
                    isFocusedPasswordConfirm && {
                      borderColor: colors.green,
                    },
                  ]}
                  placeholder="Type your password confirm"
                  value={passwordConfirm}
                  onBlur={handleInputBlurPasswordConfirm}
                  onFocus={handleInputFocusPasswordConfirm}
                  autoCapitalize={"none"}
                  onChangeText={(text) => setPasswordConfirm(text)}
                  secureTextEntry={!visiblePasswordConfirm}
                />
                <MaterialCommunityIcons
                  name={iconPasswordConfirm}
                  style={styles.icon}
                  onPress={() => setVisiblePasswordConfirm(!visiblePasswordConfirm)}
                />
                {errorPasswordConfirm.length > 0 && (
                  <Text style={styles.error}>{errorPasswordConfirm}</Text>
                )}
              </View>

              <View style={styles.footer}>
                <Button title="Sign up" onPress={handleSubmit} />
              </View>
              <Pressable onPress={goBack}>
                <Text style={styles.account}>
                  Already have an account?{" "}
                  <Text style={styles.goback}>Go back</Text>
                </Text>
              </Pressable>
              <Pressable onPress={clearLocalStorage}>
                <Text style={styles.clear}>clear storage</Text>
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
  account: {
    color: colors.heading,
    fontFamily: fonts.text,
    textAlign: "center",
    marginTop: 50,
  },
  goback: {
    fontFamily: fonts.heading,
  },
  clear: {
    color: colors.heading,
    fontFamily: fonts.text,
    textAlign: "center",
    marginTop: 50,
  },
});
