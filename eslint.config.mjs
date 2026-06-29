import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier'

/** ESLint flat config — Next 16 ships native flat-config arrays. */
const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'public/sw.js'] },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  prettier,
]

export default eslintConfig
