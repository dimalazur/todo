import React, {useEffect, useState} from 'react';
import {TextField, Button} from '@mui/material';
import {Task, useTodoContext} from "../../context/TodoContext";
import styled from "@emotion/styled";

interface FormProps { editTask: Task | null }

const StyledForm = styled('form')(({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '2rem 0',
  maxWidth: '500px'
}));

export const TodoForm: React.FC<FormProps> = ({ editTask }) => {
 const { dispatch } = useTodoContext();
  const [title, setTitle] = useState(editTask?.title || '');
  const [description, setDescription] = useState(editTask?.description || '');

  useEffect(() => {
    if (editTask) {
      setTitle(editTask?.title);
      setDescription(editTask?.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    if (editTask) {
      dispatch({ type: 'EDIT_TASK', payload: { id: editTask.id, title, description } });
    } else {
      const newTask = {
        id: Date.now(),
        title,
        description,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      dispatch({ type: 'ADD_TASK', payload: newTask });
    }
    setTitle('');
    setDescription('');
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <Button type="submit"> {editTask ? 'Update Task' : 'Add Task'}</Button>
    </StyledForm>
  );
};
