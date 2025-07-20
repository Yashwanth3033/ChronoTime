import React, {useEffect, useState} from 'react'
import {getWatches} from "../services/apiWatches";
import WatchCard from "../components/WatchCard";

const Watches = () => {
  const [watches, setWatches] = useState([]);
  useEffect(() => {
    async function fetchWatches() {
      const watches = await getWatches();
      setWatches(watches);
    }

    fetchWatches();
  }, [])

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 p-4 ">
      {watches.map((w) => (
        <WatchCard
          name={w.watchName}
          price={w.watchPrice}
          description={w.watchDescription}
          brandName={w.watchBrand}
          watchImg={w.watchImage}
          watchId={w.id}
        />
      ))}
    </div>
  )
}

export default Watches