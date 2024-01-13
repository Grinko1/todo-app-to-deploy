import type webpack from 'webpack';
import { type BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders (options: BuildOptions): webpack.RuleSetRule[] {
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/
  };
  const cssLoader = buildCssLoader(options.isDev);
  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ['@svgr/webpack']
  };
  const fileLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader'
      }
    ]
  };
  const babelLoader = buildBabelLoader(options.isDev);

  return [fileLoader, svgLoader, babelLoader, typescriptLoader, cssLoader];
}
