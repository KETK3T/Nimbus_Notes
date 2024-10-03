import React from "react"

const Header = ({handleToggleDarkMode}) =>{
	return(
		<div className="header">
			<h1>Sticky Cloud Notes</h1>
			<button 
				className="save"
				onClick={() => handleToggleDarkMode((previousBgMode)=> !previousBgMode)}
			>
				Dark/Light mode
			</button>
		</div>
	)
}

export default Header