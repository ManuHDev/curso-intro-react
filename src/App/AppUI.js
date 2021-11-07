import React from 'react';
import { TodoContext } from '../TodoContext';
import { TodoCounter } from '../TodoCounter';
import { CreateTodoButton } from '../CreateTodoButton';
import { TodoItem } from '../TodoItem';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';

function AppUI(){
    return (
    <>
      <TodoCounter />
      <TodoSearch />
      <TodoContext.Consumer>
        {({
          error,
          loading,
          searchedTodos,
          completeTodo,
          deleteTodo
        }) => (
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
        )}
      </TodoContext.Consumer>

      <CreateTodoButton />
    </>
    );
}

export { AppUI };