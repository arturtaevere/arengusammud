
import { ActionStepDetailBase, ActionStepDetailsCollection } from '../actionStepDetails/types';
import { parseCSVLine, generateId, detectDelimiter } from './utils';

/**
 * Functionality for parsing CSV content into structured action step details
 */
export const parseCSVContent = (csvContent: string): ActionStepDetailsCollection => {
  const result: ActionStepDetailsCollection = {};
  
  // Try to detect the delimiter (comma or semicolon)
  const firstLine = csvContent.split('\n')[0];
  const delimiter = detectDelimiter(firstLine);
  
  console.log(`Detected delimiter: "${delimiter}"`);
  
  // Split by rows (lines)
  const lines = csvContent.split('\n');
  if (lines.length < 2) {
    throw new Error('CSV file must contain headers and at least one data row');
  }
  
  // Get headers from first line and normalize them
  const headers = parseCSVLine(lines[0], delimiter)
    .map(header => header.toLowerCase().trim());
  
  console.log('CSV Headers found:', headers);
  
  // Map headers to our expected structure
  // Try to identify the key columns based on the actual headers in the file
  const headerMap: Record<string, string> = {
    // Default mappings for standard headers
    'id': 'id',
    'title': 'title',
    'description': 'description',
    'category': 'category',
    'difficulty': 'difficulty',
    'timeestimate': 'timeEstimate',
    'reason': 'reason',
    'examples': 'examples',
    'videourl': 'videoUrl',
    
    // Custom mappings for Estonian headers based on the provided example
    'kategooria': 'category',
    'tekst': 'text',  // This will be mapped later based on context
    'sammu nimi': 'title',
    'sammu kirjeldus': 'description',
    'õpieesmärk': 'category',
  };
  
  // Process action steps row by row
  let currentId = '';
  let currentStep: Partial<ActionStepDetailBase> | null = null;
  let successCriteria: string[] = [];
  let practiceTasks: string[] = [];
  let currentCategory = '';
  
  // Process the file structure
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // Skip empty lines
    
    // Parse the line
    const values = parseCSVLine(line, delimiter);
    if (values.length < 2) continue; // Skip lines without enough values
    
    // Create an object from headers and values
    const rowData: Record<string, string> = {};
    headers.forEach((header, index) => {
      if (index < values.length) {
        rowData[header] = values[index];
      }
    });
    
    console.log(`Row ${i+1} data:`, rowData);
    
    // Detect row type based on content
    if (headers.includes('kategooria') && rowData['kategooria']?.toLowerCase() === 'õpieesmärk') {
      // This is a category definition row
      currentCategory = rowData['tekst'] || '';
      console.log(`Detected category: ${currentCategory}`);
      continue;
    }
    
    if (headers.includes('kategooria') && rowData['kategooria']?.toLowerCase() === 'sammu nimi') {
      // This is an action step title row - create a new step
      if (currentStep && currentId) {
        // Save the previous step if exists
        currentStep.successCriteria = successCriteria;
        currentStep.practiceTask = practiceTasks;
        result[currentId] = currentStep as ActionStepDetailBase;
        
        console.log(`Saved action step ${currentId} with ${successCriteria.length} criteria and ${practiceTasks.length} tasks`);
        
        // Reset for next step
        successCriteria = [];
        practiceTasks = [];
      }
      
      // Generate a unique ID for this step based on title
      const title = rowData['tekst'] || '';
      if (!title) continue;
      
      currentId = generateId(title);
      
      // Create a new step
      currentStep = {
        title: title,
        description: '',
        category: currentCategory,
        difficulty: 'beginner', // Default
        timeEstimate: '',
        reason: '',
        examples: '',
        videoUrl: '',
        successCriteria: [],
        practiceTask: []
      };
      
      console.log(`Created new step: ${currentId} - ${title}`);
      continue;
    }
    
    if (headers.includes('kategooria') && rowData['kategooria']?.toLowerCase() === 'sammu kirjeldus') {
      // This is a description row
      if (currentStep) {
        currentStep.description = rowData['tekst'] || '';
        console.log(`Added description: ${currentStep.description}`);
      }
      continue;
    }
    
    // Check if this is a line with success criteria
    if (headers.includes('kategooria') && rowData['kategooria']?.toLowerCase().includes('edukriteerium')) {
      if (currentStep) {
        const criterion = rowData['tekst']?.trim();
        if (criterion) {
          successCriteria.push(criterion);
          console.log(`Added success criterion: ${criterion}`);
        }
      }
      continue;
    }
    
    // Check if this is a line with practice task
    if (headers.includes('kategooria') && rowData['kategooria']?.toLowerCase().includes('harjutusülesanne')) {
      if (currentStep) {
        const task = rowData['tekst']?.trim();
        if (task) {
          practiceTasks.push(task);
          console.log(`Added practice task: ${task}`);
        }
      }
      continue;
    }
    
    // For standard CSV format, check if this is a line with raw success criteria or practice tasks
    if (line.match(/^Edukriteerium[;:]/i)) {
      if (currentStep) {
        const criterion = line.replace(/^Edukriteerium[;:]/i, '').trim();
        if (criterion) successCriteria.push(criterion);
      }
      continue;
    }
    
    if (line.match(/^Harjutusülesanne[;:]/i)) {
      if (currentStep) {
        const task = line.replace(/^Harjutusülesanne[;:]/i, '').trim();
        if (task) practiceTasks.push(task);
      }
      continue;
    }
    
    // For standard CSV format with direct fields
    if (headers.includes('id') && rowData['id']) {
      // Save the previous step if exists
      if (currentStep && currentId) {
        currentStep.successCriteria = successCriteria;
        currentStep.practiceTask = practiceTasks;
        result[currentId] = currentStep as ActionStepDetailBase;
        
        // Reset for next step
        successCriteria = [];
        practiceTasks = [];
      }
      
      // This is a standard CSV row with all fields
      currentId = rowData['id'];
      
      // Initialize the new step
      currentStep = {
        title: rowData['title'] || '',
        description: rowData['description'] || '',
        category: rowData['category'] || '',
        difficulty: (rowData['difficulty'] || 'beginner') as 'beginner' | 'intermediate' | 'advanced',
        timeEstimate: rowData['timeestimate'] || rowData['time'] || rowData['time estimate'] || '',
        reason: rowData['reason'] || '',
        examples: rowData['examples'] || '',
        videoUrl: rowData['videourl'] || rowData['video'] || rowData['video url'] || '',
        successCriteria: [],
        practiceTask: []
      };
      
      console.log(`Detected standard format row: ${currentId} - ${currentStep.title}`);
    }
  }
  
  // Don't forget to store the last step
  if (currentStep && currentId) {
    currentStep.successCriteria = successCriteria;
    currentStep.practiceTask = practiceTasks;
    result[currentId] = currentStep as ActionStepDetailBase;
    
    console.log(`Saving final action step ${currentId}`);
  }
  
  console.log(`Total action steps parsed: ${Object.keys(result).length}`);
  
  if (Object.keys(result).length === 0) {
    throw new Error('No valid action steps found in the CSV file. Check file format and required fields.');
  }
  
  return result;
};
