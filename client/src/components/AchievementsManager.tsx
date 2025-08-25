import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Trophy, Medal, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Achievement } from "@shared/schema";
import { format } from "date-fns";

export default function AchievementsManager() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [certificateLink, setCertificateLink] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: achievements = [], isLoading } = useQuery<Achievement[]>({
    queryKey: ["/api/achievements"],
  });

  const createAchievementMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return fetch("/api/achievements", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/achievements"] });
      setName("");
      setDescription("");
      setFile(null);
      setCertificateLink("");
      setShowAddForm(false);
      toast({ title: "Achievement added successfully!" });
    },
    onError: () => {
      toast({ 
        title: "Failed to add achievement", 
        variant: "destructive" 
      });
    },
  });

  const deleteAchievementMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/achievements/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/achievements"] });
      toast({ title: "Achievement deleted successfully!" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (file) {
      formData.append("file", file);
    }
    if (certificateLink) {
      formData.append("certificateLink", certificateLink);
    }
    
    createAchievementMutation.mutate(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "File size must be less than 10MB",
          variant: "destructive",
        });
        e.target.value = "";
        return;
      }
      
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast({
          title: "Invalid file type",
          description: "Only JPG, PNG, and PDF files are allowed",
          variant: "destructive",
        });
        e.target.value = "";
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this achievement?")) {
      deleteAchievementMutation.mutate(id);
    }
  };

  const getIconForIndex = (index: number) => {
    const icons = [Trophy, Medal, Award];
    const IconComponent = icons[index % icons.length];
    const colors = ["text-yellow-600", "text-blue-600", "text-green-600"];
    const bgColors = ["bg-yellow-100", "bg-blue-100", "bg-green-100"];
    
    return {
      Icon: IconComponent,
      color: colors[index % colors.length],
      bgColor: bgColors[index % bgColors.length],
    };
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading achievements...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">My Achievements</h2>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-700"
          data-testid="button-add-achievement"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Achievement
        </Button>
      </div>

      {showAddForm && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Achievement Name
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., JavaScript Certification, Completed React Course"
                  required
                  data-testid="input-achievement-name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your achievement..."
                  rows={3}
                  data-testid="textarea-achievement-description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate/Proof
                </label>
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                    data-testid="input-achievement-file"
                  />
                  <p className="text-sm text-gray-500">Upload JPG, PNG, or PDF files up to 10MB</p>
                  <div className="text-center text-gray-500">- OR -</div>
                  <Input
                    type="url"
                    value={certificateLink}
                    onChange={(e) => setCertificateLink(e.target.value)}
                    placeholder="https://example.com/certificate"
                    data-testid="input-achievement-link"
                  />
                  <p className="text-sm text-gray-500">Provide a link to your certificate</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700"
                  disabled={createAchievementMutation.isPending}
                  data-testid="button-save-achievement"
                >
                  Add Achievement
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  data-testid="button-cancel-achievement"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No achievements yet. Add your first achievement to get started!</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          achievements.map((achievement, index) => {
            const { Icon, color, bgColor } = getIconForIndex(index);
            return (
              <Card key={achievement.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${color}`} />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(achievement.id)}
                      className="text-red-500 hover:text-red-700"
                      data-testid={`button-delete-achievement-${achievement.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {achievement.fileUrl && (
                    <img 
                      src={achievement.fileUrl}
                      alt="Achievement certificate" 
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                  )}
                  
                  <h3 
                    className="font-semibold text-gray-900 mb-2"
                    data-testid={`text-achievement-name-${achievement.id}`}
                  >
                    {achievement.name}
                  </h3>
                  
                  {achievement.description && (
                    <p 
                      className="text-gray-600 text-sm mb-3 line-clamp-2"
                      data-testid={`text-achievement-description-${achievement.id}`}
                    >
                      {achievement.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {format(new Date(achievement.achievedAt!), "MMM d, yyyy")}
                    </span>
                    {(achievement.certificateLink || achievement.fileUrl) && (
                      <a
                        href={achievement.certificateLink || achievement.fileUrl!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                        data-testid={`link-view-certificate-${achievement.id}`}
                      >
                        View Certificate
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
