/* eslint-disable import/prefer-default-export */
import { ipcRenderer } from 'electron';

interface RequestOptions {
  data?: any;
  cancelTimeout?: boolean;
}

const TIMEOUT = 30000;

export function send<T = any>(
  to: string,
  options?: RequestOptions
): Promise<T> {
  return new Promise((resolve, reject) => {
    let timeoutId: any = null;
    if (!options?.cancelTimeout) {
      timeoutId = setTimeout(() => {
        reject(new Error('Timeout'));
      }, TIMEOUT);
    }

    ipcRenderer.send(to, options?.data);

    ipcRenderer.on(to, (_, response) => {
      if (response.success) {
        resolve(response.data);
      } else {
        reject(response.error || new Error('Unknown error'));
      }

      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    });
  });
}
