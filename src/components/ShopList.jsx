import { Row } from "react-bootstrap"
import { memo, useEffect, useMemo } from "react"
import ProductCard from "./ProductCard/ProductCard"
import { useSelector } from "react-redux"

const ShopList = ({ productItems }) => {
	const { cartList = [] } = useSelector((state) => state.cart)

	useEffect(() => {}, [productItems])

	const cartItemIdsMap = useMemo(() => {
		return cartList.reduce((acc, item) => {
			acc[item.id] = true
			return acc
		}, {})
	}, [cartList])

	if (productItems.length === 0) {
		return <h1 className="not-found">Product Not Found !!</h1>
	}

	return (
		<Row className="justify-content-center">
			{productItems.map((productItem) => {
				return (
					<ProductCard
						key={productItem.id}
						title={null}
						productItem={productItem}
						isInCart={productItem.id in cartItemIdsMap}
					/>
				)
			})}
		</Row>
	)
}
export default memo(ShopList)
