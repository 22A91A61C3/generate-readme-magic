import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GitHubUrlInput } from '@/components/GitHubUrlInput';
import { GenerationProgress } from '@/components/GenerationProgress';
import { ReadmePreview } from '@/components/ReadmePreview';
import { useReadmeGenerator } from '@/hooks/useReadmeGenerator';
import { Button } from '@/components/ui/button';
import { RefreshCw, Sparkles, Zap, FileText, Github } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const { stage, progress, markdown, html, error, generateReadme, reset } = useReadmeGenerator();

  const handleGenerate = async (url: string) => {
    toast.info('Starting README generation...');
    await generateReadme(url);
  };

  const handleReset = () => {
    reset();
    toast.info('Ready for a new README!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-surface">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Hero Section */}
        {stage === 'idle' && (
          <section className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-6">
              <div className="h-20 w-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow mx-auto animate-pulse-glow">
                <FileText className="h-10 w-10 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Generate Professional READMEs
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Transform any GitHub repository into a beautiful, comprehensive README in seconds with AI-powered analysis
            </p>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced analysis of your repository structure and code
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-success" />
                </div>
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Generate complete READMEs in seconds, not hours
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center mx-auto mb-4">
                  <Github className="h-6 w-6 text-warning" />
                </div>
                <h3 className="font-semibold mb-2">GitHub Native</h3>
                <p className="text-sm text-muted-foreground">
                  Seamless integration with any GitHub repository
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Input Section */}
        {stage === 'idle' && (
          <section className="mb-16">
            <GitHubUrlInput onSubmit={handleGenerate} isLoading={false} />
          </section>
        )}

        {/* Progress Section */}
        {(stage === 'analyzing' || stage === 'generating' || stage === 'error') && (
          <section className="mb-16">
            <GenerationProgress stage={stage} progress={progress} />
            {error && (
              <div className="max-w-3xl mx-auto mt-6 p-6 bg-destructive/10 border border-destructive/20 rounded-lg animate-slide-up">
                <h3 className="text-lg font-semibold text-destructive mb-2">Error</h3>
                <p className="text-sm text-destructive/90 mb-4">{error}</p>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            )}
          </section>
        )}

        {/* Complete - Show Progress + Preview */}
        {stage === 'complete' && (
          <>
            <section className="mb-12">
              <GenerationProgress stage={stage} progress={progress} />
            </section>
            <section className="mb-12">
              <ReadmePreview markdown={markdown} html={html} />
            </section>
            <section className="text-center">
              <Button
                onClick={handleReset}
                size="lg"
                variant="outline"
                className="hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate Another README
              </Button>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
