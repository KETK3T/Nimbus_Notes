import React from "react"
import { useNavigate,Link } from "react-router-dom"

const SignUp = () =>{
	return(
		<div className="signup">
			<div className="signup-container">
				<h2>Sign Up</h2>
				<form>
					<div>
						<label className="signup-label">
							Name:
						</label>
						<input className="signup-input"/>
					</div>
				</form>
			</div>
		</div>
	)
}

export default SignUp
