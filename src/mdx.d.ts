declare module '*.mdx' {
  import type { ComponentType } from 'react'

  const MDXComponent: ComponentType
  export default MDXComponent

  // Named exports from MDX files
  export const meta: Record<string, unknown>
  export const frontmatter: Record<string, unknown>
}
