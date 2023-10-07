import {View, Text} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';

const Form = ({visible, children}) => {
  return (
    <Modal
      testID={'modal'}
      isVisible={visible}
      animationIn="slideInLeft"
      animationOut="slideOutRight">
      {children}
    </Modal>
  );
};

export default Form;
