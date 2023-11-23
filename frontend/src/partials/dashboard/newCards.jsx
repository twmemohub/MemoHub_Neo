import React from 'react';


function NewCards({ title, content }) {

    return (
        <div className="border border-black-800 relative rounded-lg bg-white h-45 w-60 p-4" >
            <div className="p-2">
                
            <div className="">      
                <h1 className="font-bold ml-3 mt-3 text-black-500">
                    {title}
                </h1>
                <p className="ml-3">
                    {content}
                </p>
            </div>
            </div>
        
                
        </div>
    );
}

export default NewCards;