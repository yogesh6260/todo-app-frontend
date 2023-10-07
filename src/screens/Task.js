import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import client from '../utils/client';
import List from '../components/List';
import Form from '../components/Form';
import Message from '../components/Message';

const AddTodoForm = ({setVisible, setTasks}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [message, setMessage] = useState('');
  const [showMessageBox, setShowMessageBox] = useState(false);

  const createTask = async () => {
    const data = {title: title, desc: desc};
    try {
      let response = await client.post('/tasks/new', {...data});
      let response2 = await client.get('/tasks');
      response = response.data;
      response2 = response2.data;
      if (response.success && response2.success) {
        setVisible(false);
        setTasks(response2.data);
      }
    } catch (error) {
      let response = error.response.data;
      setMessage(response.error);
      setShowMessageBox(true);
    }
  };
  return (
    <>
      {showMessageBox && (
        <Message
          visible={showMessageBox}
          setVisible={setShowMessageBox}
          message={message}
        />
      )}
      <KeyboardAvoidingView style={formStyles.formContainer}>
        <View style={formStyles.formHeader}>
          <Text style={formStyles.formHeaderText}>Add Todo Task Here!</Text>
          <Image
            style={formStyles.formHeaderImg}
            source={require('../assets/images/add.png')}
          />
        </View>
        <View style={{flexDirection: 'row', marginTop: 70}}>
          <View
            style={{
              flexDirection: 'column',
              gap: 60,
              justifyContent: 'center',
            }}>
            <Text style={formStyles.formLabel}>Title:</Text>
            <Text style={formStyles.formLabel}>Description: </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              gap: 30,
              justifyContent: 'center',
            }}>
            <TextInput
              style={formStyles.formInput}
              placeholder="Enter your task title."
              value={title}
              onChangeText={text => setTitle(text)}
            />
            <TextInput
              style={formStyles.formInput}
              placeholder="Enter your task description."
              value={desc}
              onChangeText={text => setDesc(text)}
            />
          </View>
        </View>

        <TouchableOpacity style={formStyles.formBtn} onPress={createTask}>
          <Text style={formStyles.formBtnText}>Add Todo</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

const EditTodoForm = ({setVisible, task, setTasks}) => {
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.desc);
  const [message, setMessage] = useState('');
  const [showMessageBox, setShowMessageBox] = useState(false);

  const updateTask = async () => {
    const data = {title: title, desc: desc};
    try {
      let response = await client.put(`/tasks/${task._id}`, {...data});
      let response2 = await client.get('/tasks');
      response = response.data;
      response2 = response2.data;
      if (response.success && response2.success) {
        setVisible(false);
        setTasks(response2.data);
      }
    } catch (error) {
      let response = error.response.data;
      setMessage(response.error);
      setShowMessageBox(true);
    }
  };
  return (
    <>
      {showMessageBox && (
        <Message
          visible={showMessageBox}
          setVisible={setShowMessageBox}
          message={message}
        />
      )}
      <KeyboardAvoidingView style={formStyles.formContainer}>
        <View style={formStyles.formHeader}>
          <Text style={formStyles.formHeaderText}>Update Todo Task Here!</Text>
          <Image
            style={formStyles.formHeaderImg}
            source={require('../assets/images/refresh.png')}
          />
        </View>
        <View style={{flexDirection: 'row', marginTop: 70}}>
          <View
            style={{
              flexDirection: 'column',
              gap: 60,
              justifyContent: 'center',
            }}>
            <Text style={formStyles.formLabel}>Title:</Text>
            <Text style={formStyles.formLabel}>Description: </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              gap: 30,
              justifyContent: 'center',
            }}>
            <TextInput
              style={formStyles.formInput}
              placeholder="Enter your task title."
              value={title}
              onChangeText={text => setTitle(text)}
            />
            <TextInput
              style={formStyles.formInput}
              placeholder="Enter your task description."
              value={desc}
              onChangeText={text => setDesc(text)}
            />
          </View>
        </View>

        <TouchableOpacity style={formStyles.formBtn} onPress={updateTask}>
          <Text style={formStyles.formBtnText}>Update Todo</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

