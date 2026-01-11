import react, { useId } from "react"
const Input = react.forwardRef
(
    function Input(
        {
            label,
            type = "text",
            className = "",
            ...props
        },ref)
    {

        const id = useId();



        return (
            <div className="w-full">
                {
                    label && 
                    <label className="inline-block mb-1 pl-1"
                     htmlFor={id}>
                        {label}
                    </label>
                }
                <input type={type}
                 className={`
                       w-full
    rounded-lg
    border border-gray-300
    bg-white
    px-4 py-2
    text-sm text-gray-900
    placeholder-gray-400

    focus:outline-none
    focus:ring-2 focus:ring-purple-300
    focus:border-purple-300

    transition duration-200 ease-in-out

    disabled:bg-gray-100
    disabled:cursor-not-allowed
                    ${className}`}
                 ref={ref}
                 id={id}
                 {...props}
                />
            </div>
        )
    }
)

export default Input