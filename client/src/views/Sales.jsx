import { useEffect, useState } from "react";
import axios from "axios";
import AddSaleModal from "../components/AddSaleModal";
import UpdateSaleModal from "../components/UpdateSaleModal";

export default function Sales() {
  const [salesData, setSalesData] = useState([]);
  const [storesData, setStoresData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchSales();
    fetchStores();
  }, []);

  // Fetch Sales Data
  const fetchSales = async () => {
    try {
      const res = await axios.get("http://localhost:4000/sales");
      console.log("Sales Data Response:", res.data); // Debugging API Response
      if (Array.isArray(res.data)) {
        setSalesData(res.data);
      } else {
        console.error("Unexpected sales data format:", res.data);
      }
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  // Fetch Products Data
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/products");
      setProductsData(res.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch Stores Data
  const fetchStores = async () => {
    try {
      const res = await axios.get("http://localhost:4000/stores");
      setStoresData(res.data || []);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  // Delete Sale
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/sales/${id}`);
      fetchSales();
    } catch (error) {
      console.error("Error deleting sale:", error);
    }
  };

  // Open Update Modal
  const handleUpdateClick = (sale) => {
    setSelectedSale(sale);
    setIsUpdateModalOpen(true);
  };

  // Close Update Modal
  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedSale(null);
  };

  return (
    <>
      <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
        <h2 className="text-gray-800 font-semibold truncate">Overall Sales</h2>
      </div>

      <div className="w-full px-4 py-5 my-3 bg-white rounded-lg shadow">
        <div className="overflow-x-auto mt-2">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex justify-between items-start">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Sales</h3>
              <AddSaleModal storesData={storesData} productsData={productsData} fetchSales={fetchSales} />
            </div>

            <div className="mt-5 shadow-sm border rounded-lg overflow-x-auto">
              <table className="w-full table-auto text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                  <tr>
                    <th className="py-3 px-6">Sale ID</th>
                    <th className="py-3 px-6">Store Name</th>
                    <th className="py-3 px-6">Quantity</th>
                    <th className="py-3 px-6">No. Of Products</th>
                    <th className="py-3 px-6">Total Amount</th>
                    <th className="py-3 px-6">Added Date</th>
                    <th className="py-3 px-6">Modified Date</th>
                    <th className="py-3 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                  {salesData.length > 0 ? (
                    salesData.map((item) => (
                      <tr key={item._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{item._id?.slice(-6) || "N/A"}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.store_id?.name || "N/A"}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item?.quantity?.length > 0
                            ? `${item?.quantity?.join(", ")} (${item?.quantity?.reduce((acc, cur) => acc + cur, 0)})`
                            : "0"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.products_id?.length || "0"}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item?.total_sale_amount || "0"}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item?.createdAt?.slice(0, 10) || "N/A"}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item?.updatedAt?.slice(0, 10) || "N/A"}</td>
                        <td className="text-right px-6 whitespace-nowrap">
                          <button
                            onClick={() => handleUpdateClick(item)}
                            className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 hover:bg-gray-50 rounded-lg"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteProduct(item._id)}
                            className="py-2 px-3 font-medium text-red-600 hover:text-red-500 hover:bg-gray-50 rounded-lg"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-gray-500">No Sales Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {selectedSale && (
        <UpdateSaleModal
          open={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          sale={selectedSale}
          storesData={storesData}
          productsData={productsData}
          fetchSales={fetchSales}
        />
      )}
    </>
  );
}
