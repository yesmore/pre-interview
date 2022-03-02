import * as React from 'react';

import {ITodo} from '../typings'

interface IProps {
  addTodo: (todo: ITodo) => void;
  todoList: ITodo[];
}

const TdInput: React.FC<IProps> = ({
  addTodo,
  todoList
}) => {

  const inputRef = React.useRef<HTMLInputElement>(null);
  const addItem = ():void => {
    const val: string = inputRef.current!.value.trim()

    if (val.length > 0) {
      const isExist = todoList.find(todo => todo.content === val)

      if(isExist) {
        return alert('待办项已存在')
      }

      addTodo({
        id: new Date().getTime(),
        content: val,
        completed: false
      })

      inputRef.current!.value = ''
    }
  }

  return (
    <div className="todo-input">
      <input ref={inputRef} type="text" placeholder="请输入待办项"/>
      <button onClick={addItem}>增加</button>
    </div>
  );
}

export default TdInput;