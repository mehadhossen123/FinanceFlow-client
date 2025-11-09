import React, { useEffect } from 'react';

const MyTransaction = () => {

     useEffect(()=>{
        document.title="MyTransaction"
      },[])
    
    return (
        <div>

            Hello this is my transaction
            
        </div>
    );
};

export default MyTransaction;