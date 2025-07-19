import {useState, useRef} from 'react'
import Section from "../components/Section";
import toast from "react-hot-toast";
import { TbCameraPlus } from "react-icons/tb";
import {createWatch} from "../services/apiWatches";

export default function AddWatch() {
    const initialProductDetails = {
            watchName: "",
            watchDescription: "",
            watchPrice: 0,
            watchImg: null,
            watchBrand: "",
            watchCategory: ""
    };
    const imageInputRef = useRef(null);
    const [productDetails, setProductDetails] = useState(initialProductDetails);
    const [isLoading, setIsLoading] = useState(false);

    const handleAddWatch = async function (e) {
        e.preventDefault();
        const {watchName, watchDescription, watchPrice, watchImg, watchBrand, watchCategory} = productDetails;
        console.log(watchImg.name);
        if (!watchName || !watchDescription || !watchPrice || !watchImg || !watchBrand || !watchCategory) {
            toast.error("Please Fill All The Product Details");
            return;
        }

        const newWatch = {
            watchName,
            watchDescription,
            watchPrice,
            watchBrand,
            watchImage: watchImg,
            watchCategory
        }

        try {
            setIsLoading(true);
            const data = await createWatch(newWatch);
            toast.success("Watch was added successfully");
            setProductDetails(initialProductDetails);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }

    }

    const handleImageChange = function (e) {
        const file = e.target.files[0];
        if (file) {
            setProductDetails((prev) => {
                return {
                    ...prev,
                    watchImg: file
                };
            });
        }
    }

    return (
    <Section className="flex flex-col items-center justify-center gap-y-5">
        <h1 className="text-3xl md:text-6xl font-bold capitalize">Add Product</h1>
        <form onSubmit={handleAddWatch} className="rounded bg-gray-700 px-10 py-8 w-full max-w-xl flex flex-col gap-y-5 *:flex *:flex-col *:gap-y-1.5">
            <div className="">
                <label htmlFor="watch-name" className="font-bold text-lg">Watch Name</label>
                <input 
                    type="text" 
                    id="watch-name" 
                    placeholder="Watch Name"
                    className="outline-none px-5 py-3 rounded-md ring-1 focus:ring-violet-600 focus:ring-2 placeholder:font-semibold placeholder:text-gray-500 font-semibold text-lg"
                    value={productDetails.watchName}
                    onChange={(e) => setProductDetails((prev) => ({...prev, watchName: e.target.value}))}
                />
            </div>

            <div className="">
                <label htmlFor="watch-description" className="font-bold text-lg">Watch Description</label>
                <input 
                    type="text" 
                    id="watch-description" 
                    placeholder="Watch description"
                    className="outline-none px-5 py-3 rounded-md ring-1 focus:ring-violet-600 focus:ring-2 placeholder:capitalize placeholder:font-semibold placeholder:text-gray-500 font-semibold text-lg"
                    value={productDetails.watchDescription}
                    onChange={(e) => setProductDetails((prev) => ({...prev, watchDescription: e.target.value}))}
                />
            </div>

            <div className="">
                <label htmlFor="watch-brand" className="font-bold text-lg">Watch brand</label>
                <input 
                    type="text" 
                    id="watch-brand" 
                    placeholder="Watch brand"
                    className="outline-none px-5 py-3 rounded-md ring-1 focus:ring-violet-600 focus:ring-2 placeholder:capitalize placeholder:font-semibold placeholder:text-gray-500 font-semibold text-lg"
                    value={productDetails.watchBrand}
                    onChange={(e) => setProductDetails((prev) => ({...prev, watchBrand: e.target.value}))}
                />
            </div>

            <div className="">
                <label htmlFor="watch-category" className="font-bold text-lg">Watch category</label>
                {/* <input 
                    type="text" 
                    id="watch-category" 
                    placeholder="Watch category"
                    className="outline-none px-5 py-3 rounded-md ring-1 focus:ring-violet-600 focus:ring-2 placeholder:capitalize placeholder:font-semibold placeholder:text-gray-500 font-semibold text-lg"
                    value={productDetails.watchCategory}
                    onChange={(e) => setProductDetails((prev) => ({...prev, watchCategory: e.target.value}))}
                /> */}
                <select 
                onChange={(e) => setProductDetails((prev) => ({...prev, watchCategory: e.target.value}))} 
                value={productDetails.watchCategory}
                className="outline-none px-5 py-3 bg-gray-700 rounded-md ring-1 focus:ring-violet-600 focus:ring-2 placeholder:capitalize placeholder:font-semibold placeholder:text-gray-500 font-semibold text-lg">
                    <option disabled defaultChecked value="">Select Product Category</option>
                    <option value="men">men</option>
                    <option value="women">women</option>
                    <option value="accessories">accessories</option>
                </select>
            </div>

            <div className="">
                <label htmlFor="watch-price" className="font-bold text-lg">Watch price</label>
                <input 
                    type="number" 
                    step={1.0}
                    id="watch-price" 
                    placeholder="Watch price"
                    className="outline-none px-5 py-3 rounded-md ring-1 focus:ring-violet-600 focus:ring-2 placeholder:capitalize placeholder:font-semibold placeholder:text-gray-500 font-semibold text-lg"
                    value={productDetails.watchPrice}
                    onChange={(e) => setProductDetails((prev) => ({...prev, watchPrice: e.target.value}))}
                />
            </div>

            <div className="">
                <label htmlFor="watch-image" className="font-bold text-lg hidden">Watch image</label>
                <input 
                    ref={imageInputRef}
                    type="file" 
                    accept="image/*"
                    id="watch-image" 
                    placeholder="Watch image"
                    className="outline-none hidden px-5 py-3 rounded-md ring-1 focus:ring-violet-600 focus:ring-2 placeholder:capitalize placeholder:font-semibold placeholder:text-gray-500 font-semibold text-lg"
                    onChange={handleImageChange}
                />
            </div>

            <div onClick={() => imageInputRef.current.click()} className="h-80 flex items-center justify-center border-2 rounded border-dashed cursor-pointer">
                {productDetails.watchImg ? (
                    <img src={URL.createObjectURL(productDetails.watchImg)} alt="product image" className="h-full w-full object-cover object-top rounded" />
                ) : (
                    <>
                        <TbCameraPlus size={100} className={"opacity-60"} />
                        <h3 className="font-semibold text-xl">Add Your Image<sup>+</sup></h3>
                    </>
                )}
            </div>

            
            
            <button
                className="uppercase px-4 py-3 font-bold text-xl ring-2 ring-blue-500 rounded bg-blue-500 hover:bg-blue-600 duration-200 transition-colors cursor-pointer disabled:animate-pulse disabled:bg-gray-700/60 disabled:cursor-not-allowed" 
                type="submit"
                disabled={isLoading}
            >
                Add Watch
            </button>
        </form>
    </Section>
  )
}

