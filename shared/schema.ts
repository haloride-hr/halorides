import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  parentName: text("parent_name").notNull(),
  childGrade: text("child_grade").notNull(),
  schoolName: text("school_name"),
  city: text("city").notNull(),
  mobileNumber: text("mobile_number").notNull(),
  email: text("email"),
  createdAt: text("created_at").notNull()
});

// Create insert schemas
export const insertUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const insertLeadSchema = z.object({
  parentName: z.string().min(1).regex(/^[a-zA-Z\s]+$/, "Only alphabets allowed"),
  childGrade: z.string().min(1),
  schoolName: z.string().regex(/^[a-zA-Z\s]*$/, "Only alphabets allowed").optional(),
  city: z.string().min(1).regex(/^[a-zA-Z\s]+$/, "Only alphabets allowed"),
  mobileNumber: z.string().min(1).regex(/^\d{10}$/, "Must be exactly 10 digits"),
  email: z.string().email().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
