import Note from "./Note"
import AddNote from "./AddNote"

const NoteList = ({notes, handleAddNote, handleDeleteNote}) =>{
	return (
		<div className="note-list">
			<AddNote handleAddNote = {handleAddNote} />
			{/* for each not in notes render a note component */}
			{notes.map((note) => ( 
				<Note 
					id={note.id} 
					text={note.text} 
					date={note.date}
					handleDeleteNote={handleDeleteNote}
				/>
			))}
		</div>
	)
}

export default NoteList