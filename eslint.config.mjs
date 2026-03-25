import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier'
import reactCompiler from 'eslint-plugin-react-compiler'
import reactPlugin from 'eslint-plugin-react'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // 显式指定检查范围，确保 Compiler 插件扫描组件文件
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-compiler': reactCompiler,
      react: reactPlugin,
    },
    rules: {
      // 开启 Compiler 检查
      'react-compiler/react-compiler': 'error',
      // 禁止 console.log（只允许 warn/error），防止调试代码进入生产
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // 未使用变量报错，但 _ 开头的参数豁免（常见于占位参数）
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // 强制写 import type { Foo }，减少运行时 bundle 体积
      '@typescript-eslint/consistent-type-imports': 'error',
      // 配置 JSX 属性排序
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true, // 回调函数（onXxx）放在最后
          shorthandFirst: true, // 布尔简写（如 disabled）放在最前
          multiline: 'ignore', // 多行属性不特殊处理
          ignoreCase: true, // 忽略大小写排序
          noSortAlphabetically: false, // 依然保持字母表顺序
          reservedFirst: true, // React 保留属性（key, ref）放在最前
        },
      ],
    },
  },
  // 覆盖前面规则集里与 Prettier 格式冲突的规则
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
