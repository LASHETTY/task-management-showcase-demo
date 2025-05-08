
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTaskContext } from '@/context/TaskContext';
import { Task, TaskStatus } from '@/types/task';
import { formatDistanceToNow } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Eye, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TaskList: React.FC = () => {
  const { tasks, deleteTask, filterTasksByStatus, searchTasks } = useTaskContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');

  const filteredTasks = searchQuery 
    ? searchTasks(searchQuery)
    : filterTasksByStatus(statusFilter);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (value: string) => {
    setStatusFilter(value as TaskStatus | 'all');
  };

  const getStatusClass = (status: TaskStatus) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'in-progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getTimeAgo = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search tasks..." 
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
        <Button onClick={() => navigate('/task/new')}>Create New Task</Button>
      </div>

      <Tabs defaultValue="all" onValueChange={handleFilterChange}>
        <TabsList className="grid grid-cols-5 w-full md:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={statusFilter}>
          {filteredTasks.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredTasks.map((task) => (
                <Card key={task.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">{task.title}</h3>
                          <p className="text-sm text-muted-foreground truncate max-w-[300px]">{task.description}</p>
                        </div>
                        <span className={`task-status-badge ${getStatusClass(task.status)}`}>
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:justify-between mt-4 text-sm text-muted-foreground">
                        <div className="space-y-1 mb-2 sm:mb-0">
                          <p>Due: {formatDate(task.dueDate)}</p>
                          <p>Created by: {task.createdBy.name}</p>
                        </div>
                        <div className="space-y-1">
                          <p>Updated: {getTimeAgo(task.lastUpdatedOn)}</p>
                          <p>By: {task.lastUpdatedBy.name}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/task/${task.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/task/${task.id}/edit`)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteTask(task.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">No tasks found</h3>
              <p className="text-muted-foreground">
                {searchQuery ? 'Try a different search term' : 'Create a new task to get started'}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskList;
