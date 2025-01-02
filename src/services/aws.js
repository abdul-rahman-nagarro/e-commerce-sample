import {
	S3Client as AWS_S3Client,
	ListObjectsCommand,
	PutObjectCommand,
} from "@aws-sdk/client-s3"
import {
	AWS_ACCESS_KEY_ID,
	AWS_S3_BUCKET_NAME,
	AWS_S3_BUCKET_REGION,
	AWS_SECRET_ACCESS_KEY,
} from "../constants"

const S3_BUCKET = AWS_S3_BUCKET_NAME
const REGION = AWS_S3_BUCKET_REGION

const awsAccessCredentials = {
	accessKeyId: AWS_ACCESS_KEY_ID,
	secretAccessKey: AWS_SECRET_ACCESS_KEY,
}

const S3Client = new AWS_S3Client({
	region: REGION,
	credentials: awsAccessCredentials,
})

export const uploadImagetoS3 = async (file, progressCb) => {
	if (!file) return

	const params = {
		ACL: "public-read",
		Body: file,
		Key: file.name,
		Bucket: S3_BUCKET,
	}

	const putObjectCmd = new PutObjectCommand(params)
	const data = await await S3Client.send(putObjectCmd)
	// .on("httpUploadProgress", (_data) => {
	// 	console.log("S3 upload progress", _data)
	// 	const progress = Math.round((_data.loaded / _data.total) * 100)
	// 	progressCb(progress)
	// })
	const fileName = encodeURIComponent(file.name)
	console.log(
		"S3 uploaded response",
		data,
		`https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`
	)
	return `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`
}

export const getAllS3Images = async () => {
	try {
		const params = {
			Bucket: S3_BUCKET,
		}
		const listObjectsCmd = new ListObjectsCommand(params)
		const data = await S3Client.send(listObjectsCmd)
		console.log("S3 list objects", data)
		return data.Contents?.map(
			(item) => `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${item.Key}`
		) || []
	} catch (error) {
		console.error("S3 list objects error", error)
		return []
	}
}
