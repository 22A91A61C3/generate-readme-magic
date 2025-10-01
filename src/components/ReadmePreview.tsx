import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, Eye, FileCode } from 'lucide-react';
import { toast } from 'sonner';

interface ReadmePreviewProps {
  markdown: string;
  html: string;
}

export const ReadmePreview = ({ markdown, html }: ReadmePreviewProps) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'markdown'>('preview');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const downloadReadme = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'README.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('README.md downloaded!');
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-slide-up">
      <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
        {/* Header */}
        <div className="border-b border-border bg-muted/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your README</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button
                size="sm"
                onClick={downloadReadme}
                className="bg-gradient-primary hover:opacity-90 transition-all shadow-md"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'preview' | 'markdown')} className="w-full">
          <div className="border-b border-border bg-muted/20 px-6">
            <TabsList className="bg-transparent border-0 h-12">
              <TabsTrigger
                value="preview"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="markdown"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <FileCode className="h-4 w-4 mr-2" />
                Markdown
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Preview Tab */}
          <TabsContent value="preview" className="p-6 m-0">
            <div
              className="prose prose-slate max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: html || '<p class="text-muted-foreground">No preview available</p>' }}
            />
          </TabsContent>

          {/* Markdown Tab */}
          <TabsContent value="markdown" className="p-0 m-0">
            <div className="relative">
              <pre className="p-6 bg-muted/50 overflow-x-auto">
                <code className="text-sm font-mono text-foreground whitespace-pre-wrap break-words">
                  {markdown || 'No markdown content available'}
                </code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
