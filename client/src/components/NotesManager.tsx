import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Note } from "@shared/schema";
import { formatDistanceToNow, format } from "date-fns";

export default function NotesManager() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: notes = [], isLoading } = useQuery<Note[]>({
    queryKey: ["/api/notes"],
  });

  const createNoteMutation = useMutation({
    mutationFn: async (noteData: { title: string; content: string; reminderDate?: Date }) => {
      return apiRequest("POST", "/api/notes", noteData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notes"] });
      setTitle("");
      setContent("");
      setReminderDate("");
      setReminderTime("");
      setShowAddForm(false);
      toast({ title: "Note created successfully!" });
    },
    onError: () => {
      toast({ 
        title: "Failed to create note", 
        variant: "destructive" 
      });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/notes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notes"] });
      toast({ title: "Note deleted successfully!" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    let reminderDateTime: Date | undefined;
    if (reminderDate && reminderTime) {
      reminderDateTime = new Date(`${reminderDate}T${reminderTime}`);
    }
    
    createNoteMutation.mutate({
      title,
      content,
      reminderDate: reminderDateTime,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      deleteNoteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading notes...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Study Notes</h2>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-700"
          data-testid="button-add-note"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Note
        </Button>
      </div>

      {showAddForm && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note Title
                </label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter note title"
                  required
                  data-testid="input-note-title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your note here..."
                  rows={4}
                  required
                  data-testid="textarea-note-content"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reminder Date
                  </label>
                  <Input
                    type="date"
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    data-testid="input-reminder-date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reminder Time
                  </label>
                  <Input
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    data-testid="input-reminder-time"
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                <Button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700"
                  disabled={createNoteMutation.isPending}
                  data-testid="button-save-note"
                >
                  Save Note
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  data-testid="button-cancel-note"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No notes yet. Create your first note to get started!</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          notes.map((note) => (
            <Card key={note.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 
                    className="font-semibold text-gray-900"
                    data-testid={`text-note-title-${note.id}`}
                  >
                    {note.title}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(note.id)}
                    className="text-red-500 hover:text-red-700 -mt-1"
                    data-testid={`button-delete-note-${note.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <p 
                  className="text-gray-600 text-sm mb-4 line-clamp-3"
                  data-testid={`text-note-content-${note.id}`}
                >
                  {note.content}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {formatDistanceToNow(new Date(note.createdAt!), { addSuffix: true })}
                  </span>
                  {note.reminderDate && (
                    <div className="flex items-center space-x-1">
                      <Bell className="w-3 h-3 text-yellow-500" />
                      <span data-testid={`text-reminder-${note.id}`}>
                        {format(new Date(note.reminderDate), "MMM d, h:mm a")}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
