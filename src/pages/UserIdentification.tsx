import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,

} from 'react-native';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {

  async function handleSubmit(){
    
  }
  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.form}>
            <Text style={styles.emoji}>
              😄
            </Text>
            <Text style={styles.title}>
              What should we call you?
            </Text>

            <TextInput 
              style={styles.input}
              placeholder="Digite um nome"

            />

            <View style={styles.footer}>
                <Button  
                  title="Confirmar"
                  onPress={handleSubmit}
                />
            </View>
        </View>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    width: '100%'
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center'
  },
  emoji: {
    fontSize: 44
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 32,
    marginTop: 20
  },
  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20
  }
})