function label(goalText) {
    return (
        <div className="border border-blue-500 inline-block rounded-[10px] px-3">
            <button 
            type="button"
            className="text-blue-500 text-base font-bold font-['DM Sans'] "
            onClick={() => labelButtonClick(goalText)}>
                {goalText}
            </button>
        </div>
    );
}

export default card;
