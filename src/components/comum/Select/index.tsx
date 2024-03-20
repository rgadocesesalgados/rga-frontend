import { forwardRef, useId } from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  data: string[]
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, data, error, ...props }, ref) => {
  const id = useId()
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      <select
        name="select"
        id={id}
        ref={ref}
        className="w-full rounded border p-5 data-[error=true]:border-red-500"
        data-error={!!error}
        {...props}
        defaultValue={data[0]}
      >
        {data.map((item) => {
          return <option key={item} value={item} label={item} />
        })}
      </select>
      {!!error && <p className="text-red-500">{error}</p>}
    </div>
  )
})
