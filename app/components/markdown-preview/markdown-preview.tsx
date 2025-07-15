import 'prism-themes/themes/prism-one-dark.css';
import ReactMarkdown from 'react-markdown';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';

const markdownContent = `
# 🧠 Tóm tắt bài học

- Học về Artplayer
- Thực hành phát video
- Biết cách tạo menu

## 🔥 Bonus

\`\`\`ts
class Car {
  constructor(brand) {
    this.brand = brand;
  }
  run() {
    console.log(\`Car \${this.brand} is running...\`);
  }
}
\`\`\`
\`\`\`ts
class Car {
  constructor(brand) {
    this.brand = brand;
  }
  run() {
    console.log(\`Car \${this.brand} is running...\`);
  }
}
\`\`\`
\`\`\`ts
class Car {
  constructor(brand) {
    this.brand = brand;
  }
  run() {
    console.log(\`Car \${this.brand} is running...\`);
  }
}
\`\`\`
\`\`\`ts
class Car {
  constructor(brand) {
    this.brand = brand;
  }
  run() {
    console.log(\`Car \${this.brand} is running...\`);
  }
}
\`\`\`
\`\`\`ts
class Car {
  constructor(brand) {
    this.brand = brand;
  }
  run() {
    console.log(\`Car \${this.brand} is running...\`);
  }
}
\`\`\`
\`\`\`ts
class Car {
  constructor(brand) {
    this.brand = brand;
  }
  run() {
    console.log(\`Car \${this.brand} is running...\`);
  }
}
\`\`\`
\`\`\`ts
class Car {
  constructor(brand) {
    this.brand = brand;
  }
  run() {
    console.log(\`Car \${this.brand} is running...\`);
  }
}
\`\`\`
`;

export default function MarkdownViewer() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <ReactMarkdown
        children={markdownContent}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypePrism]}
      />
    </div>
  );
}
