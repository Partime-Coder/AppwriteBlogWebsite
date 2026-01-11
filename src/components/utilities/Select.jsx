import React, { useId } from 'react'

function Select(
    {
        options,
        label,
        className = '',
        ...props
    }, ref
) {
    const id = useId();

    return (
        <div className='w-full'>
            {
                label &&
                <label className="inline-block mb-1 pl-1"
                    htmlFor={id}>
                </label>
            }
            <select 
            {...props} 
            ref={ref} 
            id={id}
            className={`
                 w-full
    rounded-lg
    border border-gray-300
    bg-white
    px-4 py-2.5
    text-sm text-gray-900

    focus:outline-none
    focus:ring-2 focus:ring-purple-500
    focus:border-purple-500

    transition duration-200 ease-in-out

    disabled:bg-gray-100
    disabled:cursor-not-allowed
                ${className}`} 
            
            > 
            {
                options?.map((option) => 
                    (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ) )
            }
            </select>

        </div>
    )
}

export default React.forwardRef(Select);