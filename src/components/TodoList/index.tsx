import React from 'react';
import { List } from '@mui/material';
import {TodoItem} from "./components/TodoItem";
import {Task, useTodoContext} from "../../context/TodoContext";


interface TodoListProps {
  filter: string;
  onEditTask: (task: Task) => void;
  searchTerm: string;
}
export const TodoList: React.FC<TodoListProps> = ({ filter ,onEditTask, searchTerm}) => {
  const { state } = useTodoContext();
  const filterTasks = (task: Task) => {
    const matchesFilter = filter === 'all'
      || (filter === 'completed' && task.completed)
      || (filter === 'incomplete' && !task.completed);

    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  };
  const filteredTasks = state.tasks.filter(filterTasks);


  return (
    <List>
      {filteredTasks.map((task : Task) => (
        <TodoItem key={task.id} task={task} onEditTask={onEditTask} />
      ))}
    </List>
  );
};

