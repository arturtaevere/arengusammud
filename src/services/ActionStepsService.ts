
import { ActionStep, actionSteps } from "@/data/actionStepsData";
import { actionStepsDetails, ActionStepDetails } from "@/services/actionStepData";
import { getCompetenceTitle } from "@/data/competencesData";
import { getActionStepDetailById } from "@/components/observation/data/competencyHelpers";
import { CSVImportService } from "@/services/csvImportService";

// Local storage utils
export const getVideoStorageKey = (stepId: string) => `action_step_video_${stepId}`;

/**
 * Service for handling action steps data operations
 */
export class ActionStepsService {
  /**
   * Get all action steps
   */
  static getAllActionSteps(): ActionStep[] {
    return actionSteps;
  }

  /**
   * Get action step details by ID
   */
  static getActionStepDetails(stepId: string): ActionStepDetails | null {
    // First check imported data
    const importedData = CSVImportService.getImportedData();
    
    // Use our helper to map URL IDs to data IDs
    const dataStepId = getActionStepDetailById(stepId);
    
    if (dataStepId) {
      // Check imported data first
      if (dataStepId in importedData) {
        return importedData[dataStepId];
      }
      
      // Then check built-in data
      if (dataStepId in actionStepsDetails) {
        return actionStepsDetails[dataStepId as keyof typeof actionStepsDetails];
      }
    }
    
    return null;
  }

  /**
   * Get video URL for an action step
   * Tries to get from localStorage first, then falls back to the data
   */
  static getVideoUrl(stepId: string): string {
    const dataStepId = getActionStepDetailById(stepId);
    
    if (!dataStepId) return "";
    
    // Try to get from localStorage first
    const savedVideoUrl = localStorage.getItem(getVideoStorageKey(dataStepId));
    if (savedVideoUrl) {
      return savedVideoUrl;
    }
    
    // Fall back to the data
    const details = this.getActionStepDetails(stepId);
    if (details?.videoUrl && 
        details.videoUrl !== "https://example.com/video1" && 
        details.videoUrl !== "https://example.com/video2") {
      return details.videoUrl;
    }
    
    return "";
  }

  /**
   * Save video URL for an action step
   */
  static saveVideoUrl(stepId: string, url: string): void {
    const dataStepId = getActionStepDetailById(stepId);
    
    if (!dataStepId) return;
    
    if (url) {
      localStorage.setItem(getVideoStorageKey(dataStepId), url);
    } else {
      localStorage.removeItem(getVideoStorageKey(dataStepId));
    }
  }

  /**
   * Filter action steps based on criteria
   */
  static filterActionSteps(
    categoryFilter: string = "", 
    searchTerm: string = "", 
    difficultyFilter: string = ""
  ): ActionStep[] {
    let result = [...actionSteps];
    
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(step => step.category === categoryFilter);
    }
    
    // Apply search term
    if (searchTerm) {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        step => 
          step.title.toLowerCase().includes(lowercaseSearchTerm) || 
          step.description.toLowerCase().includes(lowercaseSearchTerm)
      );
    }
    
    // Apply difficulty filter
    if (difficultyFilter && difficultyFilter !== 'all') {
      result = result.filter(step => step.difficulty === difficultyFilter);
    }
    
    return result;
  }
}
