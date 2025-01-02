import React, { useEffect, useState } from "react"
import {
	Container,
	Row,
	Col,
	Card,
	Modal,
	Button,
	Image,
} from "react-bootstrap"
import { RotateLoader } from "react-spinners"
import ImageUpload from "../components/ImageUpload/ImageUpload"
import { getAllS3Images } from "../services/aws"

const Images = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [images, setImages] = useState([])
	const [previewImage, setPreviewImage] = useState(false)
	const [previewImageURL, setPreviewImageURL] = useState("")

	const fetchImages = () => {
		getAllS3Images().then((data) => {
			setImages(data)
			setIsLoading(false)
		})
	}

	useEffect(() => {
		fetchImages()
	}, [])

	const handleImageClick = (imageURL) => () => {
		setPreviewImageURL(imageURL)
		setPreviewImage(true)
	}

	const closePreview = () => {
		setPreviewImage(false)
	}

	// Handle file input change
	//   const handleFileInputChange = (e) => {
	//     const file = e.target.files[0];
	//     if (file) {
	//       const newImage = URL.createObjectURL(file);
	//       setImagePreview(newImage);
	//     }
	//   };

	return (
		<>
			<Container className="mt-4" style={{ color: "white" }}>
				{/* Upload section */}
				<ImageUpload onUploadDone={fetchImages} />
				{/* Loader */}
				{isLoading && (
					<div className="d-flex justify-content-center m-5">
						<RotateLoader
							color="white"
							size={20}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
					</div>
				)}
				{/* Grid of images */}
				<Row style={{ alignItems: "center" }}>
					{images.length === 0 ? (
						<Col className="text-center">
							<p>No images uploaded yet.</p>
						</Col>
					) : (
						images.map((img, index) => (
							<Col
								style={{ cursor: "pointer" }}
								key={index}
								xs={6}
								md={4}
								lg={3}
								className="mb-4 d-flex"
							>
								<Card className="bg-dark text-white d-flex">
									<Image
										onClick={handleImageClick(img)}
										variant="center"
										src={img}
										fluid rounded
									/>
								</Card>
							</Col>
						))
					)}
				</Row>
				{/* Modal with Image Preview */}
			</Container>
			<Modal show={previewImage} animation onHide={closePreview} centered>
				<Modal.Body>
					<div className="d-flex justify-content-center">
						{previewImageURL && <Image src={previewImageURL} fluid rounded />}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closePreview}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default Images
