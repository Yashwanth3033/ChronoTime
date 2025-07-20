import React, {useState} from 'react';
import {truncateWords} from "../utils/utils.js";
import {useNavigate} from "react-router-dom";

export default function WatchCard({ name, price, watchImg, brandName, description, watchId }) {
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  const handleBuyProduct = function () {
    navigate(`/watch/${watchId}`);
  }

  const handleBuyWatch = async function () {
    setLoading(true);
    const options = {
      key: "rzp_test_2158f6BhcOeCqq",
      payment_link: "plink_QudwWBN51Bevm6",
      handler(response) {
        console.log(response); 
        const {razorpay_payment_id} = response;
        alert(`Payment successful! ID: ${razorpay_payment_id}`)
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  }
  
  return (
    <div className="">
      <div className="w-full flex flex-col relative items-stretch border rounded-lg shadow-sm md:flex-row md:max-w-xl  border-gray-700 bg-gray-800 hover:bg-gray-700">
          <img className="object-cover w-full rounded-t-lg h-96 md:h-80 md:w-48 md:rounded-none md:rounded-s-lg" src={watchImg} alt={name} />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <div className="">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{name}</h5>
              <p className="mb-3 font-normal text-gray-400">{brandName}</p>
              <p className="mb-3 font-normal text-gray-400">{truncateWords(description, 12)}</p>
            </div>
            <h2 className="text-lime-600 font-semibold">₹{price}</h2>
          </div>
          <button 
            onClick={handleBuyProduct}
            disabled={loading}
            className="bg-yellow-500/90 rounded-full px-6 font-semibold shadow-md hover:shadow-yellow-500/70 text-lg tracking-tight py-2 hover:bg-yellow-600 transition-all duration-200 hover:-translate-y-2 hover:-translate-x-1 absolute bottom-2 right-2 cursor-pointer">
            Buy
          </button>
      </div>
    </div>
  );
}
