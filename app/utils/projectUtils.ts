import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define Project interface
export interface Project {
  id: string;
  content: string;
  title: string;
  description?: string;
  date?: string;
}

// Get data for a specific project
export async function getProjectData(id: string): Promise<Project | null> {
  try {
    const projectsDirectory = path.join(process.cwd(), 'app/content/projects');
    const filePath = path.join(projectsDirectory, `${id}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      id,
      content,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

// Check if project exists
export function projectExists(id: string): boolean {
  try {
    const projectsDirectory = path.join(process.cwd(), 'app/content/projects');
    const filePath = path.join(projectsDirectory, `${id}.md`);
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
} 