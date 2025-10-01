import { useState } from 'react';
import { apiClient, ReadmeGenerationResponse } from '@/lib/api';

export type GenerationStage = 'idle' | 'analyzing' | 'generating' | 'complete' | 'error';

interface UseReadmeGeneratorReturn {
  stage: GenerationStage;
  progress: number;
  markdown: string;
  html: string;
  error: string;
  generateReadme: (githubUrl: string) => Promise<void>;
  reset: () => void;
}

export const useReadmeGenerator = (): UseReadmeGeneratorReturn => {
  const [stage, setStage] = useState<GenerationStage>('idle');
  const [progress, setProgress] = useState(0);
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');
  const [error, setError] = useState('');

  const generateReadme = async (githubUrl: string) => {
    try {
      setError('');
      setStage('analyzing');
      setProgress(10);

      // Simulate progress during analysis
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 40));
      }, 300);

      // Analyze repository
      const analysisResult = await apiClient.analyzeRepository(githubUrl);
      clearInterval(progressInterval);
      
      if (!analysisResult.success) {
        throw new Error(analysisResult.error || 'Failed to analyze repository');
      }

      setProgress(50);
      setStage('generating');

      // Generate README
      const progressInterval2 = setInterval(() => {
        setProgress((prev) => Math.min(prev + 5, 90));
      }, 300);

      const result: ReadmeGenerationResponse = await apiClient.generateReadme(githubUrl);
      clearInterval(progressInterval2);

      if (!result.success) {
        throw new Error(result.error || 'Failed to generate README');
      }

      setMarkdown(result.markdown || '');
      setHtml(result.html || '');
      setProgress(100);
      setStage('complete');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setStage('error');
      setProgress(0);
    }
  };

  const reset = () => {
    setStage('idle');
    setProgress(0);
    setMarkdown('');
    setHtml('');
    setError('');
  };

  return {
    stage,
    progress,
    markdown,
    html,
    error,
    generateReadme,
    reset,
  };
};
