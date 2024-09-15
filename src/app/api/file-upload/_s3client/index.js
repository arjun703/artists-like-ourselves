import { S3 } from "@aws-sdk/client-s3";

const s3Client = new S3({
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    }
})

export { s3Client };