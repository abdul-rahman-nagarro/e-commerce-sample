import { RotateLoader } from "react-spinners"
import "./loader.css"
const Loader = ({ zIndex = 10000 }) => {
	return (
		<div className="loader" style={{ zIndex: zIndex }}>
			<RotateLoader
				color="#0f3460"
				size={20}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	)
}

export default Loader