const DeleteTodoForm = ({setVisible, taskId, setTasks}) => {
  const [message, setMessage] = useState('');
  const [showMessageBox, setShowMessageBox] = useState(false);
  const deleteTask = async () => {
    try {
      await client.delete(`/tasks/${taskId}`);
      let response2 = await client.get('/tasks');
      response2 = response2.data;
      if (response2.success) {
        setVisible(false);
        setTasks(response2.data);
      }
    } catch (error) {
      let response = error.response.data;
      setMessage(response.error);
      setShowMessageBox(true);
    }
  };
  return (
    <>
      {showMessageBox && (
        <Message
          visible={showMessageBox}
          setVisible={setShowMessageBox}
          message={message}
        />
      )}
      <KeyboardAvoidingView style={formStyles.formContainer}>
        <View style={formStyles.formHeader}>
          <Text style={formStyles.formHeaderText}>
            Press button to confirm !
          </Text>
          <Image
            style={formStyles.formHeaderImg}
            source={require('../assets/images/delete.png')}
          />
        </View>
        <TouchableOpacity style={formStyles.formBtn} onPress={deleteTask}>
          <Text style={formStyles.formBtnText}>Delete Todo</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState();
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [taskId, setTaskId] = useState();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        let response = await client.get('/tasks');
        response = response.data;
        setTasks(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchTasks();
  }, []);

  const handleEdit = id => {
    setEditForm(true);
    const item = tasks.find(obj => obj._id === id);
    setTask(item);
  };

  const handleDelete = id => {
    setDeleteForm(true);
    setTaskId(id);
  };

  return (
    <>
      {addForm && (
        <Form
          visible={addForm}
          children={<AddTodoForm setVisible={setAddForm} setTasks={setTasks} />}
        />
      )}
      {editForm && (
        <Form
          visible={editForm}
          children={
            <EditTodoForm
              setVisible={setEditForm}
              setTasks={setTasks}
              task={task}
            />
          }
        />
      )}
      {deleteForm && (
        <Form
          visible={deleteForm}
          children={
            <DeleteTodoForm
              setVisible={setDeleteForm}
              taskId={taskId}
              setTasks={setTasks}
            />
          }
        />
      )}

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Todo Tasks</Text>
          <Image
            source={require('../assets/images/to-do-list.png')}
            style={styles.headerImg}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => setAddForm(true)}>
          <Text style={styles.btnText}>Create Task +</Text>
        </TouchableOpacity>
        {/* Task Items  */}
        <View
          style={{
            marginTop: 30,
            width: '100%',
            height: '100%',
          }}>
          <List
            data={tasks}
            handleEdit={id => handleEdit(id)}
            handleDelete={id => handleDelete(id)}
          />
        </View>
      </View>
    </>
  );
};

const formStyles = StyleSheet.create({
  formContainer: {
    width: '100%',
    height: 'auto',
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 20,
  },
  formHeader: {
    marginTop: 10,
    width: '100%',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formHeaderText: {
    fontSize: 18,
    color: 'orange',
    fontWeight: 'bold',
  },
  formHeaderImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: 'orange',
  },
  formLabel: {
    fontSize: 16,
    color: 'black',
  },
  formInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  formBtn: {
    alignSelf: 'center',
    marginTop: 50,
    width: '80%',
    height: 50,
    backgroundColor: 'orange',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  formBtnText: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
    elevation: 5,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'orange',
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    elevation: 5,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
  headerImg: {
    tintColor: 'white',
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  btn: {
    marginTop: 20,
    width: '50%',
    height: 50,
    backgroundColor: '#F5E8B7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    elevation: 15,
  },
  btnText: {
    fontSize: 17,
    color: 'black',
  },
});

export default Task;
