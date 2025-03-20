import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { getProjectData, Project } from '@/app/utils/projectUtils';

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
  
  const date = project.date ? new Date(project.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).toLowerCase() : '';
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          {project.date && <p className="text-gray-400 mb-2">{date}</p>}
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