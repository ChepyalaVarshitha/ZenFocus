import {
  users,
  tasks,
  notes,
  skills,
  achievements,
  studySessions,
  type User,
  type UpsertUser,
  type Task,
  type InsertTask,
  type Note,
  type InsertNote,
  type Skill,
  type InsertSkill,
  type Achievement,
  type InsertAchievement,
  type StudySession,
  type InsertStudySession,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Task operations
  getUserTasks(userId: string): Promise<Task[]>;
  createTask(userId: string, task: InsertTask): Promise<Task>;
  updateTask(taskId: string, userId: string, updates: Partial<Task>): Promise<Task | undefined>;
  deleteTask(taskId: string, userId: string): Promise<boolean>;
  
  // Note operations
  getUserNotes(userId: string): Promise<Note[]>;
  createNote(userId: string, note: InsertNote): Promise<Note>;
  deleteNote(noteId: string, userId: string): Promise<boolean>;
  
  // Skill operations
  getUserSkills(userId: string): Promise<Skill[]>;
  createSkill(userId: string, skill: InsertSkill): Promise<Skill>;
  updateSkill(skillId: string, userId: string, updates: Partial<Skill>): Promise<Skill | undefined>;
  deleteSkill(skillId: string, userId: string): Promise<boolean>;
  
  // Achievement operations
  getUserAchievements(userId: string): Promise<Achievement[]>;
  createAchievement(userId: string, achievement: InsertAchievement): Promise<Achievement>;
  deleteAchievement(achievementId: string, userId: string): Promise<boolean>;
  
  // Study session operations
  getUserStudySessions(userId: string): Promise<StudySession[]>;
  createStudySession(userId: string, session: InsertStudySession): Promise<StudySession>;
  
  // Progress operations
  getUserProgress(userId: string): Promise<{
    totalPoints: number;
    tasksCompleted: number;
    studyHours: number;
    currentStreak: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Task operations
  async getUserTasks(userId: string): Promise<Task[]> {
    return await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, userId))
      .orderBy(desc(tasks.createdAt));
  }

  async createTask(userId: string, task: InsertTask): Promise<Task> {
    const [newTask] = await db
      .insert(tasks)
      .values({ ...task, userId })
      .returning();
    return newTask;
  }

  async updateTask(taskId: string, userId: string, updates: Partial<Task>): Promise<Task | undefined> {
    const [updatedTask] = await db
      .update(tasks)
      .set(updates)
      .where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)))
      .returning();
    return updatedTask;
  }

  async deleteTask(taskId: string, userId: string): Promise<boolean> {
    const result = await db
      .delete(tasks)
      .where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)));
    return (result.rowCount ?? 0) > 0;
  }

  // Note operations
  async getUserNotes(userId: string): Promise<Note[]> {
    return await db
      .select()
      .from(notes)
      .where(eq(notes.userId, userId))
      .orderBy(desc(notes.createdAt));
  }

  async createNote(userId: string, note: InsertNote): Promise<Note> {
    const [newNote] = await db
      .insert(notes)
      .values({ ...note, userId })
      .returning();
    return newNote;
  }

  async deleteNote(noteId: string, userId: string): Promise<boolean> {
    const result = await db
      .delete(notes)
      .where(and(eq(notes.id, noteId), eq(notes.userId, userId)));
    return (result.rowCount ?? 0) > 0;
  }

  // Skill operations
  async getUserSkills(userId: string): Promise<Skill[]> {
    return await db
      .select()
      .from(skills)
      .where(eq(skills.userId, userId))
      .orderBy(desc(skills.createdAt));
  }

  async createSkill(userId: string, skill: InsertSkill): Promise<Skill> {
    const [newSkill] = await db
      .insert(skills)
      .values({ ...skill, userId })
      .returning();
    return newSkill;
  }

  async updateSkill(skillId: string, userId: string, updates: Partial<Skill>): Promise<Skill | undefined> {
    const [updatedSkill] = await db
      .update(skills)
      .set(updates)
      .where(and(eq(skills.id, skillId), eq(skills.userId, userId)))
      .returning();
    return updatedSkill;
  }

  async deleteSkill(skillId: string, userId: string): Promise<boolean> {
    const result = await db
      .delete(skills)
      .where(and(eq(skills.id, skillId), eq(skills.userId, userId)));
    return (result.rowCount ?? 0) > 0;
  }

  // Achievement operations
  async getUserAchievements(userId: string): Promise<Achievement[]> {
    return await db
      .select()
      .from(achievements)
      .where(eq(achievements.userId, userId))
      .orderBy(desc(achievements.achievedAt));
  }

  async createAchievement(userId: string, achievement: InsertAchievement): Promise<Achievement> {
    const [newAchievement] = await db
      .insert(achievements)
      .values({ ...achievement, userId })
      .returning();
    return newAchievement;
  }

  async deleteAchievement(achievementId: string, userId: string): Promise<boolean> {
    const result = await db
      .delete(achievements)
      .where(and(eq(achievements.id, achievementId), eq(achievements.userId, userId)));
    return (result.rowCount ?? 0) > 0;
  }

  // Study session operations
  async getUserStudySessions(userId: string): Promise<StudySession[]> {
    return await db
      .select()
      .from(studySessions)
      .where(eq(studySessions.userId, userId))
      .orderBy(desc(studySessions.completedAt));
  }

  async createStudySession(userId: string, session: InsertStudySession): Promise<StudySession> {
    const [newSession] = await db
      .insert(studySessions)
      .values({ ...session, userId })
      .returning();
    return newSession;
  }

  // Progress operations
  async getUserProgress(userId: string): Promise<{
    totalPoints: number;
    tasksCompleted: number;
    studyHours: number;
    currentStreak: number;
  }> {
    // Get completed tasks
    const completedTasks = await db
      .select()
      .from(tasks)
      .where(and(eq(tasks.userId, userId), eq(tasks.completed, true)));

    // Calculate points (easy: 1, medium: 2, hard: 3)
    const totalPoints = completedTasks.reduce((total, task) => {
      const points = task.difficulty === 'easy' ? 1 : task.difficulty === 'medium' ? 2 : 3;
      return total + points;
    }, 0);

    // Get study sessions
    const sessions = await db
      .select()
      .from(studySessions)
      .where(eq(studySessions.userId, userId));

    const studyHours = sessions.reduce((total, session) => total + session.duration, 0) / 60;

    // Calculate current streak (simplified - consecutive days with completed tasks)
    const currentStreak = 12; // Placeholder - would need more complex logic

    return {
      totalPoints,
      tasksCompleted: completedTasks.length,
      studyHours: Math.round(studyHours * 10) / 10,
      currentStreak,
    };
  }
}

export const storage = new DatabaseStorage();
