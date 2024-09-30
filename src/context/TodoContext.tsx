import { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

interface State {
  tasks: Task[];
}

interface Action {
  type: 'ADD_TASK' | 'EDIT_TASK' | 'DELETE_TASK' | 'TOGGLE_TASK' | 'LOAD_TASKS';
  payload?: any;
}

const TodoContext = createContext<any>(null);

const todoReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOAD_TASKS':
      return { tasks: action.payload };
    case 'ADD_TASK':
      return { tasks: [...state.tasks, action.payload] };
    case 'EDIT_TASK':
      return {
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
      };
    case 'DELETE_TASK':
      return { tasks: state.tasks.filter(task => task.id !== action.payload) };
    case 'TOGGLE_TASK':
      return {
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    default:
      return state;
  }
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const storageList = localStorage.getItem('tasks');
  const initialData = storageList ? JSON.parse(storageList) : null
  const [state, dispatch] = useReducer(todoReducer, { tasks: initialData || [] });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    dispatch({ type: 'LOAD_TASKS', payload: storedTasks });
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
