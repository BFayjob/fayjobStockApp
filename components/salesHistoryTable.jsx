import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const initialSalesHistory = {
  tableHead: ['Brand', 'Size', 'QTY Sold/Added', 'Remark', 'Action'],
  tableData: [
    { type: 'sale', data: ['BrandA', '10mm', '50', 'Remark 1'] },
    { type: 'addition', data: ['BrandB', '12mm', '30', 'Remark 2'] },
    { type: 'sale', data: ['BrandC', '15mm', '70', 'Remark 3'] },
    { type: 'sale', data: ['BrandA', '10mm', '50', 'Remark 1'] },
    { type: 'addition', data: ['BrandB', '12mm', '30', 'Remark 2'] },
    { type: 'sale', data: ['BrandC', '15mm', '70', 'Remark 3'] },
    { type: 'sale', data: ['BrandA', '10mm', '50', 'Remark 1'] },
    { type: 'addition', data: ['BrandB', '12mm', '30', 'Remark 2'] },
    { type: 'sale', data: ['BrandC', '15mm', '70', 'Remark 3'] },
    { type: 'sale', data: ['BrandA', '10mm', '50', 'Remark 1'] },
    { type: 'addition', data: ['BrandB', '12mm', '30', 'Remark 2'] },
    { type: 'sale', data: ['BrandC', '15mm', '70', 'Remark 3'] },
    { type: 'sale', data: ['BrandA', '10mm', '50', 'Remark 1'] },
    { type: 'addition', data: ['BrandB', '12mm', '30', 'Remark 2'] },
    { type: 'sale', data: ['BrandC', '15mm', '70', 'Remark 3'] },
    { type: 'sale', data: ['BrandA', '10mm', '50', 'Remark 1'] },
    { type: 'addition', data: ['BrandB', '12mm', '30', 'Remark 2'] },
    { type: 'sale', data: ['BrandC', '15mm', '70', 'Remark 3'] },
    { type: 'sale', data: ['BrandA', '10mm', '50', 'Remark 1'] },
    { type: 'addition', data: ['BrandB', '12mm', '30', 'Remark 2'] },
    { type: 'sale', data: ['BrandC', '15mm', '70', 'Remark 3'] },
    { type: 'sale', data: ['BrandA', '10mm', '50', 'Remark 1'] },
    { type: 'addition', data: ['BrandB', '12mm', '30', 'Remark 2'] },
    { type: 'sale', data: ['BrandC', '15mm', '70', 'Remark 3'] },
    { type: 'sale', data: ['BrandA', '10mm', '50', 'Remark 1'] },
    { type: 'addition', data: ['BrandB', '12mm', '30', 'Remark 2'] },
    { type: 'sale', data: ['BrandC', '15mm', '70', 'Remark 3'] },
    { type: 'sale', data: ['BrandA', '10mm', '50', 'Remark 1'] },
    { type: 'addition', data: ['BrandB', '12mm', '30', 'Remark 2'] },
    { type: 'sale', data: ['BrandC', '15mm', '70', 'Remark 3'] },
  ],
};

const SalesHistoryTable = () => {
  const [salesHistory, setSalesHistory] = useState(initialSalesHistory);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDelete = (rowIndex) => {
    Alert.alert('Delete Record', `Are you sure you want to delete record ${rowIndex + 1}?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          const updatedData = salesHistory.tableData.filter((_, index) => index !== rowIndex);
          setSalesHistory({ ...salesHistory, tableData: updatedData });
        },
      },
    ]);
  };

  const filteredData = salesHistory.tableData; // Filter logic not needed as we don't filter by date in this example

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Sales History</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
          <Text style={styles.datePickerText}>
            {selectedDate ? selectedDate.toDateString() : 'Select date'}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        <Table>
          <Row data={salesHistory.tableHead} style={styles.head} textStyle={styles.headText} />
          {filteredData.map((record, index) => (
            <View
              key={index}
              style={[styles.row, record.type === 'sale' ? styles.saleRow : styles.additionRow]}>
              {record.data.map((cellData, cellIndex) => (
                <View key={cellIndex} style={styles.cell}>
                  <Text
                    style={[
                      styles.text,
                      record.type === 'sale' ? styles.saleText : styles.additionText,
                    ]}>
                    {cellData}
                  </Text>
                </View>
              ))}
              <View style={styles.cell}>
                <TouchableOpacity onPress={() => handleDelete(index)}>
                  <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Table>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  datePickerButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  datePickerText: {
    fontSize: 18,
    textAlign: 'center',
  },
  head: { height: 44, backgroundColor: 'white' },
  headText: { fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: 'black' },
  row: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: 'white',
  },
  saleRow: {
    backgroundColor: 'white',
  },
  additionRow: {
    backgroundColor: 'white',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  text: {
    margin: 6,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saleText: {
    color: 'red',
  },
  additionText: {
    color: 'green',
  },
});

export default SalesHistoryTable;
