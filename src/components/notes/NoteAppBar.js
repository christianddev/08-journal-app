import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { startSaveNote, startUploading } from '../../actions/notes';

const NotesAppBar = () => {
    const dispatch = useDispatch();
    const {notes: {active: note}} = useSelector(state => state);

    const noteDate = moment(note.date);
    const handleSave = () => {
        dispatch(startSaveNote(note));
    }

    const handlePictureUpload = (e) => {
        document.querySelector('#fileSelector').click();
    }

    const handleInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            dispatch(startUploading(file));
        }
    }

    startSaveNote()
    return (
        <div className="notes__appbar">
            <span>{noteDate.format('Do MMMM YYYY')}</span>
            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{display: 'none'}}
                onChange={handleInputChange}
            />

            <div>
                <button
                    className="btn"
                    onClick={handlePictureUpload}
                >
                    Picture
                </button>

                <button
                    className="btn"
                    onClick={handleSave}
                    >
                    Save
                </button>
            </div>
        </div>
    )
}

export default NotesAppBar;