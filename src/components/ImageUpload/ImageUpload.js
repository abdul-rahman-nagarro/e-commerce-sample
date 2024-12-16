import { useState } from "react"
import "./imageUpload.css"
import { uploadImagetoS3 } from "../../services/aws"
import { Button, Card, Col, Form, Row } from "react-bootstrap"

const ImageUpload = () => {
	const [imageFile, setImageFile] = useState()

	const handleImageSelect = (e) => {
		const file = e.target.files[0]
		setImageFile(file)
	}

	const handleUploadImage = () => {
		if (!imageFile) return

		uploadImagetoS3(imageFile, (progress) => {
			console.log("Progress", progress)
		}).then((data) => {
			console.log("Uploaded", data)
		})
	}

	// {/* <div className="text-light">
	// 	<div className="image-upload">
	// 		<label htmlFor="file-input">
	// 			<img
	// 				className="upload-icon"
	// 				src="https://img.icons8.com/ios/50/ffffff/upload.png"
	// 				alt="upload"
	// 			/>
	// 		</label>
	// 		<input
	// 			id="file-input"
	// 			type="file"
	// 			accept="image/*"
	// 			onChange={handleImageSelect}
	// 		/>
	// 		{imageFile && (
	// 			<button className="btn btn-secondary" onClick={handleUploadImage}>
	// 				Upload Image
	// 			</button>
	// 		)}
	// 	</div>
	// </div> */}
	return (
		<Row className="mb-4">
			<Col xs={12} className="d-flex flex-column align-items-center">
				<Card className="bg-dark text-white w-100">
					<Card.Body>
						<h3 className="text-center">Upload Image</h3>
						<Form>
							<Form.Group controlId="formFile" className="mb-3">
								<Form.Control
									// type="file"
									// accept="image/*"
									// // onChange={handleImageUpload}
									// style={{ backgroundColor: "#333" }}
									id="file-input"
									type="file"
									accept="image/*"
									onChange={handleImageSelect}
								/>
							</Form.Group>
							<div className="text-center">
								<Button variant="primary" onClick={handleUploadImage}>
									{/* <BsCloudUpload className="me-2" /> */}
									Upload
								</Button>
							</div>
						</Form>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}

export default ImageUpload
