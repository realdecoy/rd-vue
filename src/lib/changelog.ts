import { ChangeLog } from '../modules';

export enum ChangelogMetaDataTypes {
  MIGRATION = 'migration',
  UPDATE = 'update',
  PATCH = 'patch',
}

export enum ChangelogConfigTypes {
  META_DATA = 'metaData',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

export const CHANGE_LOG: ChangeLog = {
  [ChangelogConfigTypes.META_DATA]: {
    version: '',
    type: ChangelogMetaDataTypes.MIGRATION,
  },
  [ChangelogConfigTypes.CREATE]: {
    resources: [
      {
        name: 'index.ts',
        file: {
          source: 'index.ts',
          target: 'index.ts',
        },
        destPath: 'scripts/config',
        srcPath: 'scripts/config',
        type: 'file',
      },
      {
        name: '.env',
        file: {
          source: '.env',
          target: '.env',
        },
        destPath: 'config',
        srcPath: 'config',
        type: 'file',
      },
      {
        name: '.env.example',
        file: {
          source: '.env.example',
          target: '.env.example',
        },
        destPath: 'config',
        srcPath: 'config',
        type: 'file',
      },
      {
        name: 'media-loader.ts',
        file: {
          source: 'media-loader.ts',
          target: 'media-loader.ts',
        },
        destPath: 'scripts/config',
        srcPath: 'scripts/config',
        type: 'file',
      },
      {
        name: 'sass-loader.ts',
        file: {
          source: 'sass-loader.ts',
          target: 'sass-loader.ts',
        },
        destPath: 'scripts/config',
        srcPath: 'scripts/config',
        type: 'file',
      },
      {
        name: 'ts-loader.ts',
        file: {
          source: 'ts-loader.ts',
          target: 'ts-loader.ts',
        },
        destPath: 'scripts/config',
        srcPath: 'scripts/config',
        type: 'file',
      },
      {
        name: 'vue-loader.ts',
        file: {
          source: 'vue-loader.ts',
          target: 'vue-loader.ts',
        },
        destPath: 'scripts/config',
        srcPath: 'scripts/config',
        type: 'file',
      },
      {
        name: 'font-loader.ts',
        file: {
          source: 'font-loader.ts',
          target: 'font-loader.ts',
        },
        destPath: 'scripts/config',
        srcPath: 'scripts/config',
        type: 'file',
      },
      {
        name: 'webpack.config.js',
        file: {
          source: 'webpack.config.ts',
          target: 'webpack.config.ts',
        },
        destPath: '',
        srcPath: '',
        type: 'file',
      },
    ],
  },
  [ChangelogConfigTypes.UPDATE]: {
    resources: [
      {
        name: 'package.json',
        destPath: 'package.json',
        type: 'file',
        contents: [
          {
            key: 'scripts.audit',
            value: 'npm audit --prod',
            operation: 'add',
          },
          {
            key: 'scripts.postinstall',
            value: 'run-s upgrade-rdvue',
            operation: 'remove',
          },
          {
            key: 'scripts.serve',
            value: 'vue-cli-service serve',
            operation: 'remove',
          },
          {
            key: 'scripts.serve-static',
            value: 'cd dist && ws --spa index.html -z',
            operation: 'remove',
          },
          {
            key: 'scripts.build',
            value: 'vue-cli-service build',
            operation: 'remove',
          },
          {
            key: 'scripts.launch-ds',
            value:
              'cd node_modules/design-system && npm install && npm run serve:rdvue -- --port',
            operation: 'add',
          },
          {
            key: 'scripts.preinstall',
            value: 'run-s upgrade-rdvue',
            operation: 'add',
          },
          {
            key: 'scripts.serve',
            value: 'cross-env NODE_ENV=development webpack serve',
            operation: 'add',
          },
          {
            key: 'scripts.build',
            value: 'cross-env NODE_ENV=development webpack build',
            operation: 'add',
          },
          {
            key: 'scripts.serve:build',
            value: 'cd dist && ws --https --spa index.html -z -p 9000',
            operation: 'add',
          },
          {
            key: 'scripts.serve:docker',
            value:
              'docker run -it -p 8080:8080 -v $(pwd):/app -w /app --rm node bash -c "npm run serve"',
            operation: 'add',
          },
          {
            key: 'scripts.serve:ds',
            value: 'run-s setup-ds-webpack launch-design-system',
            operation: 'add',
          },
          {
            key: 'scripts.test:unit',
            value: 'echo "Error: no unit test specified" && exit 1',
            operation: 'remove',
          },
          {
            key: 'launch-design-system',
            value:
              'cd node_modules/design-system && npm install && npm run serve:rdvue -- --port 9000',
            operation: 'remove',
          },
          {
            key: 'serve:design-system',
            value: 'run-s setup-ds-webpack launch-design-system',
            operation: 'remove',
          },
          {
            key: 'test:unit',
            value: 'echo "Error: no unit test specified" && exit 1',
            operation: 'add',
          },
          {
            key: 'dependencies.favicons',
            value: '^6.2.0',
            operation: 'remove',
          },
          {
            key: 'dependencies.js-beautify',
            value: '^1.13.0',
            operation: 'remove',
          },
          {
            key: 'dependencies.log-symbols',
            value: '^4.0.0',
            operation: 'remove',
          },
          {
            key: 'dependencies.register-service-worker',
            value: '^1.5.2',
            operation: 'remove',
          },
          {
            key: 'dependencies.ws',
            value: '^7.4.5',
            operation: 'remove',
          },
          {
            key: 'dependencies.webpack',
            value: '^5.71.0',
            operation: 'add',
          },
          {
            key: 'devDependencies.@babel/register',
            value: '^7.16.9',
            operation: 'add',
          },
          {
            key: 'devDependencies.@types/copy-webpack-plugin',
            value: '^8.0.1',
            operation: 'add',
          },
          {
            key: 'devDependencies.@types/dotenv-webpack',
            value: '^7.0.2',
            operation: 'add',
          },
          {
            key: 'devDependencies.@types/favicons',
            value: '^5.5.0',
            operation: 'add',
          },
          {
            key: 'devDependencies.@types/marked',
            value: '^2.0.3',
            operation: 'add',
          },
          {
            key: 'devDependencies.@types/mini-css-extract-plugin',
            value: '^1.4.3',
            operation: 'add',
          },
          {
            key: 'devDependencies.@types/mocha',
            value: '^5.2.7',
            operation: 'add',
          },
          {
            key: 'devDependencies.@vue/cli-plugin-babel',
            value: '^3.4.0',
            operation: 'remove',
          },
          {
            key: 'devDependencies.@vue/cli-plugin-typescript',
            value: '^3.4.0',
            operation: 'remove',
          },
          {
            key: 'devDependencies.@vue/cli-service',
            value: '^4.3.1',
            operation: 'remove',
          },
          {
            key: 'devDependencies.@types/pretty',
            value: '^2.0.0',
            operation: 'add',
          },
          {
            key: 'devDependencies.@types/speed-measure-webpack-plugin',
            value: '^1.3.4',
            operation: 'add',
          },
          {
            key: 'devDependencies.@types/tailwindcss',
            value: '^3.0.2',
            operation: 'add',
          },
          {
            key: 'devDependencies.@types/webpack-dev-server',
            value: '^3.11.4',
            operation: 'add',
          },
          {
            key: 'devDependencies.@types/webpack-env',
            value: '^1.16.0',
            operation: 'add',
          },
          {
            key: 'devDependencies.clean-webpack-plugin',
            value: '^4.0.0',
            operation: 'add',
          },
          {
            key: 'devDependencies.copy-webpack-plugin',
            value: '^10.2.0',
            operation: 'add',
          },
          {
            key: 'devDependencies.cross-env',
            value: '^7.0.3',
            operation: 'add',
          },
          {
            key: 'devDependencies.css-loader',
            value: '^5.2.6',
            operation: 'add',
          },
          {
            key: 'devDependencies.dotenv-webpack',
            value: '^7.1.0',
            operation: 'add',
          },
          {
            key: 'devDependencies.esbuild-loader',
            value: '^2.18.0',
            operation: 'add',
          },
          {
            key: 'devDependencies.favicons',
            value: '^6.2.0',
            operation: 'add',
          },
          { key: 'devDependencies.glob', value: '^7.2.0', operation: 'add' },
          {
            key: 'devDependencies.html-webpack-plugin',
            value: '^5.5.0',
            operation: 'add',
          },
          {
            key: 'devDependencies.js-beautify',
            value: '^1.13.0',
            operation: 'add',
          },
          {
            key: 'devDependencies.local-web-server',
            value: '^5.1.1',
            operation: 'add',
          },
          {
            key: 'devDependencies.log-symbols',
            value: '^4.0.0',
            operation: 'add',
          },
          {
            key: 'devDependencies.mini-css-extract-plugin',
            value: '^2.5.2',
            operation: 'add',
          },
          { key: 'devDependencies.postcss', value: '^8.4.5', operation: 'add' },
          {
            key: 'devDependencies.postcss-loader',
            value: '^4.0.3',
            operation: 'add',
          },
          {
            key: 'devDependencies.register-service-worker',
            value: '^1.5.2',
            operation: 'add',
          },
          { key: 'devDependencies.sass', value: '^1.45.1', operation: 'add' },
          {
            key: 'devDependencies.sass-loader',
            value: '^10.2.1',
            operation: 'add',
          },
          {
            key: 'devDependencies.speed-measure-webpack-plugin',
            value: '^1.5.0',
            operation: 'add',
          },
          {
            key: 'devDependencies.ts-node',
            value: '^10.7.0',
            operation: 'add',
          },
          {
            key: 'devDependencies.typescript-node',
            value: '^0.1.3',
            operation: 'add',
          },
          {
            key: 'devDependencies.typescript-require',
            value: '^0.3.0',
            operation: 'add',
          },
          {
            key: 'devDependencies.vue-loader',
            value: '^15.9.8',
            operation: 'add',
          },
          {
            key: 'devDependencies.webpack-bundle-analyzer',
            value: '^3.7.0',
            operation: 'add',
          },
          {
            key: 'devDependencies.webpack-cli',
            value: '^4.9.2',
            operation: 'add',
          },
          {
            key: 'devDependencies.webpack-dev-server',
            value: '^3.11.3',
            operation: 'add',
          },
          {
            key: 'devDependencies.webpackbar',
            value: '^5.0.2',
            operation: 'add',
          },
          { key: 'devDependencies.ws', value: '^7.5.6', operation: 'add' },
          {
            key: 'devDependencies.node-sass',
            value: '^4.9.0',
            operation: 'remove',
          },
          {
            key: 'devDependencies.sass-loader',
            value: '^7.1.0',
            operation: 'remove',
          },
          {
            key: 'devDependencies.webpack-bundle-analyzer',
            value: '^3.7.0',
            operation: 'remove',
          },
        ],
      },
      {
        name: ' main.ts',
        destPath: 'src/main.ts',
        type: 'file',
      },
      {
        name: 'tsconfig.json',
        destPath: 'tsconfig.json',
        type: 'file',
      },
      {
        name: 'postcss.config.js',
        destPath: 'postcss.config.js',
        type: 'file',
      },
      {
        name: 'tailwind.config.js',
        destPath: 'tailwind.config.js',
        type: 'file',
      },
      {
        name: 'pages/hello-world',
        destPath: 'src/pages/hello-world',
        type: 'file',
      },
      {
        name: 'README',
        destPath: 'README.md',
        type: 'file',
      },
    ],
  },
  [ChangelogConfigTypes.DELETE]: {
    resources: [
      {
        name: 'vue.config.js',
        destPath: '',
        type: 'file',
      },
      {
        name: '.package-lock.json',
        destPath: '',
        type: 'file',
      },
    ],
  },
};