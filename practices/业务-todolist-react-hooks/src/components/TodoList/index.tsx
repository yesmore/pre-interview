import React, { useCallback,useReducer, useEffect} from 'react';

import TdInput from './Input';
import TdList from './List'
import { todoReducer } from './reducer';
import { ITodo, IState, ACTION_TYPE } from './typings';

// const initTodoListState: IState = {
//   todoList: []
// }

// 惰性初始化
function init(initialState:ITodo[]): IState {
  return {
    todoList: initialState
  }
}

const TodoList: React.FC = () => {

  // const [todoList, setTodoList] = useState<ITodo[]>([])
  const [state, dispatch] = useReducer(todoReducer, [], init);

  useEffect(() => {
    // 初始化缓存
    const todoList = JSON.parse(localStorage.getItem('todoList') || '[]')
    dispatch({ 
      type: ACTION_TYPE.INIT_TODOLiST,
      payload: todoList
    })
    // console.log(todoList);
  }, [])

  useEffect(() => {
    // todoList改变时，更新缓存
    localStorage.setItem('todoList', JSON.stringify(state.todoList))
  }, [state.todoList])

  // 添加
  const addTodo = useCallback((todo: ITodo) => {
    // push todo item
    dispatch({
      type: ACTION_TYPE.ADD_TODO,
      payload: todo
    })
  }, [])

  // 移除
  const removeTodo = useCallback((id: number):void => {
    dispatch({
      type: ACTION_TYPE.REMOVE_TODO,
      payload: id
    })
  }, [])

  // 标签
  const toggleTodo = useCallback((id: number):void => {
    dispatch({
      type: ACTION_TYPE.TOGGLE_TODO,
      payload: id
    })
  }, [])

  return (
    <div className="todo-list">
      <TdInput
        addTodo={addTodo}
        todoList={state.todoList} 
      />
      <TdList
        todoList={state.todoList}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
      />
    </div>
  );
};

export default TodoList;