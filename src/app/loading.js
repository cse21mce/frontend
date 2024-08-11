import { Skeleton } from "@/components/ui/skeleton"

const loading = () => {
    return (
        <div className="h-screen w-full flex items-center justify-center relative">
            <Skeleton className={'w-16 h-16 rounded-full fixed top-1/3 right-2/3 animate-bounce'} />
            <Skeleton className={'w-28 h-28 rounded-full fixed bottom-2/3 left-1/4 animate-bounce'} />
            <Skeleton className={'w-28 h-28 rounded-full fixed top-1/2 left-2/3 animate-bounce'} />
            <Skeleton className={'w-16 h-16 rounded-full fixed bottom-1/3 right-1/3  animate-bounce'} />
            <Skeleton className={'p-10 -mt-28 rounded-3xl'}>
                <p className="text-4xl font-bold text-center">PIB</p>
                <p className="text-md font-semibold text-center">Loading...</p>
            </Skeleton>
        </div>
    )
}

export default loading