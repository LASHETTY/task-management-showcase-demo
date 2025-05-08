
import React from 'react';
import TaskList from '@/components/TaskList';

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage and track your tasks efficiently
        </p>
      </div>
      <TaskList />
    </div>
  );
};

export default Index;
