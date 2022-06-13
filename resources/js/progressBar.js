const ProgressBar = ({ progressPercentage }) => {
    return (
        <div className='h-5 w-full bg-gray-300 rounded-full'>
            <div style={{ width: `${progressPercentage}%`}} className={`h-full bg-blue rounded-full text-sm text-center`}>
                {progressPercentage}%
            </div>
        </div>
    );
}

export default ProgressBar