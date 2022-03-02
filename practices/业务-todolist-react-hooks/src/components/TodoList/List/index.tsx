import * as React from 'react';

import TdListItem from './Item'
import { ITodo } from '../typings';

interface IProps {
  todoList: ITodo[],
  removeTodo: (id: number) => void,
  toggleTodo: (id: number) => void
}

const TdList: React.FC<IProps> = ({
  todoList,
  removeTodo,
  toggleTodo
}) => {
  return (
    <div className="todo-list">
      {
        todoList && todoList.map((todo:ITodo) => {
          return (
            <TdListItem
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              toggleTodo={toggleTodo}
            />
          )
        })
      }
    </div>
  );
}

export default TdList;
