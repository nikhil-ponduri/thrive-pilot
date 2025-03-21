
export const getGoalByIdPrompt = `
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
  `

  export const getAllGoalsPrompt = `Get All Goals Data in the Company/Organization. Returns an array of goal objects or an empty array if none found.
  
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
  `