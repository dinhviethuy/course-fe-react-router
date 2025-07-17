import 'prism-themes/themes/prism-one-dark.css';
import ReactMarkdown from 'react-markdown';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';

export default function MarkdownViewer({ content }: { content: string }) {
  console.log({ content })
  return (
    <div className="prose dark:prose-invert max-w-none">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypePrism]}
      />
    </div>
  );
}
