import React from 'react';
import { SafeAreaView ,View, Text, Image, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';

export function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Take care of your plants easily
        </Text>

        <Image 
          style={styles.image} 
          source={wateringImg}
          resizeMode="contain"
        />

        <Text style={styles.subtitle}>
          Dont ever forget again to watering your plants.
          We take care to remind you.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            >
          </Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
  image: {
    height: Dimensions.get('window').width * 0.7
  },
  buttonText: {
    color: colors.white,
    fontSize: 24
  }
})