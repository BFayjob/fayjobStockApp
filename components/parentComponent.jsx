import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import SalesHistoryTable from './SalesHistoryTable';
import AddItemPopup from './addItemPopup';

const ParentComponent = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [salesHistory, setSalesHistory] = useState([]);

  const handleAddItem = (newItem) => {
    setSalesHistory((prevHistory) => [
      ...prevHistory,
      {
        type: 'addition',
        data: [newItem.brand, newItem.size, newItem.quantity.toString(), 'Remark'],
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Button title="Add Item" onPress={() => setIsPopupVisible(true)} />
      <SalesHistoryTable salesHistory={salesHistory} />
      <AddItemPopup
        visible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
        onAddItem={handleAddItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});

export default ParentComponent;
