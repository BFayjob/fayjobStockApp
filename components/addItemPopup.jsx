// components/AddItemPopup.js
import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const brands = [
  { label: 'Bluercrown', value: 'BlueCrown', sizes: ['2mm', '3mm', '4mm', '6mm', '9mm'] },
  { label: 'Ace', value: 'Ace', sizes: ['3mm', '4mmRL', '4mmGL', '6mm', '8mm'] },
  { label: 'EcoFloat', value: 'EcoFloat', sizes: ['3mm', '4mm', '6mm', '9mm'] },
  {
    label: 'Coppens',
    value: 'Coppens',
    sizes: ['0.2mm', '0.3mm', '0.5mm', '0.8mm', '1.2mm', '1.5mm', '2mm'],
  },
  { label: 'Aqualis', value: 'Aqualis', sizes: ['2mm'] },
];

const AddItemPopup = ({ visible, onClose, onAddItem }) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAddItem = async () => {
    if (selectedBrand && selectedSize && quantity) {
      try {
        const newItem = {
          brand: selectedBrand,
          size: selectedSize,
          quantity: parseInt(quantity, 10),
          remark: 'Some remark', // Adjust this as needed
        };

        const response = await axios.post('http://localhost:5432/api/items', newItem); // Update the endpoint
        const addedItem = response.data;

        onAddItem(addedItem);
        setSelectedBrand('');
        setSelectedSize('');
        setQuantity('');
        onClose(); // Close the popup after adding the item
      } catch (error) {
        alert('Error', 'There was an error adding the item. Please try again.');
        console.error('Error adding item:', error);
      }
    } else {
      alert('Please fill all fields');
    }
  };

  const brandOptions = brands.map((brand) => ({ label: brand.label, value: brand.value }));

  const sizeOptions =
    brands
      .find((brand) => brand.value === selectedBrand)
      ?.sizes.map((size) => ({ label: size, value: size })) || [];

  return (
    <Modal transparent={true} animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Add Item</Text>

          <RNPickerSelect
            placeholder={{ label: 'Select Brand', value: null }}
            items={brandOptions}
            onValueChange={(value) => setSelectedBrand(value)}
            value={selectedBrand}
            style={pickerSelectStyles}
          />

          {selectedBrand && (
            <RNPickerSelect
              placeholder={{ label: 'Select Size', value: null }}
              items={sizeOptions}
              onValueChange={(value) => setSelectedSize(value)}
              value={selectedSize}
              style={pickerSelectStyles}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={handleAddItem}>
            <Text style={styles.buttonText}>ADD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: 'red',
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  inputAndroid: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});

export default AddItemPopup;
