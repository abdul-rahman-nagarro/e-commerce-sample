import { Col } from "react-bootstrap"
import "./product-card.css"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { addToCart, deleteProduct } from "../../app/features/cart/cartSlice"

const ProductCard = ({ title, productItem, isInCart = false }) => {
	const dispatch = useDispatch()
	const router = useNavigate()
	const handelClick = () => {
		router(`/shop/${productItem.id}`)
	}
	const handelAdd = (productItem) => () => {
		if (isInCart) {
			dispatch(deleteProduct(productItem))
			toast.success("Product has been removed from cart!")
		} else {
			dispatch(addToCart({ product: productItem, num: 1 }))
			toast.success("Product has been added to cart!")
		}
	}
	return (
		<Col md={3} sm={5} xs={10} className="product mtop">
			{title === "Big Discount" ? (
				<span className="discount">{productItem.discount}% Off</span>
			) : null}
			<img
				loading="lazy"
				onClick={() => handelClick()}
				src={productItem.imgUrl}
				alt=""
			/>
			<div className="product-like">
				<ion-icon name="heart-outline"></ion-icon>
			</div>
			<div className="product-details">
				<h3 onClick={() => handelClick()}>{productItem.productName}</h3>
				<div className="rate">
					<i className="fa fa-star"></i>
					<i className="fa fa-star"></i>
					<i className="fa fa-star"></i>
					<i className="fa fa-star"></i>
					<i className="fa fa-star"></i>
				</div>
				<div className="price">
					<h4>${productItem.price}</h4>
					<button
						aria-label="Add"
						type="submit"
						className={`action ${isInCart ? "remove" : ""}`}
						onClick={handelAdd(productItem)}
					>
						<ion-icon
							className={isInCart ? "remove" : "add"}
							name={isInCart ? "remove-outline" : "add"}
						></ion-icon>
					</button>
				</div>
			</div>
		</Col>
	)
}

export default ProductCard
