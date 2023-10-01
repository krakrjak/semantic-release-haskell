// Plugin options
export interface PluginConfig {
  hpack: boolean;
  hpackFile?: 'package.yaml' | string;
  cabal: boolean;
  cabalFile?: string;
}
