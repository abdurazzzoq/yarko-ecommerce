import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const [product, setProduct] = useState(null);
const router = useRouter();
const { id } = router.query;
useEffect(() => {
  if (!id) {
    return;
  }
  axios.get("/api/products?id=" + id).then((res) => {
    setProduct(res.data);
  });
}, [id]);

export default function editProduct() {
  return (
    <Layout>
      <h1>Mahsulotni Ozgartirish</h1>
      {product && <ProductForm {...product} />}
    </Layout>
  );
}
