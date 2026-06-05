import React, { useId } from 'react'

function Select(
    {
        label,
        options,
        className = '',
        ...rest
    }
    , ref
) {
    const id = useId();
    return (
        <div className={`select ${className}`}>
            <label htmlFor={id}>
                {label}
            </label>
            <select ref={ref} id={id} {...rest} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} {...rest}>
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select);