import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Message from '../components/Message';
import client from '../utils/client';
import {StackActions} from '@react-navigation/native';

const Login = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const data = {email: email, password: password};
    try {
      let response = await client.post('/user/login', {
        ...data,
      });
      response = await response.data;
      if (response.success) {
        navigation.dispatch(StackActions.replace('Task'));
      }
    } catch (e) {
      let response = e.response.data;
      setMessage(response.message);
      setVisible(true);
      setEmail('');
      setPassword('');
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/taskylogo.png')}
        style={styles.logoImg}
      />
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType="email-address"
          style={styles.input}
          placeholder="user@gmail.com"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          keyboardType="default"
          style={styles.input}
          secureTextEntry={true}
          placeholder="****************"
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      {visible && (
        <Message visible={visible} setVisible={setVisible} message={message} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoImg: {
    width: 300,
    height: 300,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  btn: {
    marginTop: 50,
    width: '90%',
    height: 50,
    padding: 10,
    backgroundColor: 'orange',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
});
export default Login;
