import { type BuildOptions } from './types/config';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

export function buildDevserver ({ port }: BuildOptions): DevServerConfiguration {
  return {
    port,
    open: true,
    historyApiFallback: true
  };
}
