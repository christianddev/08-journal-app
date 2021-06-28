import React from 'react';
import NoteAppBar from './NoteAppBar';

const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            <NoteAppBar/>

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                 />
                 <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                 ></textarea>
                 <div className="notes__image">
                    <img 
                        src="https://image.freepik.com/free-vector/watercolor-style-natural-landscape-background_23-2148218859.jpg" 
                        alt="note_image"
                        />

                 </div>
            </div>
        </div>
    )
}

export default NoteScreen;
