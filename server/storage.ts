import { users, type User, type InsertUser, leads, type Lead, type InsertLead } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private leadsStore: Map<number, Lead>;
  currentUserId: number;
  currentLeadId: number;

  constructor() {
    this.users = new Map();
    this.leadsStore = new Map();
    this.currentUserId = 1;
    this.currentLeadId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = this.currentLeadId++;
    // Create a new object with explicitly defined properties to avoid TypeScript errors
    const lead: Lead = { 
      id,
      parentName: insertLead.parentName,
      childGrade: insertLead.childGrade,
      schoolName: insertLead.schoolName || null,
      city: insertLead.city,
      mobileNumber: insertLead.mobileNumber,
      email: insertLead.email || null,
      createdAt: new Date().toISOString() 
    };
    this.leadsStore.set(id, lead);
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leadsStore.values());
  }
}

export const storage = new MemStorage();
