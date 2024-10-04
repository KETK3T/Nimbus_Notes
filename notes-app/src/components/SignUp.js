import React, { useState } from "react"
import { useNavigate,Link } from "react-router-dom"

const SignUp = () =>{

	const [formData, setFormData] = useState({
		username:'',
		email:''
	})

	const navigate = useNavigate()

	const handleChange = (event) => {
		const {name, value} = event.target
		setFormData({
			...formData,
			[name]: value
		})
	}

	const handleSubmit = (event) =>{
		// prevent refresh
		event.preventDefault()

		// store username and email in variables
		const {username,email} = formData
		
		console.log(username)
		console.log(email)
		
		navigate('/home');
	}



	return(
		<div className="signup">
			<div className="signup-container">
				<h2>Sign Up</h2>
				<form onSubmit={handleSubmit}>
					<div className="form-control">
						<label className="signup-label">
							Username:
						</label>
						<input 
							className="signup-input"
							name="username"
							value={formData.username}
							onChange={handleChange}
							type="text"
							required
						/>
					</div>

					<div className="form-control">
						<label className="signup-label">
							Email:
						</label>
						<input 
							className="signup-input"
							name="email"
							value={formData.email}
							onChange={handleChange}
							type="text"
							required
						/>
					</div>
					<button type='submit' className="save">Submit</button>
				</form>
			</div>
		</div>
	)
}

export default SignUp
