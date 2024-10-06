import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const SignUp = () =>{

	const [formData, setFormData] = useState({
		username:'',
		email:'',
		password:''
	})

	const navigate = useNavigate()

	const handleChange = (event) => {
		const {name, value} = event.target
		setFormData({
			...formData,
			[name]: value
		})
	}

	const handleSubmit = async (event) =>{
		// prevent refresh
		event.preventDefault()

		try {
			const response = await fetch("http://localhost:8080/api/registration",{
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(formData)
			})

			if(response.ok){
				console.log('Registration Successful, Please check your email for verification.')
				await checkEmailVerification(formData.email)
			}else{
				const errorData = await response.json()
				console.error('Registration failed',errorData.message || 'Unknown error')
			}
		}catch(error){
			console.error("Error:",error)
		}
	}

	const checkEmailVerification = async (email) => {
		const maxAttempts = 50
		const interval = 10000
		for(let attempt = 1; attempt <= maxAttempts; attempt++){
			const response = await fetch(`http://localhost:8080/api/registration/check-verification?email=${email}`)

			if(response.ok){
				const data = await response.json()
				if(data){
					console.log("Email verification successful")
					navigate('/home')
					return
				}
			}else{
				console.error('Failed to check verification status')
			}
			await new Promise(res => setTimeout(res,interval))
		}

		console.error("Email verification timed out")
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
							placeholder="______________________"
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
							placeholder="______________________"
							value={formData.email}
							onChange={handleChange}
							type="email"
							required
						/>
					</div>
					<div className="form-control">
						<label className="signup-label">
							Password:
						</label>
						<input 
							className="signup-input"
							name="password"
							placeholder="______________________"
							value={formData.password}
							onChange={handleChange}
							type="password"
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
