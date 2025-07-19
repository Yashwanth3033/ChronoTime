import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import Section from '../components/Section';
import { getLatestThreeProducts } from '../services/apiWatches';
import WatchCard from '../components/WatchCard';
import Spinner from "../components/Spinner";

const Home = () => {

  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch the watches for home page!
  useEffect(() => {
    const fetchWatches = async function () {
      try {
        setLoading(true);
        const watches = await getLatestThreeProducts();
        console.log(watches);
        setWatches(watches);
      } catch(err) {
        console.log(err);
      } finally {
        setLoading(false);
      } 
    }
    fetchWatches();
  }, [])

  return (
    <Section className="space-y-10">
    <div className="grid grid-row sm:grid-cols-2 gap-4">
      <CategoryCard 
        categoryImage={"https://images.pexels.com/photos/2155319/pexels-photo-2155319.jpeg"} 
        categoryName={"Men's Watches"}
      />
      <CategoryCard 
        categoryImage={"https://images.pexels.com/photos/1374128/pexels-photo-1374128.jpeg"} 
        categoryName={"Women's Watches"}
      />
      <CategoryCard 
        categoryImage={"https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg"} 
        categoryName={"Accessories"}
        className="sm:col-span-2"
      />
    </div>
    {loading ? <Spinner /> : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {watches.map((w) => {
      return (
        <WatchCard
          watchImg={w.watchImage}
          name={w.watchName}
          price={w.watchPrice}
          brandName={w.watchBrand}
          description={w.watchDescription}
        />
      )
    })}
    </div>
    )}
    </Section>
  )
}

const CategoryCard = function({categoryName, categoryImage, className}) {
  return (
      <Link className={`relative inline-block ${className} rounded group overflow-hidden`}>
        <img 
          src={categoryImage} 
          alt="category image" 
          className="object-cover bg-cover w-full h-80 rounded group-hover:scale-110 trnsition-all duration-300 ease-in-out"
        />
        <div className="rounded absolute inset-0 bg-neutral-900/50 z-10 flex items-center justify-center">
          <h2 className="text-3xl font-bold text-white text-center pt-4">{categoryName}</h2>
        </div>
      </Link>
  )
}

export default Home