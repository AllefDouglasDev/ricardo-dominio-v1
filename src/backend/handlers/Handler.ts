import { ipcMain } from 'electron';

export default abstract class Handler {
  constructor(protected root: string) {}

  on(eventName: string, func: any): void {
    const normalizedEventName = `${this.root}:${eventName}`;

    ipcMain.on(normalizedEventName, async (event, args) => {
      try {
        const result = await func(args);
        event.reply(normalizedEventName, { success: true, data: result });
      } catch (error) {
        event.reply(normalizedEventName, { success: false, error });
      }
    });
  }
}
