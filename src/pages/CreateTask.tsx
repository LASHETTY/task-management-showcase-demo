
import React from 'react';
import TaskForm from '@/components/TaskForm';

const CreateTask = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Create New Task</h1>
        <p className="text-muted-foreground mt-1">
          Add a new task to your list
        </p>
      </div>
      
      <div className="bg-card p-6 rounded-lg shadow-sm border">
        <TaskForm mode="create" />
      </div>
    </div>
  );
};

export default CreateTask;
