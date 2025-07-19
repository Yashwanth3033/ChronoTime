import supabase, {supabaseUrl} from "./supabase";


// Create Product
// https://jijswboodxckfqwcoder.supabase.co/storage/v1/object/public/watches//brand%20watch.png 
export const createWatch = async function (newWatch) {
    console.log(newWatch, "from supabase");
    const watchImgName = `${Math.random()}-${newWatch.watchImage.name}`.replaceAll("/", "");
    const watchImagePath = `${supabaseUrl}/storage/v1/object/public/watches//${watchImgName}`;

    const {data, error} = await supabase.from("Watch").insert([{...newWatch, watchImage: watchImagePath}]);
    
    if (error) {
        console.log(error);
        throw new Error("Watch could not be added");
    }

    // Upload Image Here
    // We upload image only if the cabion was created successfully else we do not!
    const {error: storageError} = await supabase.storage
    .from("watches")
    .upload(watchImgName, newWatch.watchImage)

    // Delete the watch if there was an error uploading the image
    if (storageError) {
        // delete the watch
        await supabase.from("Watch").delete().eq("id", data.id);
        console.error(storageError);
        throw new Error("Product image could not be uploaded and the product was not added!");
    }

    return data;
}

export const editWatch = async function (id, updatedProduct) {
    const {data, error} = await supabase
        .from("Watch")
        .update(updatedProduct)
        .eq("id", id)
        .select()
        .single();

    if (error) throw new Error("Could not update product details");

    return data;
}

// Read Product Data
export const getWatches = async function () {
    let { data: Watch, error } = await supabase.from('Watch').select('*');

    if (error) {
        throw new Error(`Error fetching watches: ${error.message}`);
    }

    return Watch;
}

export async function getLatestThreeProducts() {
  const { data, error } = await supabase
    .from("Watch")
    .select("*")
    .order("created_at", { ascending: false }) 
    .limit(3);                                 

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export const deleteWatch = async function (id) {
    const {data, error} = await supabase.from("Watch").delete().eq("id", id).select();
    console.log(data);
    if (error) throw new Error("Watch could not be deleted");

    return data;

}





          