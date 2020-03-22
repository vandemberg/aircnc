import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, AsyncStorage, StyleSheet, Image } from 'react-native';

import logo from '../assets/logo.png';
import SpotList from '../assets/SpotList';

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(function (storageTechs) {
      const techsArray = storageTechs.split(',').map(storageTech => storageTech.trim());
      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 50
  }
})
