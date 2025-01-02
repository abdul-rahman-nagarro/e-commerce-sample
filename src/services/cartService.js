import { API_URL } from "../constants"

const API_ENDPOINTS = {
   requestCoupon: `${API_URL}/cart/generate-coupon`,
   verifyCoupon: `${API_URL}/cart/verify-coupon`,
}

export const requestCouponCode = async (phone) => {
   try {
      const result = await fetch(API_ENDPOINTS.requestCoupon, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ phone }),
      })
      if(result.ok) {
         return result.json()
      }
   } catch (error) {
      console.log("Error while generating coupon", error)
      return { error: true, message: "Error generating coupon", errorObj: error }
   }
}

export const verifyCouponCode = async (couponCode) => {
   try {
      const result = await fetch(API_ENDPOINTS.verifyCoupon, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ couponCode }),
      })
      if(result.ok) {
         return result.json()
      }
   } catch (error) {
      console.log("Error while verifying coupon", error)
      return { error: true, message: "Error verifying coupon", errorObj: error }
   }
}