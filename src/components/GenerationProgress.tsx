import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { GenerationStage } from '@/hooks/useReadmeGenerator';

interface GenerationProgressProps {
  stage: GenerationStage;
  progress: number;
}

const stageConfig = {
  analyzing: {
    label: 'Analyzing Repository',
    description: 'Scanning repository structure and content...',
    icon: Loader2,
    color: 'text-primary',
  },
  generating: {
    label: 'Generating README',
    description: 'Creating your professional README...',
    icon: Loader2,
    color: 'text-primary',
  },
  complete: {
    label: 'Complete!',
    description: 'Your README is ready',
    icon: CheckCircle2,
    color: 'text-success',
  },
  error: {
    label: 'Error',
    description: 'Something went wrong',
    icon: AlertCircle,
    color: 'text-destructive',
  },
  idle: {
    label: 'Ready',
    description: 'Enter a GitHub URL to start',
    icon: CheckCircle2,
    color: 'text-muted-foreground',
  },
};

export const GenerationProgress = ({ stage, progress }: GenerationProgressProps) => {
  if (stage === 'idle') return null;

  const config = stageConfig[stage];
  const Icon = config.icon;
  const isAnimated = stage === 'analyzing' || stage === 'generating';

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-slide-up">
      <div className="bg-card rounded-xl p-8 shadow-lg border border-border">
        <div className="flex items-center gap-4 mb-6">
          <div className={`${config.color} ${isAnimated ? 'animate-spin' : ''}`}>
            <Icon className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1">{config.label}</h3>
            <p className="text-sm text-muted-foreground">{config.description}</p>
          </div>
          {progress > 0 && stage !== 'error' && (
            <div className="text-2xl font-bold text-primary">{progress}%</div>
          )}
        </div>

        {stage !== 'error' && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Started</span>
              <span>{stage === 'complete' ? 'Completed' : 'In Progress'}</span>
            </div>
          </div>
        )}

        {stage === 'complete' && (
          <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
            <p className="text-sm text-success font-medium text-center">
              ✨ README generated successfully! Scroll down to view and download.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
