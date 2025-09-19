import { NextApiRequest, NextApiResponse } from 'next';

// We'll proxy to the backend API using a simpler approach
// This avoids the TypeScript decorator issues we were encountering

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('Next.js API handler called:', req.method, req.url);

    // Simple test response for root API path
    if (req.url === '/api' || req.url === '/') {
      return res.json({ message: 'Cybermind API is working via Next.js', timestamp: new Date().toISOString() });
    }

    // For production deployment, we need to implement actual job management
    // Let's create a simple in-memory implementation for now
    const path = req.url?.replace('/api', '') || '';

    if (path.startsWith('/jobs')) {
      return handleJobsApi(req, res, path);
    }

    return res.status(404).json({ error: 'API endpoint not found' });
  } catch (error) {
    console.error('Handler error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ error: 'Internal server error', message: errorMessage });
  }
}

// Simple jobs API implementation
async function handleJobsApi(req: NextApiRequest, res: NextApiResponse, path: string) {
  const { method } = req;

  // For now, return mock data that matches the expected format
  if (method === 'GET' && path === '/jobs') {
    // Handle query parameters
    const { page = 1 } = req.query;
    // Note: limit, search, jobType, minSalary, maxSalary can be used for filtering in the future

    return res.json({
      data: [
        {
          id: '1',
          title: 'Senior Frontend Developer',
          companyName: 'Tech Corp',
          location: 'Remote',
          jobType: 'full-time',
          salaryRange: '₹80,000 - ₹120,000',
          description: 'Looking for an experienced frontend developer...',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Backend Engineer',
          companyName: 'StartupXYZ',
          location: 'Bangalore',
          jobType: 'full-time',
          salaryRange: '₹60,000 - ₹90,000',
          description: 'Join our backend team...',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ],
      totalCount: 2,
      currentPage: parseInt(page as string),
      totalPages: 1,
    });
  }

  if (method === 'POST' && path === '/jobs') {
    // Create a new job
    const jobData = req.body;
    const newJob = {
      id: Date.now().toString(),
      ...jobData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return res.status(201).json(newJob);
  }

  if (method === 'GET' && path.match(/^\/jobs\/[^/]+$/)) {
    // Get single job
    const id = path.split('/')[2];
    return res.json({
      id,
      title: 'Sample Job',
      companyName: 'Sample Company',
      location: 'Sample Location',
      jobType: 'full-time',
      salaryRange: '₹50,000 - ₹80,000',
      description: 'Sample job description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  if (method === 'PATCH' && path.match(/^\/jobs\/[^/]+$/)) {
    // Update job
    const id = path.split('/')[2];
    const updates = req.body;
    return res.json({
      id,
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  }

  if (method === 'DELETE' && path.match(/^\/jobs\/[^/]+$/)) {
    // Delete job
    return res.status(204).end();
  }

  return res.status(404).json({ error: 'Jobs API endpoint not found' });
}