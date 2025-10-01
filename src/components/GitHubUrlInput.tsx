import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Github, Sparkles } from 'lucide-react';

interface GitHubUrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const EXAMPLE_URLS = [
  'https://github.com/facebook/react',
  'https://github.com/vercel/next.js',
  'https://github.com/vuejs/vue',
];

export const GitHubUrlInput = ({ onSubmit, isLoading }: GitHubUrlInputProps) => {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateGitHubUrl = (input: string): boolean => {
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?$/i;
    return githubRegex.test(input);
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    if (value.length > 0) {
      setIsValid(validateGitHubUrl(value));
    } else {
      setIsValid(null);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isValid && !isLoading) {
      onSubmit(url);
    }
  };

  const fillExample = (exampleUrl: string) => {
    setUrl(exampleUrl);
    setIsValid(true);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Github className="h-5 w-5" />
          </div>
          <Input
            type="url"
            placeholder="https://github.com/username/repository"
            value={url}
            onChange={(e) => handleUrlChange(e.target.value)}
            className={`pl-12 h-14 text-lg transition-all ${
              isValid === false
                ? 'border-destructive focus-visible:ring-destructive'
                : isValid === true
                ? 'border-success focus-visible:ring-success'
                : ''
            }`}
            disabled={isLoading}
          />
          {isValid === false && (
            <p className="text-sm text-destructive mt-2 animate-slide-up">
              Please enter a valid GitHub repository URL
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={!isValid || isLoading}
          className="w-full h-14 text-lg font-semibold bg-gradient-primary hover:opacity-90 transition-all shadow-lg hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
              Generating README...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 mr-2" />
              Generate README
            </>
          )}
        </Button>
      </form>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-center">Try these examples:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {EXAMPLE_URLS.map((exampleUrl) => (
            <Button
              key={exampleUrl}
              variant="outline"
              size="sm"
              onClick={() => fillExample(exampleUrl)}
              disabled={isLoading}
              className="text-xs hover:border-primary hover:text-primary transition-all"
            >
              {exampleUrl.split('/').slice(-2).join('/')}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
