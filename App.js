import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Updates from 'expo-updates'

export default function App() {
  const [manifest, setManifest] = useState()
  const [message, setMessage] = useState('')
  async function handleOTAUpdates() {
    try {
      const update = await Updates.checkForUpdateAsync();
      setMessage('checkou update passou')
      if (update.isAvailable) {
        setMessage('isavailable é true')
        const result = await Updates.fetchUpdateAsync()
        setMessage('Tem result')
        if(result.manifest){
          setMessage('tem manifest')
        }
        setManifest(result.manifest)
        await Updates.reloadAsync()
      }
    } catch (error) {
      alert(`Problema com OTA: ${error}`)
    }
  }

  useEffect(() => {
    if(manifest){
      alert(JSON.stringify(manifest))
    }
  }, [manifest])


  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(manifest)}</Text>
      <Text>{message}</Text>
      <TouchableOpacity onPress={handleOTAUpdates} style={{backgroundColor: "orange", borderRadius: 0.5, padding: 5}}>
        <Text style={{color: "#fff"}}>Clique para atualizar o código</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
