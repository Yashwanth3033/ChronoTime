import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getWatch} from "../services/apiWatches.js";
import Spinner from "../components/Spinner.jsx";

function Watch() {

    const {id: watchId} = useParams();
    const [watch, setWatch] = useState(null);
    useEffect(() => {
        async function fetchWatch () {
            const data = await getWatch(watchId);
            console.log(data);
            setWatch(data);
        }

        fetchWatch();
    }, [watchId]);

    if (!watch) return <div className={"flex flex-row item-center justify-center py-10"}><Spinner /></div>
    const {watchDescription, watchName, watchImage, watchPrice, watchBrand} = watch;
    return (
        <div className="flex flex-col sm:flex-row py-3 gap-x-7">
            {/*product img*/}
            <div className="basis-1/2 overflow-hidden rounded-4xl ring-3 ring-[#B87333]">
                    <img src={watchImage} alt={watchName} className="w-full h-full hover:scale-110 transition-all cursor-pointer" />
            </div>
            {/*product details and buy*/}
            <div className="basis-full px-6 py-3 my-20 gap-y-3 flex flex-col ">
                <h1 className="font-bold text-3xl tracking-wider font-serif">{watchName}</h1>
                <p className="text-2xl font-bold tracking-widest bg-gradient-to-r from-yellow-400 via-lime-500
                to-green-500 text-transparent bg-clip-text inline-block cursor-pointer">
                    {watchBrand}
                </p>
                <p className="text-gray-400 w-1/2">{watchDescription}</p>
                <h3 className="text-lg font-semibold">₹ {watchPrice}</h3>
                <button className="px-6 py-3 text-xl rounded w-fit font-semibold tracking-tighter cursor-pointer bg-yellow-500 hover:bg-yellow-600 transition-all duration-200 hover:scale-105">Buy Now</button>
            </div>
        </div>
    );
}

export default Watch;

/*

*/

