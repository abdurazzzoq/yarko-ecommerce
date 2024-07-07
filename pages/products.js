import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import axios from "axios";
import Laoder from "@/components/laoder";
import { withSwal } from "react-sweetalert2";

export const Products = ({ swal }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
      setLoading(false);
    });
  };

  const deleteHadler = (product) => {
    swal
      .fire({
        title: "",
        text: `"${product.title}"ni o'chirishga aminmisiz?`,
        showCancelButton: true,
        cancelButtonText: "Yo'q, o'chrilmasin",
        confirmButtonText: "Ha, o'chirish",
        confirmButtonColor: "red",
        reverseButtons: true,
      })
      .then(async (res) => {
        if (res.isConfirmed) {
          const { _id } = product;
          await axios.delete("/api/products?_id=" + _id);
          fetchProducts();
        }
      })
      .catch((err) => new Error(err));
  };

  return (
    <Layout>
      <Link href={"/products/new"} className="btn-primary">
        Yangi mahsulot kiritish
      </Link>

      <table className="basic">
        <thead>
          <tr>
            <td>Mahsulot nomi</td>
            <td></td>
          </tr>
        </thead> 
        {loading ? (
          <Laoder />
        ) : (
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>
                  <Link
                    className="bg-blue-900 rounded-md text-sm text-white py-1 px-2 inline-flex gap-1 items-center mr-2"
                    href={"/products/edit/" + product._id}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    O'zgartirish
                  </Link>

                  <button
                    onClick={() => deleteHadler(product)}
                    className="bg-red-500 rounded-md text-sm text-white py-1 px-2 inline-flex gap-1 items-center mr-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    O'chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </Layout>
  );
};

export default withSwal(({ swal }, ref) => <Products swal={swal} />);
