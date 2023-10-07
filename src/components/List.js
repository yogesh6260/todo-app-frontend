import {View, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import Item from './Item';

const List = ({data, handleEdit, handleDelete}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={{gap: 10}}
        renderItem={({item, index}) => (
          <Item
            key={index}
            title={item.title}
            desc={item.desc}
            status={item.status}
            handleEdit={id => handleEdit(item._id)}
            handleDelete={id => handleDelete(item._id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default List;
