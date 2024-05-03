import { v4 as uuid } from 'uuid';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: Function,
) => {
  // console.log({ file });
  if (!file) {
    return cb(new Error('No file provided'), false);
  }

  const fileExtension = file.mimetype.split('/').pop();
  const fileName = `${uuid()}.${fileExtension}`;

  cb(null, fileName);
};
