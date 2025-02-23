import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = async () => ({ id: "fakeId" }); 

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "64MB", maxFileCount: 10},
    video: {maxFileSize: "64MB", maxFileCount: 10},
    pdf: {maxFileSize: "64MB", maxFileCount: 10},
  })
    .middleware(async () => {
      const user = await auth();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.ufsUrl);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
