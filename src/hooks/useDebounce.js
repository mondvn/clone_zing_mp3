/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'

const useDebounce = (value, delay) => {
  const [debouncedValue, setDeboundedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDeboundedValue(value), delay)

    return () => { clearTimeout(handler) }
  }, [value])

  return debouncedValue
}

export default useDebounce