// App theme colors
export const appBg = "#222324";
export const appBg2 = "#2f2f2f";
export const appBg3 = "#343434";

// App env variables
export const AWS_ACCESS_KEY_ID = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECTRET_ACCESS_KEY;
export const AWS_S3_BUCKET_NAME = process.env.REACT_APP_AWS_S3_BUCKET_NAME;
export const AWS_S3_BUCKET_REGION = process.env.REACT_APP_AWS_S3_BUCKET_REGION;
export const API_URL = process.env.REACT_APP_API_URL;

console.log("ENV Variables", {
   AWS_ACCESS_KEY_ID: AWS_ACCESS_KEY_ID,
   AWS_SECRET_ACCESS_KEY: AWS_SECRET_ACCESS_KEY,
   AWS_S3_BUCKET_NAME: AWS_S3_BUCKET_NAME,
   AWS_S3_BUCKET_REGION: AWS_S3_BUCKET_REGION,
   API_URL: API_URL,
})