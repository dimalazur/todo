import React, { useState } from 'react';
import { TodoForm } from './components/TodoForm';
import {Container, Button, Typography, TextField} from '@mui/material';
import { TodoList } from "./components/TodoList";
import {Task, TodoProvider} from "./context/TodoContext";
import styled from "@emotion/styled";

const PageTitle = styled(Typography)(({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: '#000000',
  textTransform: 'uppercase',
  marginBottom: '1rem'
}));

const FilterButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>(({ isActive }) => ({
  marginRight: '0.5rem',
  backgroundColor: isActive ? '#1976d2' : 'transparent',
  color: isActive ? '#ffffff' : '#000000',
  '&:hover': {
    backgroundColor: '#1565c0',
    color: '#ffffff',
  },
}));

const App: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editTask, setEditTask] = useState<Task | null>(null);

  const handleEditTask = (task: Task) => {
    setEditTask(task);
  };

  return (
    <TodoProvider>
      <Container>
        <PageTitle variant="h1">Task Manager</PageTitle>
        <TodoForm editTask={editTask} />
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Оновлюємо термін пошуку
          style={{ marginBottom: '1rem' }}
        />
        <FilterButton
          onClick={() => setFilter('all')}
          isActive={filter === 'all'}
        >
          All
        </FilterButton>
        <FilterButton
          onClick={() => setFilter('completed')}
          isActive={filter === 'completed'}
        >
          Completed
        </FilterButton>
        <FilterButton
          onClick={() => setFilter('incomplete')}
          isActive={filter === 'incomplete'}
        >
          Incomplete
        </FilterButton>

        <TodoList filter={filter} onEditTask={handleEditTask} searchTerm={searchTerm}/>
      </Container>
    </TodoProvider>
  );
};

export default App;
