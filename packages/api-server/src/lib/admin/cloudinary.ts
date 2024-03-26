import cloudinary from "src/cloudinary";

export const CloudinaryAdminAPI = {
  // receives uploaded pdf file list from /api/uploadResources
  async savePdfs(pdfList: Express.Multer.File[]) {
    const urlList: { previewUrl: string; pdfUrl: string }[] = [];

    for (const file of pdfList) {
      // for each pdf file, save file to cloudinary
      const cloudResponse = await cloudinary.uploader.upload(file.path);
      // retrieve pdf and preview urls
      const pdfUrl = cloudResponse.secure_url;
      const previewUrl = cloudinary.url(cloudResponse.public_id, {
        format: "png",
        transformation: { height: 220, width: 170 },
      });
      // add urls to the returned array
      urlList.push({ previewUrl, pdfUrl });
    }
    return urlList;
  },
};
