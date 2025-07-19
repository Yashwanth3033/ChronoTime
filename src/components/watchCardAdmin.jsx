import {useState, useContext} from "react";
import { FaPencilAlt } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import Modal from "./Modal";
import Section from "./Section";
import toast from "react-hot-toast";
import { editWatch } from "../services/apiWatches";
import { ModalContext } from "./Modal";

export default function WatchCardAdmin({name, price, watchImg, brandName, description, watchId, handleDeleteWatch, category, onEdit}) {
  return (
    <div
      className="flex relative flex-col items-start border rounded-lg shadow-sm md:flex-row md:max-w-xl  border-gray-700 bg-gray-800 hover:bg-gray-700"
    >
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-80 md:w-48 md:rounded-none md:rounded-s-lg"
        src={watchImg}
        alt={name}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <div className="">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
            {name}
          </h5>
          <p className="mb-3 font-normal text-gray-400">{brandName}</p>
          <p className="mb-3 font-medium text-gray-200">{description}</p>
        </div>
        <h2 className="text-lime-600 font-semibold">{price}</h2>
      </div>
      <div className="absolute right-0 bottom-0 flex gap-x-2 p-2">
        <button onClick={() => handleDeleteWatch(watchId)} className="px-3 py-1.5 bg-red-600/80 hover:bg-red-500 rounded cursor-pointer"><IoTrashBin /></button>
        <Modal>
          <Modal.Open name="edit">
            <button className="px-3 py-1.5 bg-yellow-600/80 hover:bg-yellow-700 rounded cursor-pointer"><FaPencilAlt /></button>
          </Modal.Open>
          <Modal.Window opens={"edit"} title={`Edit ${name}`}>
            <WatchEditForm
              watchBrand={brandName}
              watchCategory={category}
              watchName={name}
              watchPrice={price}
              watchImage={watchImg}
              watchDescription={description}
              watchId={watchId}
              onEdit={onEdit}
            />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

const WatchEditForm = function ({watchName, watchDescription, watchImage, watchBrand, watchCategory, watchPrice, watchId, onEdit}) {
  const {closeModal} = useContext(ModalContext);
  const [loading, setLoading] = useState(false);
  const initialState = {
    watchName,
    watchDescription,
    watchPrice,
    watchBrand,
    watchImage,
    watchCategory
  }

  const [productDetails, setProductDetails] = useState(initialState);

  const handleSubmitEdit = async function (e) {
    e.preventDefault();
    console.log(productDetails);
    const {watchName, watchDescription, watchPrice, watchImage, watchBrand, watchCategory} = productDetails;
        if (!watchName || !watchDescription || !watchPrice || !watchImage || !watchBrand || !watchCategory) {
            toast.error("Please Fill All The Product Details");
            return;
        }
        
        const updatedProductDetail = {
          watchName,
          watchPrice,
          watchDescription,
          watchCategory,
          watchBrand
        }

        try {
          setLoading(true);
          const data = await editWatch(watchId, updatedProductDetail);
          console.log(data, "data supabase watch");
          onEdit(data);
          toast.success("Watch updated successfully");
          closeModal();
        } catch (err) {
          toast.error(err.message);
        } finally {
          setLoading(false);
        }


  }

  return (
    <Section className="flex flex-col items-center justify-center gap-y-5">
      <form onSubmit={handleSubmitEdit} className="rounded px-10 py- w-full max-w-xl flex flex-col gap-y-5 *:flex *:flex-col *:gap-y-1.5 ">
        <div className="">
          <label htmlFor="watch-name" className="font-bold text-lg">Watch Name</label>
          <input
              disabled={loading} 
              type="text" 
              id="watch-name" 
              placeholder="Watch Name"
              className="outline-none px-5 py-3 rounded-md ring-1 focus:ring-violet-600 focus:ring-2 placeholder:font-semibold placeholder:text-gray-500 font-semibold text-lg disabled:bg-neutral-900/70"
              value={productDetails.watchName}
              onChange={(e) => setProductDetails((prev) => ({...prev, watchName: e.target.value}))}
          />
        </div>

        <div className="">
                <label htmlFor="watch-description" className="font-bold text-lg">Watch Description</label>
                <input
                    disabled={loading} 
                    type="text" 
                    id="watch-description" 
                    placeholder="Watch description"
                    className="outline-none px-5 py-3 rounded-md ring-1 focus:ring-violet-600 focus:ring-2 placeholder:capitalize placeholder:font-semibold placeholder:text-gray-500 font-semibold text-lg disabled:bg-neutral-900/70"
                    value={productDetails.watchDescription}
                    onChange={(e) => setProductDetails((prev) => ({...prev, watchDescription: e.target.value}))}
                />
            </div>

            <div className="">
                <label htmlFor="watch-brand" className="font-bold text-lg">Watch brand</label>
                <input
                    disabled={loading} 
                    type="text" 
                    id="watch-brand" 
                    placeholder="Watch brand"
                    className="outline-none px-5 py-3 rounded-md ring-1 focus:ring-violet-600 focus:ring-2 placeholder:capitalize placeholder:font-semibold placeholder:text-gray-500 font-semibold text-lg disabled:bg-neutral-900/70"
                    value={productDetails.watchBrand}
                    onChange={(e) => setProductDetails((prev) => ({...prev, watchBrand: e.target.value}))}
                />
            </div>

            <div className="">
                <label htmlFor="watch-category" className="font-bold text-lg">Watch category</label>
                <select 
                onChange={(e) => setProductDetails((prev) => ({...prev, watchCategory: e.target.value}))} 
                value={productDetails.watchCategory}
                disabled={loading}
                className="outline-none px-5 py-3 rounded-md ring-1 focus:ring-violet-600 focus:ring-2 placeholder:capitalize placeholder:font-semibold placeholder:text-gray-500 font-semibold text-lg disabled:bg-neutral-900/70">
                    <option disabled defaultChecked value="">Select Product Category</option>
                    <option value="men">men</option>
                    <option value="women">women</option>
                    <option value="accessories">accessories</option>
                </select>
            </div>

            <div className="">
                <label htmlFor="watch-price" className="font-bold text-lg">Watch price</label>
                <input
                    disabled={loading} 
                    type="number" 
                    step={1.0}
                    id="watch-price" 
                    placeholder="Watch price"
                    className="outline-none px-5 py-3 rounded-md ring-1 focus:ring-violet-600 focus:ring-2 placeholder:capitalize placeholder:font-semibold placeholder:text-gray-500 font-semibold text-lg disabled:bg-neutral-900/70"
                    value={productDetails.watchPrice}
                    onChange={(e) => setProductDetails((prev) => ({...prev, watchPrice: e.target.value}))}
                />
            </div>

            <div className="h-80 flex items-center justify-center border-2 rounded border-dashed cursor-pointer">
                <img src={watchImage} alt="product image" className="h-full w-full object-cover object-top rounded" />
            </div>

            <button
                className="uppercase px-4 py-3 font-bold ring-2 ring-blue-500 rounded bg-blue-500 hover:bg-blue-600 duration-200 transition-colors cursor-pointer disabled:animate-pulse disabled:bg-gray-700/60 disabled:cursor-not-allowed" 
                type="submit"
                disabled={loading}
            >
                Submit
            </button>

      </form>
    </Section>
  )
}


