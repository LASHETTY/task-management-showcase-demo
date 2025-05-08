
import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useTaskContext } from '@/context/TaskContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, Trash2, ArrowLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const TaskDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getTaskById, deleteTask } = useTaskContext();
  const navigate = useNavigate();
  
  const task = id ? getTaskById(id) : undefined;
  
  if (!task) {
    return <Navigate to="/not-found" />;
  }
  
  const handleDelete = () => {
    deleteTask(task.id);
    navigate('/');
  };

  const getStatusClass = (status: string) => {
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
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 pl-0 hover:pl-0"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{task.title}</h1>
          <div className="flex items-center mt-2">
            <span className={`task-status-badge ${getStatusClass(task.status)}`}>
              {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
            </span>
            <span className="text-sm text-muted-foreground ml-2">
              Due: {formatDate(task.dueDate)}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/task/${task.id}/edit`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  task and remove it from the system.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-2">Description</h2>
              <p className="whitespace-pre-wrap">{task.description}</p>
            </div>
            
            {task.remarks && (
              <div>
                <h2 className="text-lg font-medium mb-2">Remarks</h2>
                <p className="whitespace-pre-wrap">{task.remarks}</p>
              </div>
            )}
            
            <div className="border-t pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Created By</h3>
                  <p>{task.createdBy.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {getTimeAgo(task.createdOn)}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Last Updated By</h3>
                  <p>{task.lastUpdatedBy.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {getTimeAgo(task.lastUpdatedOn)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskDetails;
