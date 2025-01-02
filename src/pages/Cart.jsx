import { useEffect, useMemo, useState } from "react"
import {
	Col,
	Container,
	Row,
	Form,
	Button,
	Modal,
	Spinner,
} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
	addToCart,
	decreaseQty,
	deleteProduct,
} from "../app/features/cart/cartSlice"
import { requestCouponCode, verifyCouponCode } from "../services/cartService"
import { toast } from "react-toastify"

const Cart = () => {
	const [couponPrice, setCouonPrice] = useState(0)
	const [showRequestCouponModal, setShowRequestCouponModal] = useState(false)
	const [couponCode, setCouponCode] = useState("")
	const [phone, setPhone] = useState("")
	const [isRequestingCoupon, setIsRequestingCoupon] = useState(false)
	const [isVerifyingCoupon, setIsVerifyingCoupon] = useState(false)

	const { cartList } = useSelector((state) => state.cart)
	const dispatch = useDispatch()

	// middlware to localStorage
	const totalPrice = useMemo(() => {
		let _total = cartList.reduce(
			(price, item) => price + item.qty * item.price,
			0
		)
		return _total - couponPrice
	}, [cartList, couponPrice])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const verifyCoupon = () => {
		if (!couponCode) {
			toast.error("Please enter coupon code")
			return
		}

		setIsVerifyingCoupon(true)
		verifyCouponCode(couponCode)
			.then((res) => {
				if (res.error) {
					toast.error("Error while verifying coupon")
					return
				}
				if (res.isValid) {
					setCouonPrice(res.discount)
					toast.success("Coupon code applied successfully")
					setCouponCode("")
				} else {
					toast.error("Invalid coupon code")
				}
			})
			.finally(() => {
				setIsVerifyingCoupon(false)
			})
	}

	const openRequestCouponModal = () => {
		// open modal to request coupon code
		setShowRequestCouponModal(true)
	}

	const hideRequestCouponModal = () => {
		setShowRequestCouponModal(false)
	}

	const requestCoupon = () => {
		setIsRequestingCoupon(true)
		requestCouponCode(`+91${phone}`)
			.then((res) => {
				if (res.error) {
					toast.error("Error while generating coupon")
					return
				}
				setPhone("")
				toast.success("Coupon code sent to the phone")
				hideRequestCouponModal()
			})
			.finally(() => {
				setIsRequestingCoupon(false)
			})
	}

	const handleCouponChange = (e) => {
		setCouponCode(e.target.value)
	}

	const handlePhoneChange = (e) => {
		setPhone(e.target.value)
	}

	return (
		<>
			<section className="cart-items">
				<Container className="text-light">
					<Row className="justify-content-center">
						<Col md={8}>
							{cartList.length === 0 && (
								<h1 className="no-items product">No Items are added in Cart</h1>
							)}
							{cartList.map((item) => {
								const productQty = item.price * item.qty
								return (
									<div className="cart-list" key={item.id}>
										<Row>
											<Col className="image-holder" sm={4} md={3}>
												<img src={item.imgUrl} alt="" />
											</Col>
											<Col sm={8} md={9}>
												<Row className="cart-content justify-content-center">
													<Col xs={12} sm={9} className="cart-details">
														<h3>{item.productName}</h3>
														<h4>
															${item.price}.00 * {item.qty}
															<span>${productQty}.00</span>
														</h4>
													</Col>
													<Col xs={12} sm={3} className="cartControl">
														<button
															className="incCart"
															onClick={() =>
																dispatch(addToCart({ product: item, num: 1 }))
															}
														>
															<i className="fa-solid fa-plus"></i>
														</button>
														<button
															className="desCart"
															onClick={() => dispatch(decreaseQty(item))}
														>
															<i className="fa-solid fa-minus"></i>
														</button>
													</Col>
												</Row>
											</Col>
											<button
												className="delete"
												onClick={() => dispatch(deleteProduct(item))}
											>
												<ion-icon
													name="close"
													style={{ color: "#88252d" }}
												></ion-icon>
											</button>
										</Row>
									</div>
								)
							})}
						</Col>
						<Col md={4}>
							<div className="cart-total">
								<Form.Group className="mb-3">
									<Form.Label>Coupon Code :</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter Coupon Code"
										value={couponCode}
										onChange={handleCouponChange}
									/>
									<Row className="mt-2 gap-1">
										<Col>
											<Button
												size="sm"
												className="w-100"
												onClick={verifyCoupon}
											>
												Apply
												{isVerifyingCoupon && (
													<Spinner
														style={{ marginLeft: 8 }}
														size="sm"
														animation="border"
													/>
												)}
											</Button>
										</Col>
										<Col>
											<Button
												size="sm"
												className="w-100 bg-black border-black"
												onClick={openRequestCouponModal}
											>
												Request Coupon
											</Button>
										</Col>
									</Row>
								</Form.Group>
								<h2>Cart Summary</h2>
								<div className=" d_flex">
									<Row>
										<Col xs={6}>
											<h4>Cart total :</h4>
										</Col>
										<Col xs={6}>
											<h4 className="text-end">
												{totalPrice + couponPrice}.00
											</h4>
										</Col>
									</Row>
									<Row>
										<Col xs={6}>
											<h4>Discount :</h4>
										</Col>
										<Col xs={6}>
											<h4 className="text-end">{couponPrice}.00</h4>
										</Col>
									</Row>
									<Row>
										<Col xs={6}>
											<h5>Total Price :</h5>
										</Col>
										<Col xs={6}>
											<h3 className="text-end">${totalPrice}.00</h3>
										</Col>
									</Row>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
			<Modal show={showRequestCouponModal} onHide={hideRequestCouponModal}>
				<Modal.Header closeButton>
					<Modal.Title>Request Coupon</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3">
						<Form.Label>Phone Number</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter Phone"
							value={phone}
							onChange={handlePhoneChange}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={hideRequestCouponModal}>
						Close
					</Button>
					<Button variant="primary" onClick={requestCoupon}>
						Request
						{isRequestingCoupon && (
							<Spinner style={{ marginLeft: 8 }} size="sm" animation="border" />
						)}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default Cart
