import { useEffect } from 'react';
import { initRubikScenes } from '../initRubikScenes';

export function useRubikInit() {
  useEffect(() => {
    initRubikScenes();
  }, []);
}
