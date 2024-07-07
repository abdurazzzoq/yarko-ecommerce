import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const ProductForm = ({
  _id,
  title: existingTitle,
  description: existingDesc,
  price: existingPrice,
  images: existingImages,
  category: existingCategory,
}) => {
  const [category, setCategory] = useState(existingCategory || "");
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDesc || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [loading, setLoading] = useState(false);
  const [goToProduct, setGoToProducts] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  async function saveProduct(e) {
    e.preventDefault();
    const data = { title, description, price, images, category };
    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }
  if (goToProduct) {
    router.push("/products");
  }

  useEffect(() => {
    axios.get("/api/categories").then((res) => setCategories(res.data));
  }, []);

  async function imageHandler(e) {
    const files = e.target?.files;
    if (files?.length > 0) {
      setLoading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }

      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setLoading(false);
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Mahsulot kiriting</label>
      <input
        placeholder="Yangi mahsulot nomini kiriting..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Kategoriya berilmagan</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <label>Rasm</label>
      <div className="mb-2 flex flex-wrap gap-2">
        {!!images.length &&
          images.map((link) => (
            <div key={link}>
              <img
                className=" max-h-full h-24 rounded-lg"
                src={link}
                alt="img"
              />
            </div>
          ))}
        {loading && <div>loading...</div>}

        <label className="flex items-center justify-center text-center px-1 text-sm text-gray-400 bg-gray-300 w-28 h-28 rounded-lg cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>

          <div>Rasm yuklash</div>
          <input onChange={imageHandler} type="file" className="hidden" />
        </label>
      </div>

      {!images?.length && <div className="my-4">Rasm yuklanmagan</div>}
      <label>Mahsulot haqida</label>
      <textarea
        placeholder="ta'rif..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label>Mahsulot narxi (SO'M)</label>
      <input
        type="number" 
        placeholder="narx..."
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="btn-primary">
        Saqlash
      </button>
    </form>
  );
};

export default ProductForm;
