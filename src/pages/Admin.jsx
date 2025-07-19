import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Section from "../components/Section";
import { getWatches } from "../services/apiWatches";
import toast from "react-hot-toast";
import WatchCardAdmin from "../components/watchCardAdmin";
import {deleteWatch} from "../services/apiWatches";


export default function Admin() {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchWatches() {
      setLoading(true);
      try {
        const watches = await getWatches();
        setWatches(watches);
        console.log(watches);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWatches();
  }, []);

  const handleDeleteWatch = async function (id) {
    try {
      setLoading(true);
      const data = await deleteWatch(id);
      toast.success("Watch Deleted Successfully");
      setWatches((watch) => watch.filter((w) => w.id !== id));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }
  
  const handleWatchUpdate = function (updatedWatch) {
    setWatches((prev) => {
      return prev.map((w) => w.id === updatedWatch.id ? updatedWatch : w);
    })
  }

  if (loading) return <Section><Spinner /></Section>;

  return (
    <Section className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {watches.map((watch) => {
          return (
            <WatchCardAdmin
              key={watch.id}
              watchId={watch.id}
              name={watch.watchName}
              description={watch.watchDescription}
              price={watch.watchPrice}
              brandName={watch.watchBrand}
              watchImg={watch.watchImage}
              handleDeleteWatch={handleDeleteWatch}
              category={watch.watchCategory}
              onEdit={handleWatchUpdate}
            />
          );
        })}
      </div>
    </Section>
  );
}
