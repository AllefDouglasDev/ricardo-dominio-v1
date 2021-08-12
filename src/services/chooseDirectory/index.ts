import { send } from '../request';

export default {
  openChooseDirectory() {
    return send<string[]>('chooseDirectory:open', { cancelTimeout: true });
  },
};
