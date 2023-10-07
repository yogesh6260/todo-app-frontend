import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

const Item = ({title, desc, status, handleEdit, handleDelete}) => {
  const [check, setCheck] = useState(false);
  return (
    <View style={styles.itemContainer}>
      <View>
        <TouchableOpacity onPress={() => setCheck(!check)}>
          <Image
            source={
              check
                ? require('../assets/images/checkbox.png')
                : require('../assets/images/uncheckbox.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={{alignSelf: 'center', marginLeft: 20}}>
        <Text style={styles.taskTitle}>{title}</Text>
        <Text style={styles.taskDesc}>{desc}</Text>
      </View>
      <View style={{flexDirection: 'row', gap: 5, marginLeft: 'auto'}}>
        <TouchableOpacity onPress={handleEdit}>
          <Image
            source={require('../assets/images/edit.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <Image
            source={require('../assets/images/delete.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: '90%',
    alignSelf: 'center',
    height: 60,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  taskDesc: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});

export default Item;
