import axios from "axios";

const postNewCategory = async (data: { category: string }) => {
  try {
    const res = await axios.post("/api/category", data);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const getCategories = async () => {
  try {
    const res = await axios.get("/api/category");
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const deleteCategory = async (id: string) => {
  console.log("id", id);
  try {
    const res = await axios.delete(`/api/category/${id}`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export { postNewCategory, getCategories, deleteCategory };
