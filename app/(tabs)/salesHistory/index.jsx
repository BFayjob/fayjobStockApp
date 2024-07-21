import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/header';
import SalesHistoryTable from '../../../components/salesHistoryTable';

const SalesHistoryScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Header />
        <SalesHistoryTable />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SalesHistoryScreen;
