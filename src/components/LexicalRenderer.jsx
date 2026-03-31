/**
 * LexicalRenderer — minimal Payload CMS Lexical JSON → JSX renderer
 *
 * Handles the node types that Payload's default Lexical editor produces:
 * root, paragraph, heading (h2–h4), text (bold/italic/underline/code),
 * link, list (ul/ol), listitem, horizontalrule, linebreak.
 *
 * Unknown node types fall through to rendering their children, so new
 * block types added in the admin won't break the frontend — they just
 * render as plain text.
 */

function renderTextNode(node) {
  let content = node.text || ''
  if (!content) return null

  // Lexical format bitmask: bold=1, italic=2, strikethrough=4, underline=8, code=16
  if (node.format & 16) content = <code className="font-mono text-sm bg-brand-surface px-1.5 py-0.5 rounded">{content}</code>
  if (node.format & 1)  content = <strong className="font-semibold text-brand-navy">{content}</strong>
  if (node.format & 2)  content = <em>{content}</em>
  if (node.format & 8)  content = <u>{content}</u>
  if (node.format & 4)  content = <s>{content}</s>

  return content
}

function renderNode(node, index) {
  if (!node) return null

  switch (node.type) {
    case 'text':
      return <span key={index}>{renderTextNode(node)}</span>

    case 'linebreak':
      return <br key={index} />

    case 'paragraph': {
      const children = node.children?.map(renderNode)
      // Empty paragraph → spacer
      if (!children?.some(c => c)) return <div key={index} className="h-2" />
      return <p key={index} className="text-brand-muted leading-relaxed">{children}</p>
    }

    case 'heading': {
      const Tag = node.tag || 'h2'
      const sizeMap = { h2: 'text-2xl', h3: 'text-xl', h4: 'text-lg' }
      return (
        <Tag key={index} className={`font-display font-semibold text-brand-navy ${sizeMap[Tag] || 'text-xl'} mt-6 mb-2`}>
          {node.children?.map(renderNode)}
        </Tag>
      )
    }

    case 'list': {
      const Tag = node.listType === 'number' ? 'ol' : 'ul'
      return (
        <Tag key={index} className={`pl-5 space-y-1 ${Tag === 'ol' ? 'list-decimal' : 'list-disc'}`}>
          {node.children?.map(renderNode)}
        </Tag>
      )
    }

    case 'listitem':
      return (
        <li key={index} className="text-brand-muted leading-relaxed">
          {node.children?.map(renderNode)}
        </li>
      )

    case 'link': {
      const href = node.fields?.url || node.url || '#'
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-gold underline underline-offset-2 hover:text-brand-navy transition-colors duration-200"
        >
          {node.children?.map(renderNode)}
        </a>
      )
    }

    case 'horizontalrule':
      return <hr key={index} className="border-brand-surface my-6" />

    case 'quote':
      return (
        <blockquote key={index} className="border-l-4 border-brand-gold pl-4 italic text-brand-muted my-4">
          {node.children?.map(renderNode)}
        </blockquote>
      )

    default:
      // Unknown node — render children to avoid blank spots
      return node.children?.length
        ? <span key={index}>{node.children.map(renderNode)}</span>
        : null
  }
}

export default function LexicalRenderer({ content }) {
  if (!content?.root?.children?.length) return null

  return (
    <div className="space-y-4 font-body text-base">
      {content.root.children.map(renderNode)}
    </div>
  )
}
