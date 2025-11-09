import React from 'react';

const FlexCenter = ({children,className=" "}) => {


    return (
        <div className={`w-11/12 flex mx-auto ${className}`}>
            {children}
            
        </div>
    );
};

export default FlexCenter;