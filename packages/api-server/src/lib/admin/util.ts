export const validateUploadedDisplayNames = (
  uploadedNames: string | string[]
) => {
  if (typeof uploadedNames === "string") {
    return [uploadedNames];
  } else {
    return uploadedNames;
  }
};
