import type { Element, Text } from 'hast';
import 'prism-themes/themes/prism-one-dark.css';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';

interface PreCodeBlockProps {
  node?: Element;
  children?: React.ReactNode;
  [key: string]: any;
}

function getCodeString(children: (Element | Text)[]): string {
  return children.map(child => {
    if (child.type === 'text') {
      return child.value;
    }
    if (child.type === 'element' && child.children) {
      return getCodeString(child.children as (Element | Text)[]);
    }
    return '';
  }).join('');
}

function PreCodeBlock({ node, children, ...props }: PreCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  let rawCode = '';
  const firstChild = node?.children?.[0];

  if (firstChild && firstChild.type === 'element' && firstChild.properties) {
    rawCode = firstChild.properties['data-rehype-prism-plus-raw'] as string || '';
    if (!rawCode && firstChild.children) {
      rawCode = getCodeString(firstChild.children as (Element | Text)[]);
    }
  } else {
    console.warn('Could not find code element or its properties. Type:', firstChild?.type, 'firstChild:', firstChild);
  }
  const handleCopy = async () => {
    if (rawCode) {
      try {
        await navigator.clipboard.writeText(rawCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy code: ', err);
        alert('Failed to copy code. Please copy manually. Error: ' + (err as Error).message);
      }
    } else {
      console.warn('Cannot copy: rawCode is empty.');
    }
  };

  return (
    <div className="relative group my-4">
      <button
        onClick={handleCopy}
        className={`
          absolute top-2 right-2 z-10 px-3 py-1 rounded
          bg-gray-700 text-white text-xs font-semibold
          opacity-0 group-hover:opacity-100 transition-opacity duration-200
          cursor-pointer
          ${copied ? 'bg-green-600 opacity-100' : 'hover:bg-gray-600'}
        `}
        title={copied ? 'Copied!' : 'Copy to clipboard'}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>

      <pre {...props}>
        {children}
      </pre>
    </div>
  );
}

export default function MarkdownViewer({ content }: { content: string }) {
  return (
    <div className='prose dark:prose-invert max-w-none'>
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypePrism]}
        components={{
          a({ href, children, ...props }) {
            const isInternalLink = href && href.startsWith('/');
            if (isInternalLink) {
              return (
                <Link
                  to={href}
                  className="text-blue-600 dark:text-sky-400 hover:underline"
                  {...props}
                >
                  {children}
                </Link>
              );
            } else {
              return (
                <a
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className="text-blue-600 dark:text-sky-400 hover:underline"
                  {...props}
                >
                  {children}
                </a>
              );
            }
          },
          pre: PreCodeBlock,
        }}
      />
    </div>
  )
}