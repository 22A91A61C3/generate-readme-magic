// API client for Flask backend integration

const API_BASE_URL = 'http://localhost:5000/api';

export interface ReadmeGenerationRequest {
  github_url: string;
}

export interface ReadmeGenerationResponse {
  success: boolean;
  markdown?: string;
  html?: string;
  error?: string;
  message?: string;
}

export interface RepositoryAnalysis {
  success: boolean;
  name?: string;
  description?: string;
  language?: string;
  stars?: number;
  error?: string;
}

class ReadmeGeneratorAPI {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async generateReadme(githubUrl: string): Promise<ReadmeGenerationResponse> {
    try {
      const response = await fetch(`${this.baseURL}/generate-readme`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ github_url: githubUrl }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating README:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate README',
      };
    }
  }

  async analyzeRepository(githubUrl: string): Promise<RepositoryAnalysis> {
    try {
      const response = await fetch(`${this.baseURL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ github_url: githubUrl }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error analyzing repository:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to analyze repository',
      };
    }
  }

  async previewReadme(markdownContent: string): Promise<{ success: boolean; html?: string; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/preview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: markdownContent }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error previewing README:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to preview README',
      };
    }
  }

  async healthCheck(): Promise<{ status: string }> {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'error' };
    }
  }
}

export const apiClient = new ReadmeGeneratorAPI();
