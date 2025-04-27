import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Endpoint for frontend config
  app.get("/api/config", (_req: Request, res: Response) => {
    // Only expose the Supabase public credentials
    res.json({
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY
    });
  });

  // API route for submitting a lead form
  app.post("/api/leads", async (req: Request, res: Response) => {
    try {
      // Validate the request body against the schema
      const leadData = insertLeadSchema.parse(req.body);
      
      // Store the lead in our storage system
      const lead = await storage.createLead(leadData);
      
      // Return the created lead with a 201 status
      return res.status(201).json({
        message: "Lead created successfully",
        data: lead
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation error",
          errors: validationError.message
        });
      }
      
      // Handle other errors
      return res.status(500).json({
        message: "An error occurred while creating the lead"
      });
    }
  });

  // API route for getting all leads (admin functionality)
  app.get("/api/leads", async (_req: Request, res: Response) => {
    try {
      const leads = await storage.getLeads();
      return res.status(200).json({
        data: leads
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred while fetching leads"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
