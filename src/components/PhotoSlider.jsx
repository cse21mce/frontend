import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

const PhotoSlider = ({ images, alt }) => {
    return (
        <Carousel
            opts={{
                align: "center",
                loop: true,
            }}
            className="w-full"
        >
            <CarouselContent>
                {
                    images.map((image, index) => {
                        return (
                            <CarouselItem key={index} className="w-full">
                                <Image src={image} width={560} height={560} quality={100} className='w-full rounded-md h-full bg-secondary max-h-[400px] object-contain aspect-square' alt={alt} />
                            </CarouselItem>
                        )
                    })
                }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

    )
}

export default PhotoSlider