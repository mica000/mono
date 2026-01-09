import type { ComponentType } from 'react';

export interface ConfettiConfig {
  [key: string]: unknown;
}

export interface ConfettiProps {
  active: boolean;
  config?: ConfettiConfig;
}

declare const Confetti: ComponentType<ConfettiProps>;
export default Confetti;

