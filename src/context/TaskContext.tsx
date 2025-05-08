
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, TaskStatus, User } from '../types/task';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdOn' | 'lastUpdatedOn' | 'createdBy' | 'lastUpdatedBy'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
  searchTasks: (query: string) => Task[];
  filterTasksByStatus: (status: TaskStatus | 'all') => Task[];
  currentUser: User;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Mock current user
const currentUser: User = {
  id: "user-1",
  name: "John Doe"
};

// Sample initial task data
const initialTasks: Task[] = [
  {
    id: uuidv4(),
    title: "Complete project proposal",
    description: "Draft the initial proposal for the client meeting",
    dueDate: "2025-05-20",
    status: "pending",
    remarks: "Include budget estimates",
    createdOn: new Date().toISOString(),
    lastUpdatedOn: new Date().toISOString(),
    createdBy: currentUser,
    lastUpdatedBy: currentUser
  },
  {
    id: uuidv4(),
    title: "Review design mockups",
    description: "Go through the design mockups and provide feedback",
    dueDate: "2025-05-15",
    status: "in-progress",
    remarks: "Focus on user experience",
    createdOn: new Date().toISOString(),
    lastUpdatedOn: new Date().toISOString(),
    createdBy: currentUser,
    lastUpdatedBy: currentUser
  },
  {
    id: uuidv4(),
    title: "Update documentation",
    description: "Update the project documentation with recent changes",
    dueDate: "2025-05-10",
    status: "completed",
    remarks: "Include API documentation",
    createdOn: new Date(Date.now() - 86400000).toISOString(),
    lastUpdatedOn: new Date().toISOString(),
    createdBy: currentUser,
    lastUpdatedBy: currentUser
  }
];

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdOn' | 'lastUpdatedOn' | 'createdBy' | 'lastUpdatedBy'>) => {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      createdOn: new Date().toISOString(),
      lastUpdatedOn: new Date().toISOString(),
      createdBy: currentUser,
      lastUpdatedBy: currentUser
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    toast.success("Task created successfully!");
  };

  const updateTask = (id: string, taskUpdate: Partial<Task>) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { 
              ...task, 
              ...taskUpdate, 
              lastUpdatedOn: new Date().toISOString(),
              lastUpdatedBy: currentUser
            } 
          : task
      )
    );
    toast.success("Task updated successfully!");
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    toast.success("Task deleted successfully!");
  };

  const getTaskById = (id: string) => {
    return tasks.find(task => task.id === id);
  };

  const searchTasks = (query: string) => {
    if (!query.trim()) return tasks;
    
    const lowercaseQuery = query.toLowerCase();
    return tasks.filter(task => 
      task.title.toLowerCase().includes(lowercaseQuery) || 
      task.description.toLowerCase().includes(lowercaseQuery) ||
      task.remarks.toLowerCase().includes(lowercaseQuery)
    );
  };

  const filterTasksByStatus = (status: TaskStatus | 'all') => {
    if (status === 'all') return tasks;
    return tasks.filter(task => task.status === status);
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      addTask, 
      updateTask, 
      deleteTask, 
      getTaskById,
      searchTasks,
      filterTasksByStatus,
      currentUser
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
