import React from 'react';
import JournalEntry from './JournalEntry';

const JournalEntries = () => {
  const entries = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
  return (
    <div className="journal__entries">
      {
        entries.map((e) => <JournalEntry key={e} />)
      }
    </div>
  )
}

export default JournalEntries;
