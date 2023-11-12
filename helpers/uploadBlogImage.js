import { supabase } from "./supabase";

async function uploadBlogImage(file) {
  const imageName = `${Math.random()}-${file.name}`.replaceAll("-", "");
  const { data, error } = await supabase.storage
    .from("blogs-persona/blogs-content")
    .upload(imageName, file);
  if (error) {
    // Handle error
    console.log(error);
  } else {
    // Handle success
    const supabaseImage = `${process.env.SUPABASE_URL}/storage/v1/object/public/blogs-persona/blogs-content/${imageName}`;
    return supabaseImage;
  }
}

async function deleteImage() {
  const { data, error } = await supabase.storage
    .from("avatars")
    .remove(["folder/avatar1.png"]);
}

export { uploadBlogImage, deleteImage };
