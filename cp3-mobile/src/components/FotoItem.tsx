import React, { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { db, doc, updateDoc, deleteDoc } from '../services/firebaseConfig';

export default function FotoItem(props) {
  const [isChecked, setIsChecked] = useState(props.isChecked);
  const [imageError, setImageError] = useState(false);

  const updateIsChecked = async () => {
    const itemRef = doc(db, "fotos", props.id);
    await updateDoc(itemRef, {
      isChecked: isChecked
    });
  };

  const deleteItem = async () => {
    await deleteDoc(doc(db, "fotos", props.id));
    props.getItem();
  };

  useEffect(() => {
    updateIsChecked();
  }, [isChecked]);

  return (
    <SafeAreaView>
      <View style={style.container}>
        <Pressable onPress={deleteItem}>
          <Image
            source={require('../../assets/lixeira-semFundo.png')}
            style={{width: 40, height: 40}}
          />
        </Pressable>

        {imageError ? (
          <MaterialIcons name="image" size={50} color="black" />
        ) : (
          <Image
            source={{ uri: props.url }}
            style={style.image}
            onError={() => setImageError(true)}
          />
        )}

      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    width: 320,
    height: 300,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 5,
    alignItems: 'center'
  },
  image: {
    width: 220,
    height: 220,
    marginRight: 10
  }
});
