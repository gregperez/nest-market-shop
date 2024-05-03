export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: Function,
) => {
  // console.log({ file });
  if (!file) {
    return cb(new Error('No file provided'), false);
  }

  const { mimetype } = file;
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  const fileExtension = mimetype.split('/').pop();

  if (!allowedExtensions.includes(fileExtension)) {
    return cb(
      new Error(
        'Invalid file type. Only JPG, JPEG, PNG, and GIF files are allowed.',
      ),
      false,
    );
  }

  cb(null, true);
};
