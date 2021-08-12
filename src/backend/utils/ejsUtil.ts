import ejs from 'ejs';
import path from 'path';

export async function renderEjs(
  fileDir: string,
  fileName: string,
  content: any
): Promise<string> {
  const filePath = path.join(__dirname, '../', 'templates', fileDir, fileName);

  return new Promise((resolve, reject) => {
    // @ts-ignore
    ejs.renderFile(filePath, content, async (err: Error, data: any) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
}
