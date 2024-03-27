import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const client = new S3Client({
  region: "us-west-2",
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: "us-west-2" },
    identityPoolId: "us-west-2:b450575f-266d-480b-b762-bb8df86ed983",
  }),
});

export const upload = async (file, name) => {
  const command = new PutObjectCommand({
    Bucket: "frog-test-1",
    Key: name,
    Body: file,
  });
  console.log(command);
  let res;
  try {
    res = await client.send(command);
    console.log(res);
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};
