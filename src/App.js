import { lazy, Suspense, useLayoutEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import Loader from "./components/Loader/Loader"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const Home = lazy(() => import("./pages/Home"))
const Shop = lazy(() => import("./pages/Shop"))
const Cart = lazy(() => import("./pages/Cart"))
const Product = lazy(() => import("./pages/Product"))
const Images = lazy(() => import("./pages/Images"))
function App() {
	useLayoutEffect(() => {
		const htmlElement = document.querySelector("html")
		htmlElement.setAttribute("data-bs-theme", "dark")
	}, [])

	return (
		<div className="App theme-dark">
			<Suspense fallback={<Loader />}>
				<Router>
					<ToastContainer
						position="top-right"
						autoClose={1000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="dark"
					/>
					<NavBar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/shop" element={<Shop />} />
						<Route path="/shop/:id" element={<Product />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/images" element={<Images />} />
					</Routes>
					<Footer />
				</Router>
			</Suspense>
		</div>
	)
}

export default App
