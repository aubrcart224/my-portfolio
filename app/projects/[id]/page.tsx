import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';


// Define Project interface
interface Project {

    id: string;
    content: string;
    title: string;
    description?: string;
    date: string;

  }

// Helper function to get project data
async function getProjectData(id: string) {
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
      ...data,
      content
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const project = await getProjectData(params.id);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }
  
  return {
    title: `${project.title} | Projects`,
    description: project.description || '',
  };
}

// Custom components for markdown
const MarkdownComponents = {
  img: (props: any) => (
    <div className="my-6">
      <Image
        src={props.src}
        alt={props.alt || ''}
        width={800}
        height={450}
        className="rounded-md"
        style={{ objectFit: 'contain' }}
      />
    </div>
  ),
  video: (props: any) => (
    <div className="my-6">
      <video 
        controls
        className="w-full rounded-md"
        src={props.src}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  ),
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4 text-white" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-6 mb-3 text-white" {...props} />,
  p: (props: any) => <p className="mb-4 text-gray-300" {...props} />,
  code: (props: any) => (
    <code className="bg-gray-800 p-1 rounded text-red-400" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto my-4 text-gray-300" {...props} />
  ),
};

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectData(params.id);
  
  if (!project) {
    notFound();
  }
  
  const date = new Date(project.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).toLowerCase();
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-gray-400 mb-2">{date}</p>
          <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown components={MarkdownComponents}>
            {project.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}