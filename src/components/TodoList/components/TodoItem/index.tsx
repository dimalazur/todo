import React from 'react';
import {ListItem, Checkbox, Button, Typography,TypographyProps} from '@mui/material';
import styled from "@emotion/styled";
import {Task, useTodoContext} from "../../../../context/TodoContext";
import {format} from "date-fns";


interface TodoItemProps { task: Task; onEditTask: (task: Task) => void; }

const ItemTitle = styled(Typography)( ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#000000',
  textTransform: 'uppercase',
  marginBottom: '.5rem',
}));

const ItemDescription = styled((props: TypographyProps) => (
  <Typography {...props} />
))(({
  fontSize: '1rem',
  color: '#000000',
}));

const ItemDate = styled((props: TypographyProps) => (
  <Typography {...props} />
))(({
  fontSize: '1rem',
  fontWeight: 600,
  color: '#334155',
}));

export const TodoItem: React.FC<TodoItemProps> = ({ task, onEditTask }) => {
  const { dispatch } = useTodoContext();

  const deleteTask = (id: number) => {
    dispatch({ type: 'DELETE_TASK', payload: id })
  }

  return (
    <ListItem>
      <Checkbox
        checked={task.completed}
        onChange={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
      />
      <div>
        <ItemTitle
          variant="h3"
        >
          {task.title}
        </ItemTitle>
        <ItemDescription
          variant="caption"
          component="p"
        >
          {task.description}
        </ItemDescription>

        <ItemDate
          component="p"
        >
          {format(task.createdAt, 'dd-MM-yyyy')}
        </ItemDate>
      </div>
      <Button onClick={() => deleteTask(task.id)}>Delete</Button>
      <Button onClick={() => onEditTask(task)}>Edit</Button>
    </ListItem>
  );
};
