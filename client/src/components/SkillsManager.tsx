import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Skill } from "@shared/schema";

export default function SkillsManager() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("beginner");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: skills = [], isLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  const createSkillMutation = useMutation({
    mutationFn: async (skillData: { name: string; level: string; progress: number }) => {
      return apiRequest("POST", "/api/skills", skillData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
      setSkillName("");
      setSkillLevel("beginner");
      setShowAddForm(false);
      toast({ title: "Skill added successfully!" });
    },
    onError: () => {
      toast({ 
        title: "Failed to add skill", 
        variant: "destructive" 
      });
    },
  });

  const deleteSkillMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/skills/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
      toast({ title: "Skill deleted successfully!" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName.trim()) return;
    
    const progressMap = {
      beginner: 25,
      intermediate: 50,
      advanced: 75,
      expert: 100
    };
    
    createSkillMutation.mutate({
      name: skillName,
      level: skillLevel,
      progress: progressMap[skillLevel as keyof typeof progressMap],
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      deleteSkillMutation.mutate(id);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner": return "bg-gray-100 text-gray-800";
      case "intermediate": return "bg-blue-100 text-blue-800";
      case "advanced": return "bg-green-100 text-green-800";
      case "expert": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (level: string) => {
    switch (level) {
      case "beginner": return "bg-gray-500";
      case "intermediate": return "bg-blue-500";
      case "advanced": return "bg-green-500";
      case "expert": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading skills...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">My Skills</h2>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-700"
          data-testid="button-add-skill"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {showAddForm && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Name
                </label>
                <Input
                  type="text"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  placeholder="e.g., JavaScript, Mathematics, Writing"
                  required
                  data-testid="input-skill-name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Level
                </label>
                <Select value={skillLevel} onValueChange={setSkillLevel}>
                  <SelectTrigger data-testid="select-skill-level">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-3">
                <Button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700"
                  disabled={createSkillMutation.isPending}
                  data-testid="button-save-skill"
                >
                  Add Skill
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  data-testid="button-cancel-skill"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No skills yet. Add your first skill to get started!</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          skills.map((skill) => (
            <Card key={skill.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 
                      className="font-semibold text-gray-900"
                      data-testid={`text-skill-name-${skill.id}`}
                    >
                      {skill.name}
                    </h3>
                    <span 
                      className={`text-sm px-2 py-1 rounded-full ${getLevelColor(skill.level)}`}
                      data-testid={`badge-skill-level-${skill.id}`}
                    >
                      {skill.level}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(skill.id)}
                    className="text-red-500 hover:text-red-700"
                    data-testid={`button-delete-skill-${skill.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(skill.level)}`}
                    style={{ width: `${skill.progress}%` }}
                    data-testid={`progress-skill-${skill.id}`}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  {skill.progress}% proficiency
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
