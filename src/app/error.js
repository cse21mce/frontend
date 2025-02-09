'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

export default function Error({ error, reset }) {
    useEffect(() => {
        toast.error(error)
    }, [error])

    return (
        <div>
            <h2>Something went wrong!</h2>
            <p>{error.message}</p>
            <button
                onClick={
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}