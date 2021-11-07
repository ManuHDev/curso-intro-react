import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const TodoContext =React.createContext();

function TodoProvider(props) {
  //const [nombre, saveNombre] = useLocalStorage('NOMBRE_V1', 'Prueba');
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error
  } = useLocalStorage('TODOS_V1', []);
  
  const [searchValue,setSearchValue] = React.useState('');

  const completedTodos = todos.filter(todo => !!todo.completed).length; // !!todo.completed <=> todo.completed == true
  const totalTodos = todos.length;

  let searchedTodos = [];
  if (!searchValue.length >= 1){
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo =>{
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }


  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    //todos[todoIndex] = {
    //  text: todos[todoIndex],
    //  completed: true
    //}
    const newTodos = [...todos];
    newTodos[todoIndex].completed=true;
    //setItem(newTodos);
    saveTodos(newTodos);
  }

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex,1);
    saveTodos(newTodos);
  }
  return (
    <TodoContext.Provider value={{
        loading,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        completeTodo,
        deleteTodo,
    }}>
      {props.children}
    </TodoContext.Provider>
  )
}

/*<TodoContext.Consumer></TodoContext.Consumer>*/

export {TodoContext, TodoProvider};