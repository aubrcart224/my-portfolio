import { NextResponse } from 'next/server';
import { getProjectData } from '@/app/utils/projectUtils';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const project = await getProjectData(id);
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Error fetching project' },
      { status: 500 }
    );
  }
} 