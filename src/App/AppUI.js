import React from 'react';
import { TodoContext } from '../TodoContext';
import { TodoCounter } from '../TodoCounter';
import { CreateTodoButton } from '../CreateTodoButton';
import { TodoItem } from '../TodoItem';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { Modal } from '../Modal';
import { TodoForm } from '../TodoForm';

function AppUI(){
    const {
        error,
        loading,
        totalTodos,
        searchedTodos,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal
      } = React.useContext(TodoContext);
    return (
    <>
      <TodoCounter />
      <TodoSearch />
      <TodoList>
        {error && <p>Desespérate, hubo un error...</p>}
        {loading && <p>Estamos cargando, no desesperes...</p>}
        {(!loading && !searchedTodos.length) && <p>¡Crea tu primer TODO!</p>}

        {searchedTodos.map(todo => (
        <TodoItem 
            key={todo.text} 
            text={todo.text}
            completed={todo.completed}
            onComplete={()=> completeTodo(todo.text)}
            onDelete={()=> deleteTodo(todo.text)}
        />
        ))}
      </TodoList>
      
      {!!openModal && (
        <Modal>
          <TodoForm />
        </Modal>  
      )}
      <CreateTodoButton 
        setOpenModal={setOpenModal}
      />
    </>
    );
}

export { AppUI };