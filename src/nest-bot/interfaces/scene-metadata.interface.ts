import { SceneOptions } from '../../middleware-scene/base';

export interface SceneMetadata {
  sceneId: string;
  type: 'base' | 'wizard';
  options?: SceneOptions<any>;
}

export interface WizardStepMetadata {
  step: number;
}
