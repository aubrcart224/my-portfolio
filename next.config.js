const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

//module.exports = withMDX({
  //pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Other Next.js config options
//})