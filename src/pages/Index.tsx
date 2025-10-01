import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GitHubUrlInput } from '@/components/GitHubUrlInput';
import { GenerationProgress } from '@/components/GenerationProgress';
import { ReadmePreview } from '@/components/ReadmePreview';
import { useReadmeGenerator } from '@/hooks/useReadmeGenerator';
import { Button } from '@/components/ui/button';
import { RefreshCw, Sparkles, Zap, FileText, Github, Eye, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        {stage === 'idle' && (
          <>
            <section className="container mx-auto px-4 py-20 md:py-32">
              <div className="max-w-5xl mx-auto text-center space-y-8">
                <div className="space-y-6 animate-fade-in">
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                    AI-Powered README Generator
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Transform your repositories into professional documentation in seconds. 
                    Our AI creates complete, structured README files that make your projects shine.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
                  <Button size="lg" className="text-lg px-8 py-6 h-auto" asChild>
                    <Link to="/signup">
                      <Github className="mr-2 h-5 w-5" />
                      Try it now with GitHub
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto">
                    <Eye className="mr-2 h-5 w-5" />
                    View Demo
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  No credit card required. Sign in with GitHub to get started.
                </p>
              </div>
            </section>

            {/* Features Section */}
            <section className="bg-muted/50 py-16">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  <div className="bg-card p-8 rounded-xl shadow-sm border border-border space-y-4 hover:shadow-md transition-all hover:-translate-y-1">
                    <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">AI-Powered</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Analyzes your code and project files to create perfectly tailored documentation
                    </p>
                  </div>

                  <div className="bg-card p-8 rounded-xl shadow-sm border border-border space-y-4 hover:shadow-md transition-all hover:-translate-y-1">
                    <div className="h-14 w-14 rounded-xl bg-success/10 flex items-center justify-center">
                      <Zap className="h-7 w-7 text-success" />
                    </div>
                    <h3 className="text-2xl font-bold">One-Click Solution</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Generate complete READMEs in seconds with a single click
                    </p>
                  </div>

                  <div className="bg-card p-8 rounded-xl shadow-sm border border-border space-y-4 hover:shadow-md transition-all hover:-translate-y-1">
                    <div className="h-14 w-14 rounded-xl bg-warning/10 flex items-center justify-center">
                      <FileText className="h-7 w-7 text-warning" />
                    </div>
                    <h3 className="text-2xl font-bold">Professional Format</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Well-structured with all essential sections following industry best practices
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Generator/Demo Section */}
            <section className="container mx-auto px-4 py-20">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold">See what our AI generates</h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Our AI-powered README generator creates complete, professional documentation for your projects. 
                    Save hours of writing time and ensure your projects have clear, comprehensive documentation.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Input Section */}
                  <div className="space-y-6">
                    <div className="bg-card p-8 rounded-xl shadow-sm border border-border space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Complete Structure</span>
                        </div>
                        <p className="text-muted-foreground">
                          All essential sections including installation, usage, API reference, and more
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Code Examples</span>
                        </div>
                        <p className="text-muted-foreground">
                          Clear usage examples with syntax-highlighted code blocks
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Badges & Links</span>
                        </div>
                        <p className="text-muted-foreground">
                          Professional badges and relevant links to enhance your project
                        </p>
                      </div>

                      <div className="pt-4">
                        <GitHubUrlInput onSubmit={handleGenerate} isLoading={false} />
                      </div>
                    </div>
                  </div>

                  {/* Preview Section */}
                  <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                    <div className="bg-muted px-6 py-4 border-b border-border">
                      <h3 className="font-bold text-lg">README.md Preview</h3>
                    </div>
                    <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
                      <h1 className="text-3xl font-bold">SkinScanAI</h1>
                      <h2 className="text-2xl font-semibold text-muted-foreground">Overview</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        This project aims to provide a solution for skin condition analysis using AI. 
                        While the initial description is absent, this README will guide you through 
                        understanding the project's current structure, technologies involved, and setup process.
                      </p>
                      <h2 className="text-2xl font-semibold">Key Features & Benefits</h2>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><strong>AI-Powered Analysis:</strong> Utilizes a pre-trained model for skin condition assessment.</li>
                        <li><strong>Web Interface:</strong> Provides a user-friendly frontend for interacting with the system.</li>
                        <li><strong>Modular Design:</strong> Organized codebase for easy maintenance and extension.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Progress Section */}
        {(stage === 'analyzing' || stage === 'generating' || stage === 'error') && (
          <section className="container mx-auto px-4 py-16">
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
            <section className="container mx-auto px-4 py-12">
              <GenerationProgress stage={stage} progress={progress} />
            </section>
            <section className="container mx-auto px-4 pb-12">
              <ReadmePreview markdown={markdown} html={html} />
            </section>
            <section className="container mx-auto px-4 pb-16 text-center">
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
