import React from 'react';

function Card({ title,content }) {
    return (

        <div className="border-solid border border-black-1000 relative rounded-lg bg-white h-45 w-60 p-4">
            <div className="flex">
                <h1 className="font-bold mt-3 text-black-500">
                    {title}
                </h1>
            </div>
            <p className="px-3 mt-1 ml-3">{content}</p>
        </div>
    );
}

export default Card;
