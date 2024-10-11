import React, { useReducer, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Button } from 'react-native';

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now().toString(), text: action.payload }];
    case 'REMOVE_TODO':
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setNewTodo(''); 
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => dispatch({ type: 'REMOVE_TODO', payload: item.id })}>
      <Text style={styles.todoItem}>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add new..."
        value={newTodo}
        onChangeText={setNewTodo}
      />
      <Button title="Save" onPress={addTodo} />
      <FlatList
        data={state}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  todoItem: {
    fontSize: 18,
    paddingVertical: 10,
  },
});
