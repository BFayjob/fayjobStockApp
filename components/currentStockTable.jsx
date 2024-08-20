import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput, Modal } from 'react-native';
import { Table, Row } from 'react-native-table-component';

const CurrentStockTable = () => {
  const [data, setData] = useState({
    tableHead: ['Brand', 'Size', 'Quantity', 'Action'],
    tableData: [],
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantityToSell, setQuantityToSell] = useState('');
  const [remark, setRemark] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const [itemsResponse, initialStocksResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/items'),
          axios.get('http://localhost:5000/api/stocks'),
        ]);

        const items = itemsResponse.data;
        const initialStocks = initialStocksResponse.data;

        // Combine initial stock with current items
        const combinedData = initialStocks.map((stock) => {
          const item = items.find((item) => item.brand === stock.brand && item.size === stock.size);
          return [
            stock.brand,
            stock.size,
            item ? item.quantity.toString() : '0',
            item ? item.remark : '',
          ];
        });

        setData({ ...data, tableData: combinedData });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchItems();
  }, []);
  const handleSell = (rowIndex) => {
    setSelectedItem(data.tableData[rowIndex]);
    setModalVisible(true);
  };

  const handleSellConfirmation = async () => {
    try {
      const updatedQuantity = parseInt(selectedItem[2]) - parseInt(quantityToSell);
      const updatedItem = {
        brand: selectedItem[0],
        size: selectedItem[1],
        quantity: updatedQuantity,
        remark,
      };
      await axios.put(
        `http://localhost:5000/api/items/${selectedItem[0]}/${selectedItem[1]}`,
        updatedItem
      );

      const updatedData = data.tableData.map((item, index) =>
        index === selectedItem.index
          ? [item[0], item[1], updatedQuantity.toString(), item[3]]
          : item
      );
      setData({ ...data, tableData: updatedData });
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Table>
        <Row data={data.tableHead} style={styles.head} textStyle={styles.headText} />
        {data.tableData.map((rowData, index) => (
          <View key={index} style={styles.row}>
            {rowData.map((cellData, cellIndex) => (
              <View key={cellIndex} style={styles.cell}>
                <Text style={styles.text}>{cellData}</Text>
              </View>
            ))}
            <View style={styles.cell}>
              <TouchableOpacity style={styles.button} onPress={() => handleSell(index)}>
                <Text style={styles.buttonText}>Sell</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </Table>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>SELL ITEM</Text>
          {selectedItem && (
            <>
              <Text>Brand: {selectedItem[0]}</Text>
              <Text>Size: {selectedItem[1]}</Text>
              <Text>Current Quantity: {selectedItem[2]}</Text>
              <TextInput
                placeholder="Quantity to sell"
                value={quantityToSell}
                onChangeText={setQuantityToSell}
                keyboardType="numeric"
                style={styles.input}
              />
              <TextInput
                placeholder="Remark"
                value={remark}
                onChangeText={setRemark}
                style={styles.input}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.actionButton} onPress={handleSellConfirmation}>
                  <Text style={styles.buttonText}>Sell</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  head: { height: 44, backgroundColor: 'gray' },
  headText: { fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: 'white' },
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
  text: { margin: 6, fontSize: 12, fontWeight: 'bold', textAlign: 'center' },
  button: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
});

export default CurrentStockTable;
