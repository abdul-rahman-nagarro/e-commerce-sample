// import { Container } from "react-bootstrap"

// const Images = () => {
//    return (
//       <Container>

//       </Container>
//    )
// }

// export default Images

import React, { useEffect, useState } from "react"
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap"
import ImageUpload from "../components/ImageUpload/ImageUpload"
import { getAllS3Images } from "../services/aws"
// import { BsCloudUpload } from 'react-icons/bs';

const Image = () => {
	const [images, setImages] = useState([])
	const [previewImage, setPreviewImage] = useState(false)
	const [previewImageURL, setPreviewImageURL] = useState("")

	useEffect(() => {
		getAllS3Images().then((data) => {
			setImages(data)
		})
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
		<Container className="mt-4" style={{ color: "white" }}>
			{/* Upload section */}
			<ImageUpload />
			{/* <Row className="mb-4">
        <Col xs={12} md={6} className="d-flex flex-column align-items-center">
          <Card className="bg-dark text-white w-100">
            <Card.Body>
              <h3 className="text-center">Upload Image</h3>
              <Form>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ backgroundColor: '#333' }}
                  />
                </Form.Group>
                <div className="text-center">
                  <Button
                    variant="primary"
                    onClick={() => document.getElementById('formFile').click()}
                  >
                    <BsCloudUpload className="me-2" />
                    Upload
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}

			{/* Grid of images */}
			<Row style={{ alignItems: "center" }}>
				{images.length === 0 ? (
					<Col className="text-center">
						<p>No images uploaded yet.</p>
					</Col>
				) : (
					images.map((img, index) => (
						<Col key={index} xs={6} md={4} lg={3} className="mb-4 d-flex">
							<Card className="bg-dark text-white d-flex">
								<Card.Img
									onClick={handleImageClick(img)}
									variant="center"
									src={img}
								/>
							</Card>
						</Col>
					))
				)}
			</Row>
			{/* Modal with Image Preview */}
			<Modal show={previewImage} animation onHide={closePreview} centered>
				{/* <Modal.Header closeButton>
					<Modal.Title>Image Preview</Modal.Title>
				</Modal.Header> */}
				<Modal.Body>
					<div className="d-flex justify-content-center">
						{previewImageURL && <Image src={previewImageURL} fluid rounded />}
					</div>
				</Modal.Body>
				{/* <Modal.Footer>
					<Button variant="secondary" onClick={closePreview}>
						Close
					</Button>
				</Modal.Footer> */}
			</Modal>
		</Container>
	)
}

export default Image
