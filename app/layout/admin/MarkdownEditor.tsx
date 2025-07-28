import { useEffect, useState } from 'react';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import { useTheme } from '~/components/theme-provider';

export default function MarkdownEditor({ value, onChange, disabled }: { value?: string; onChange: (val: string) => void, disabled?: boolean }) {
  const [Editor, setEditor] = useState<any>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const load = async () => {
      const mod = await import('@uiw/react-md-editor')
      setEditor(() => mod.default)
    }
    load()
  }, [])

  if (!Editor) return null

  return (
    <div className='rounded-xl p-4 not-prose' data-color-mode={theme}>
      <Editor
        height={600}
        value={value}
        onChange={(val: string) => {
          onChange(val)
        }}
        previewOptions={{
          rehypePlugins: [[rehypePrism, { ignoreMissing: true }]],
          remarkPlugins: [[remarkGfm]]
        }}
        textareaProps={{
          disabled: disabled,
        }}
      />
    </div>
  )
}
