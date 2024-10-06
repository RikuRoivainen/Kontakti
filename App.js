import { StatusBar } from 'expo-status-bar';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      });

      if(data.length > 0) {
        setContacts(data);
      } else {
        Alert.alert('No contacts found');
      }
    } else {
      Alert.alert('Permission to access contacts was denied');
    }
  };

  const renderContact = ({ item }) => {
    return (
      <View style={styles.contactItem}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>
          {item.phoneNumbers && item.phoneNumbers.length > 0
            ? item.phoneNumbers[0].number 
            : 'No phone number'}
        </Text>
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
      <Button title="Get Contacts" onPress={getContacts} />
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContact}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  contactItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactPhone: {
    fontSize: 16,
    color: '#555',
  },
});
