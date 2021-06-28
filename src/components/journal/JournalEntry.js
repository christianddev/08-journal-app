import React from 'react';

const JournalEntry = (props) => {
    return (
        <div className="journal__entry">
            
            <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(data:image/jpeg;base64,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)'
                }}
            ></div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Un nuevo día
                </p>
                <p className="journal__entry-content">
                    Reprehenderit id in duis consectetur deserunt veniam fugiat.
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>

        </div>
    )
}

export default JournalEntry;
