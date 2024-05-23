import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View, FlatList, Image, KeyboardAvoidingView  } from 'react-native';
import FotoItem from './src/components/FotoItem';
import { SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { app, db, getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from './src/services/firebaseConfig';
import { useState, useEffect } from 'react';

export default function App() {
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoList, setPhotoList] = useState([]);

  const addItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "fotos"), {
        url: photoUrl,
        isChecked: false
      });
      alert("FOTO CADASTRADA");
      setPhotoUrl('');
      getItem();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getItem = async () => {
    let d = [];
    const querySnapshot = await getDocs(collection(db, "fotos"));
    querySnapshot.forEach((doc) => {
      const fotos = {
        id: doc.id,
        url: doc.data().url,
        isChecked: doc.data().isChecked
      };
      d.push(fotos);
    });
    setPhotoList(d);
  };

  const deleteItemList = async () => {
    const pegandoItems = await getDocs(collection(db, "fotos"));
    pegandoItems.docs.map((item) => deleteDoc(doc(db, "fotos", item.id)));
    getItem();
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Galeria de Fotos</Text>
        <Text style={styles.numItem}>{photoList.length}</Text>
        <Pressable onPress={deleteItemList}>
          <MaterialIcons name="delete" size={24} color="black" />
        </Pressable>
      </View>

      {photoList.length > 0 ? (
        <FlatList
          data={photoList}
          renderItem={({ item }) => (
            <FotoItem
              url={item.url}
              isChecked={item.isChecked}
              id={item.id}
              getItem={getItem}
            />
          )}
        />
      ) : <ActivityIndicator />}
      
      <TextInput
        style={styles.txtInput}
        placeholder='Digite a URL da foto...'
        value={photoUrl}
        onChangeText={(value) => setPhotoUrl(value)}
        onSubmitEditing={addItem}
      />
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  headerTxt: {
    fontSize: 25,
    fontWeight: '500',
    flex: 1
  },
  numItem: {
    fontSize: 25,
    fontWeight: '500',
    marginRight: 20
  },
  txtInput: {
    backgroundColor: 'lightgrey',
    padding: 10,
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 10
  }
});
