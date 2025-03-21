import { tool, DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import axios from "../../../../axios";

/**
 * Get a goal by its ID
 * @param {string} id - The ID of the goal to retrieve
 * @returns {Object|null} A single goal object with OKR details. Returns null if not found or on error.
 */
const getGoalById = tool(async (args) => {
  try {
    const response = await axios.get(`/v1/okrs/${args.id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching goals", error);
    return null;
  }
}, {
  name: "getGoalById",
  description: `
  Get Goal Data by Id. Returns a goal object or null if not found.
  
  Response Structure:
  {
    id: number, // The id of the goal/objective
    name: string, // The title of the goal/objective
    properties: object, // Additional properties if any
    createdAt: string, // ISO timestamp when the goal was created
    dueDate: string, // ISO timestamp for the goal's due date
    objectiveMappings: array, // Mappings to other objectives
    objectiveSettingAttributes: {
      id: number,
      attributeType: string, // e.g., "TARGET_ACHIEVED"
      value: string, // e.g., "false"
      objectType: string, // e.g., "OBJECTIVE"
      objectId: string, // ID of the objective
      companyId: string,
      createdAt: string, // ISO timestamp
      updatedAt: string // ISO timestamp
    },
    totalKeyResults: number, // Number of key results for this goal
    completedKeyResults: number, // Number of completed key results
    totalChildGoals: number, // Number of child goals
    assignees: {
      assigneeId: string,
      assignorId: string,
      isActive: boolean,
      assignorName: string,
      assignorPicUrl: string,
      assigneeName: string,
      assigneePicUrl: string,
      department: string,
      managerName: string | null
    },
    objectiveParticipants: array, // List of participants
    targetAchieved: string, // "true" or "false"
    type: string, // e.g., "GOAL"
    status: string, // e.g., "NOT_STARTED", "IN_PROGRESS", "COMPLETED"
    startDate: string, // ISO timestamp
    currentProgress: string, // Progress as a string percentage
    objectType: string, // e.g., "ORGANIZATION"
    icon: string, // Emoji icon for the goal
    state: string, // e.g., "ACTIVE"
    isAligned: boolean,
    progressUpdatedAt: string, // ISO timestamp
    completedAt: string | null, // ISO timestamp if completed
    objectiveAssignees: array, // List of assignees with details
    objectiveVisibilities: array, // Visibility settings
    projectionStatus: string, // e.g., "OFF_TRACK", "ON_TRACK"
    projectedCompletionDate: string // ISO timestamp
  }
  `,
  schema: z.object({
    id: z.string(),
  }),
});

/**
 * Get all goals
 * @returns {Array} Array of goal objects with detailed OKR data. Returns an empty array if none found or on error.
 */
const getAllGoals = tool(async (args) => {
  try {
    const filters: any = {
      "term": "", "filters": [{ "type": "type", "value": ["GOAL"] }], "sort": { "column": "createdAt", "order": "DESC" }, "page": 1, "limit": 50
    };
    if (args.filters) {
      if (args.filters.status?.length) {
        filters.filters.push({ type: "status", value: args.filters.status });
      }
      if (args.filters.title) {
        filters.term = args.filters.title;
      }
      if (args.filters.assigneeId?.length) {
        filters.filters.push({ type: "assigneeId", value: args.filters.assigneeId.map(String) });
      }
      if (args.filters.projectedDelay) {
        filters.filters.push({ type: "quickFilter", value: "projectedRisks" });
      }
      if (args.filters.leastProgressed) {
        filters.filters.push({ type: "quickFilter", value: "leastProgressed" });
      }
      if (args.filters.mostProgressed) {
        filters.filters.push({ type: "quickFilter", value: "mostProgressed" });
      }
    }
    const response = await axios.post("v1/okrs/list", filters);
    return response.data;
  } catch (error) {
    console.error("Error fetching goals", error);
    return [];
  }
}, {
  name: "getAllGoals",
  description: `Get All Goals Data in the Company/Organization. Returns an array of goal objects or an empty array if none found.
  
  Response Structure:
  [
    {
      id: number, // The id of the goal/objective
      name: string, // The title of the goal/objective
      properties: object, // Additional properties if any
      createdAt: string, // ISO timestamp when the goal was created
      dueDate: string, // ISO timestamp for the goal's due date
      objectiveMappings: array, // Mappings to other objectives
      objectiveSettingAttributes: {
        id: number,
        attributeType: string, // e.g., "TARGET_ACHIEVED"
        value: string, // e.g., "false"
        objectType: string, // e.g., "OBJECTIVE"
        objectId: string, // ID of the objective
        companyId: string,
        createdAt: string, // ISO timestamp
        updatedAt: string // ISO timestamp
      },
      totalKeyResults: number, // Number of key results for this goal
      completedKeyResults: number, // Number of completed key results
      totalChildGoals: number, // Number of child goals
      assignees: {
        assigneeId: string,
        assignorId: string,
        isActive: boolean,
        assignorName: string,
        assignorPicUrl: string,
        assigneeName: string,
        assigneePicUrl: string,
        department: string,
        managerName: string | null
      },
      objectiveParticipants: array, // List of participants
      targetAchieved: string, // "true" or "false"
      type: string, // e.g., "GOAL"
      status: string, // e.g., "NOT_STARTED", "IN_PROGRESS", "COMPLETED"
      startDate: string, // ISO timestamp
      currentProgress: string, // Progress as a string percentage
      objectType: string, // e.g., "ORGANIZATION"
      icon: string, // Emoji icon for the goal
      state: string, // e.g., "ACTIVE"
      isAligned: boolean,
      progressUpdatedAt: string, // ISO timestamp
      completedAt: string | null, // ISO timestamp if completed
      objectiveAssignees: array, // List of assignees with details
      objectiveVisibilities: array, // Visibility settings
      projectionStatus: string, // e.g., "OFF_TRACK", "ON_TRACK"
      projectedCompletionDate: string // ISO timestamp
    }
  ]
  `,
  schema: z.object({
    filters: z.object({
      status: z.array(z.enum(["NOT_STARTED", "IN_PROGRESS", "RISK_OF_DELAY", "DELAYED", "COMPLETED"])).optional().describe("The status of the goal").default([]),
      title: z.string().optional().describe("The title of the goal"),
      assigneeId: z.array(z.number()).optional().describe("The Assigned Employee Id's of the Goals"),
      projectedDelay: z.boolean().optional().describe("Filter the goals based on the projected delay in the completion date"),
      leastProgressed: z.boolean().optional().describe("Filter the goals based on the least progressed rate. It means Goals with the lowest progress percentage will be shown first"),
      mostProgressed: z.boolean().optional().describe("Filter the goals based on the most progressed rate. It means Goals with the highest progress percentage will be shown first"),
    }).optional().describe("The filters to apply when fetching the Goals"),
  }),
});

export const tools: DynamicStructuredTool[] = [getGoalById, getAllGoals];