'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { getAllTranslations } from '@/action/translation'
import { toast } from 'sonner'

const TranslarteAllBtn = ({ title, content, ministry }) => {

    const [loading, setLoading] = useState(false);

    const translateAll = async () => {
        try {
            setLoading(true);
            const res = await getAllTranslations(title, content, ministry);
            // toast[res.type](res.message);
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Button disabled={loading} onClick={translateAll}>Translate in all languages</Button>
    )
}

export default TranslarteAllBtn