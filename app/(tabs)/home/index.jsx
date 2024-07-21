// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import AddItemPopup from '../../../components/addItemPopup';
import CurrentStockTable from '../../../components/currentStockTable';
import Header from '../../../components/header';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleAddItem = (item) => {
    console.log('Item added:', item);
    // Here you can handle the logic to add the item to the current stock
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />
        <TouchableOpacity style={styles.addButton} onPress={() => setPopupVisible(true)}>
          <Text style={styles.addButtonText}>Add Item</Text>
        </TouchableOpacity>
        <CurrentStockTable />
      </ScrollView>
      <AddItemPopup
        visible={isPopupVisible}
        onClose={() => setPopupVisible(false)}
        onAddItem={handleAddItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
