import { useState } from 'react'

const AddNote = ({handleAddNote}) =>{
	const [noteText,setNoteText] = useState('')
	const charLimit = 200;
	const handleInput = (event) => {
		if(charLimit - event.target.value.length >= 0){
			setNoteText(event.target.value)
		}
		
	}

	const handleSave = () =>{
		// if after removing white space from start and end note is not empty
		if(noteText.trim().length > 0){
			handleAddNote(noteText)
			// clear not text after adding
			setNoteText('')
		}
		
	}

	return (
		<div className='note new'>
			<textarea 
				rows="8" 
				cols ="10" 
				placeholder='Begin typing'
				value={noteText}
				onChange={handleInput}
			>
		
			</textarea>
			<div className='note-footer'>
				<small>{charLimit - noteText.length} characters Remaining</small>
				<button className='save' onClick={handleSave}>Save</button>
			</div>
		</div>
	)
}

export default AddNote