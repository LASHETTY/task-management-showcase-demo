
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import TaskForm from '@/components/TaskForm';
import { useTaskContext } from '@/context/TaskContext';

const EditTask = () => {
  const { id } = useParams<{ id: string }>();
  const { getTaskById } = useTaskContext();
  
  const task = id ? getTaskById(id) : undefined;
  
  if (!task) {
    return <Navigate to="/not-found" />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Edit Task</h1>
        <p className="text-muted-foreground mt-1">
          Update task details
        </p>
      </div>
      
      <div className="bg-card p-6 rounded-lg shadow-sm border">
        <TaskForm mode="edit" task={task} />
      </div>
    </div>
  );
};

export default EditTask;
