import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: import.meta.env.VITE_AWS_REGION },
    identityPoolId: import.meta.env.VITE_AWS_ID_POOL,
  }),
});

export const upload = async (file, name) => {
  const command = new PutObjectCommand({
    Bucket: import.meta.env.VITE_AWS_S3_BUCKET,
    Key: name,
    Body: file,
  });
  let res;
  try {
    res = await client.send(command);
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};
