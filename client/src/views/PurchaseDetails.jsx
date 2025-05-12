import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProductModal from "../components/AddProductModal";
import UpdateProductModal from "../components/UpdateProductModal";
import AddPurchaseModal from "../components/AddPurchaseModal";
import UpdatePurchaseModal from "../components/UpdatePurchaseModal";
import { Button } from "@mui/material";

export default function PurchaseDetails(params) {
  const [productsData, setProductsData] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/purchase");
      setProductsData(res.data);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const deleteProducts = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/purchase/${id}`);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateClick = (purchase) => {
    setSelectedPurchase(purchase);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
    setSelectedPurchase(null);
  };

  return (
    <>
      <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
        <h2 className=" text-gray-800 font-semibold truncate">Overall Purchase</h2>
        <div className="mt-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* ... */}
        </div>
      </div>

      <div className="w-full px-4 py-5 my-3 bg-white rounded-lg shadow">
        <div className="overflow-x-auto mt-2">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="items-start justify-between md:flex">
              <div className="max-w-lg">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                  Purchase Details
                </h3>
              </div>
              <div className="mt-3 md:mt-0 flex align-middle">
                {/* ... */}
                <AddPurchaseModal fetchProducts={fetchProducts} />
              </div>
            </div>
            <div className="mt-5 shadow-sm border rounded-lg overflow-x-auto">
              <table className="w-full table-auto text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                  <tr>
                    <th className="py-3 px-6">Purchase ID</th>
                    <th className="py-3 px-6">Product Name</th>
                    <th className="py-3 px-6">Total Purchase Amount</th>
                    <th className="py-3 px-6">Quantity</th>
                    <th className="py-3 px-6">Added Date</th>
                    <th className="py-3 px-6">Modified Date</th>
                    <th className="py-3 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                  {productsData.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item._id.slice(-6)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item?.product_id?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.total_purchase_amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.createdAt.slice(0, 10)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.updatedAt.slice(0, 10)}
                      </td>
                      <td className="text-right px-6 whitespace-nowrap">
                        <Button
                          onClick={() => handleUpdateClick(item)}
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => deleteProducts(item._id)}
                          variant="contained"
                          color="secondary"
                          size="small"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <UpdatePurchaseModal
        isOpen={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        purchase={selectedPurchase}
        fetchProducts={fetchProducts}
      />
    </>
  );
}
