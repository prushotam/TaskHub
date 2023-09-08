import {StyleSheet, ToastAndroid} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Colors} from '../../utils/colors';
import UniformBgWithFAB from '../commonComponents/UniformBgWithFAB';
import {
  deleteDataFromTable,
  insertDataIntoTable,
  retrieveDataFromTable,
} from '../../utils/Database';
import Card from '../commonComponents/Card';
import {FlatList} from 'react-native-gesture-handler';
import {useAppStateContext} from '../../utils/AppsStateContext';
const Active = () => {
  const {tempState} = useAppStateContext();

  const [data, setData] = useState([]);

  useEffect(() => {
    // if (tempState === 'TaskCreated' || tempState === '') {
    retrieveDataFromTable(
      'table_activeTask',
      resultSet => {
        // Handle retrieved data
        const data = resultSet.rows.raw(); // Convert to array
        setData(data);
      },
      error => {
        console.error('Error retrieving data:', error);
      },
    );
    // }
  });

  const onDelete = useCallback(item => {
    const whereClause = `id=${item.id}`;
    deleteDataFromTable(
      'table_activeTask',
      whereClause,
      resultSet => {
        ToastAndroid.show(
          'Selected active task deleted successfully',
          ToastAndroid.LONG,
        );
      },
      error => {
        console.log('error deleting item');
      },
    );
  }, []);
  const onShift = useCallback(item => {
    console.log('item shifted', item);
    const data = {
      title: item.title,
      description: item.description,
      date: item.date,
      priority: item.priority,
    };
    insertDataIntoTable(
      'table_inProgressTask',
      data,
      resultSet => {
        ToastAndroid.show('Task staged successfully', ToastAndroid.SHORT);
      },
      error => {
        console.error('Error inserting data:', error);
        // Handle error
      },
    );

    const whereClause = `id=${item.id}`;
    deleteDataFromTable(
      'table_activeTask',
      whereClause,
      resultSet => {
        console.log('shifted and deleted from active');
      },
      error => {
        console.log('error deleting item');
      },
    );
  }, []);

  return (
    <UniformBgWithFAB>
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <Card
            priority={item.priority}
            title={item.title}
            date={item.date}
            description={item.description}
            onDelete={() => onDelete(item)}
            onShift={() => onShift(item)}></Card>
        )}
      />
    </UniformBgWithFAB>
  );
};

export default Active;

const styles = StyleSheet.create({});
