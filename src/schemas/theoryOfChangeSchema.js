import { z } from "zod";

// Schema for sub-outcome
const subOutcomeSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Sub-outcome title cannot be empty"),
});

// Schema for assumption
const assumptionSchema = z.object({
  id: z.string(),
  description: z.string().min(1, "Assumption description cannot be empty"),
  certainty: z.enum(["very", "moderate", "uncertain"], {
    required_error: "Certainty level is required",
  }),
});

// Schema for outcome item (direct, indirect, ultimate)
const outcomeItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Outcome title cannot be empty"),
  subOutcomes: z.array(subOutcomeSchema).optional().default([]),
});

// Main schema for the entire theory of change data
export const theoryOfChangeSchema = z.object({
  reasonValue: z.string().min(1, "Reason for existence cannot be empty"),
  peopleTags: z
    .array(z.string())
    .min(1, "At least one person/group must be specified")
    .refine((tags) => tags.every((tag) => tag.trim().length > 0), {
      message: "All people tags must be non-empty",
    }),
  assumptions: z.array(assumptionSchema).min(1, "At least one assumption must be specified"),
  directOutcomes: z.array(outcomeItemSchema).min(1, "At least one direct outcome must be specified"),
  indirectOutcomes: z.array(outcomeItemSchema).min(1, "At least one indirect outcome must be specified"),
  ultimateImpact: z.array(outcomeItemSchema).min(1, "At least one ultimate impact must be specified"),
  timestamp: z.string().optional(),
});

// Schema for the complete data structure that gets saved
export const savedDataSchema = z.object({
  reasonValue: z.string().min(1, "Reason for existence cannot be empty"),
  peopleTags: z
    .array(z.string())
    .min(1, "At least one person/group must be specified")
    .refine((tags) => tags.every((tag) => tag.trim().length > 0), {
      message: "All people tags must be non-empty",
    }),
  assumptions: z.array(assumptionSchema).min(1, "At least one assumption must be specified"),
  directOutcomes: z.array(outcomeItemSchema).min(1, "At least one direct outcome must be specified"),
  indirectOutcomes: z.array(outcomeItemSchema).min(1, "At least one indirect outcome must be specified"),
  ultimateImpact: z.array(outcomeItemSchema).min(1, "At least one ultimate impact must be specified"),
  timestamp: z.string(),
});

// Helper function to validate the current state
export const validateTheoryOfChangeData = (data) => {
  try {
    theoryOfChangeSchema.parse(data);
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError && error.errors) {
      return {
        isValid: false,
        errors: error.errors.map((err) => ({
          field: err.path ? err.path.join(".") : "unknown",
          message: err.message || "Validation error",
        })),
      };
    }
    return {
      isValid: false,
      errors: [{ field: "unknown", message: "Unknown validation error" }],
    };
  }
};
