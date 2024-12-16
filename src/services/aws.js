import AWS from "aws-sdk"
import {
	AWS_ACCESS_KEY_ID,
	AWS_S3_BUCKET_NAME,
	AWS_S3_BUCKET_REGION,
	AWS_SECRET_ACCESS_KEY,
} from "../constants"

const S3_BUCKET = AWS_S3_BUCKET_NAME
const REGION = AWS_S3_BUCKET_REGION

AWS.config.update({
	accessKeyId: AWS_ACCESS_KEY_ID,
	secretAccessKey: AWS_SECRET_ACCESS_KEY,
})

const imageBucket = new AWS.S3({
	params: { S3_BUCKET: S3_BUCKET },
	region: REGION,
})

export const uploadImagetoS3 = async (file, progressCb) => {
	if (!file) return

	const params = {
		ACL: "public-read",
		Body: file,
		Key: file.name,
		Bucket: S3_BUCKET,
	}

	const data = await imageBucket
		.putObject(params)
		.on("httpUploadProgress", (_data) => {
			console.log("S3 upload progress", _data)
			const progress = Math.round((_data.loaded / _data.total) * 100)
			progressCb(progress)
		})
		.promise()
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

		const data = await imageBucket.listObjects(params).promise()
		console.log("S3 list objects", data)
		return data.Contents?.map(
			(item) => `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${item.Key}`
		)
	} catch (error) {
		console.error("S3 list objects error", error)
		return []
	}
}
