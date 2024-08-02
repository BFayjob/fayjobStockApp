// components/SalesHistoryTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { MaterialIcons } from '@expo/vector-icons';

const SalesHistoryTable = () => {
  const [salesHistory, setSalesHistory] = useState({
    tableHead: ['Brand', 'Size', 'QTY Sold/Added', 'Remark', 'Action'],
    tableData: [],
  });

  useEffect(() => {
    const fetchSalesHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5432/api/saleshistory'); // Updated endpoint
        const fetchedData = response.data.map((item) => ({
          id: item._id, // Assuming each item has a unique _id
          data: [item.brand, item.size, item.quantity.toString(), item.remark],
        }));
        setSalesHistory({ ...salesHistory, tableData: fetchedData });
      } catch (error) {
        console.error('Error fetching sales history:', error);
      }
    };

    fetchSalesHistory();
  }, []);

  const handleDelete = async (rowIndex) => {
    const itemToDelete = salesHistory.tableData[rowIndex];
    Alert.alert('Delete Record', 'Are you sure you want to delete this record?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await axios.delete(`http://localhost:5432/api/saleshistory/${itemToDelete.id}`); // Updated endpoint
            const updatedData = salesHistory.tableData.filter((_, index) => index !== rowIndex);
            setSalesHistory({ ...salesHistory, tableData: updatedData });
          } catch (error) {
            console.error('Error deleting item:', error);
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Sales History</Text>
        <Table>
          <Row data={salesHistory.tableHead} style={styles.head} textStyle={styles.headText} />
          {salesHistory.tableData.map((record, index) => (
            <View key={index} style={styles.row}>
              {record.data.map((cellData, cellIndex) => (
                <View key={cellIndex} style={styles.cell}>
                  <Text style={styles.text}>{cellData}</Text>
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
  head: { height: 44, backgroundColor: 'white' },
  headText: { fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: 'black' },
  row: {
    flexDirection: 'row',
    height: 40,
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
});

export default SalesHistoryTable;
