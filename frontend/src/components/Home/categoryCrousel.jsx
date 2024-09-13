import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '../../redux/jobSlice'
import { useNavigate } from 'react-router-dom'




export default function categoryCrousel() {

    const category = [
        'Frontend Developer',
        'Backend Developer',
        'Data Science',
        'Artificial Intelligence',
        'full Stack'
    ]
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const searchJobHandler = (elem) => {

        dispatch(setSearchQuery(elem));
        navigate("/browse")
      }


    return (
        <div>
            <div className='flex justify-center items-center'>
                <Carousel className="w-full lg:max-w-xl mx-auto my-14 max-w-60">
                    <CarouselContent>
                        {
                            category.map((elem,i) => [
                                <CarouselItem className="flex justify-center lg:basis-1/2 " key={i}>
                                    <Button onClick={()=>searchJobHandler(elem)} className="rounded-full" variant="outline">{elem}</Button>
                                </CarouselItem>
                            ])
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

            </div>




        </div>
    )
}
