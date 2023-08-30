const NextFederationPlugin = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack(config, options) {
    const { isServer } = options;
    let rule = {
      test: /critical\.module\.scss$/i,
      use: [
          'isomorphic-style-loader',
          {
              loader: 'css-loader',
              options: {
                  importLoaders: 1,
                  esModule: false,
              }
          },
          'sass-loader',
          'postcss-loader'
      ]
  }
  const mainModule = config.module.rules.find(rule => rule.oneOf?.length > 0)
  if(mainModule) {
    mainModule.oneOf.unshift(rule)
  }
    // config.module.rules.unshift()
  console.log('config.module.rules', config.module.rules)
    config.plugins.push(
      new NextFederationPlugin({
        name: 'next2',
        remotes: {
          SHELL: `SHELL@http://localhost:3000/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
        },
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Test': './components/Test',
          // './checkout': './pages/checkout',
        },
        shared: {
          // whatever else
        },
      })
    );

    return config;
  },
}

module.exports = nextConfig
