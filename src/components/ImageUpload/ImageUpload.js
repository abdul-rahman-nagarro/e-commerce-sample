import { useRef, useState } from "react"
import "./imageUpload.css"
import { uploadImagetoS3 } from "../../services/aws"
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap"

const ImageUpload = ({ onUploadDone }) => {
	const [imageFile, setImageFile] = useState()
	const [isUploading, setIsUploading] = useState(false)

	const imageInputRef = useRef()

	const handleImageSelect = (e) => {
		const file = e.target.files[0]
		setImageFile(file)
	}

	const handleUploadImage = () => {
		if (!imageFile) return
		setIsUploading(true)
		uploadImagetoS3(imageFile, (progress) => {
			console.log("Progress", progress)
		})
			.then((data) => {
				onUploadDone(data)
				setImageFile(null)
				imageInputRef.current.value = ""
			})
			.finally(() => {
				setIsUploading(false)
			})
	}

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
									ref={imageInputRef}
									type="file"
									accept="image/*"
									onChange={handleImageSelect}
								/>
							</Form.Group>
							<div className="text-center">
								<Button className="" variant="primary" onClick={handleUploadImage}>
									{/* <BsCloudUpload className="me-2" /> */}
									Upload
									{isUploading && <Spinner className="mx-2" animation="border" size="sm" />}
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
