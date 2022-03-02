import * as React from 'react';

import {ITodo} from '../typings'

interface IProps {
  todo: ITodo,
  toggleTodo: (id: number) => void,
  removeTodo: (id: number) => void
}

const TdListItem: React.FC<IProps> = ({
  todo,
  toggleTodo,
  removeTodo
}) => {

  const { id, content, completed } = todo

  return (
  <div className="todo-list-item">
    <input 
      type="checkbox"
      checked={ completed }
      onChange={ () => toggleTodo(id) }
    />
    <span 
      className="todo-content" 
      style={{ textDecoration: completed ? 'line-through' : 'none' }}>
      {content}
    </span>
    <button onClick={ () => removeTodo(id)}>删除</button>
  </div>
  );
}

export default TdListItem;