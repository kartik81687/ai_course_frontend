import React from 'react';

const StyledText = ({ text }) => {
    return <div className='text-white/80' dangerouslySetInnerHTML={{ __html: text }} />;
};

export default StyledText;