import React from 'react';

const NotesAppBar = () => {
    return (
        <div className="notes__appbar">
            <span>28 de agosto 2020</span>

            <div>
                <button className="btn">
                    Picture
                </button>

                <button className="btn">
                    Save
                </button>
            </div>
        </div>
    )
}

export default NotesAppBar;