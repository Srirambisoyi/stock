import { useEffect, useState } from "react";
import axios from "axios";
import AddProductModal from "../components/AddProductModal";
import UpdateProductModal from "../components/UpdateProductModal";

export default function Inventory(params) {
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    fetchProducts();
    // console.log(productsData);
  }, []);

  const manufacturers = productsData.map((item) => {
    return item.manufacturer;
  });

  const TotalManufacturers = [...new Set(manufacturers)];

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/products");
      setProductsData(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const deleteProducts = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:4000/products/${id}`
      );
      fetchProducts();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
        <h2 className=" text-gray-800 font-semibold truncate">
          Overall Inventory
        </h2>
        <div className="mt-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="m-3 p-1">
            <h3 className="text-blue-500 font-semibold">Manufacturer</h3>
            <div className="text-gray-600 mt-1 font-semibold">
              {TotalManufacturers.length}
            </div>
          </div>
          <div className="m-3 p-1">
            <h3 className="text-orange-500 font-semibold">Total Products</h3>
            <div className="flex">
              <span className="mr-8">
                <div className="text-gray-600 mt-1 font-semibold">
                  {productsData.length}
                </div>
              </span>
              <span>
                <div className="text-gray-600 mt-1 font-semibold">Rs25000</div>
                <span className="text-gray-400 text-sm">Revenue</span>
              </span>
            </div>
          </div>
          <div className="m-3 p-1">
            <h3 className="text-purple-500 font-semibold">Top Selling</h3>
            <div className="flex">
              <span className="mr-8">
                <div className="text-gray-600 mt-1 font-semibold">5</div>
              </span>
              <span>
                <div className="text-gray-600 mt-1 font-semibold">Rs2500</div>
                <span className="text-gray-400 text-sm">Cost</span>
              </span>
            </div>
          </div>
          <div className="m-3 p-1">
            <h3 className="text-red-500 font-semibold">Low Stocks</h3>
            <div className="flex">
              <span className="mr-8">
                <div className="text-gray-600 mt-1 font-semibold">12</div>
                <span className="text-gray-400 text-sm">Ordered</span>
              </span>
              <span>
                <div className="text-gray-600 mt-1 font-semibold">2</div>
                <span className="text-gray-400 text-sm">Not in stock</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-5 my-3 bg-white rounded-lg shadow">
        {/* <div className="flex justify-between align-middle">
          <h2 className=" text-gray-800 font-semibold truncate">Products</h2>

          <div className="flex gap-8 align-middle">
            <div className="relative top-2 flex align-middle"></div>
          </div>
        </div> */}

        <div className="overflow-x-auto mt-2">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="items-start justify-between md:flex">
              <div className="max-w-lg">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                  Products
                </h3>
              </div>
              <div className="mt-3 md:mt-0 flex align-middle">
                <details className="group relative top-2 flex align-middle mr-4 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center gap-2 pb-1 text-gray-900 transition cursor-pointer">
                    <span className="text-sm font-medium"> Availability </span>

                    <span className="transition group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        // stroke-width="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          // stroke-linecap="round"
                          // stroke-linejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div className="z-50 group-open:absolute group-open:top-auto right-0 group-open:mt-2">
                    <div className="bg-white border border-gray-200 rounded w-96">
                      <header className="flex items-center justify-between p-4">
                        <span className="text-sm text-gray-700">
                          {" "}
                          0 Selected{" "}
                        </span>

                        <button
                          type="button"
                          className="text-sm text-gray-900 underline underline-offset-4"
                        >
                          Reset
                        </button>
                      </header>

                      <ul className="p-4 space-y-1 border-t border-gray-200">
                        <li>
                          <label
                            htmlFor="FilterInStock"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterInStock"
                              className="w-5 h-5 border-gray-300 rounded"
                            />

                            <span className="text-sm font-medium text-gray-700">
                              In Stock (5+)
                            </span>
                          </label>
                        </li>

                        <li>
                          <label
                            htmlFor="FilterPreOrder"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterPreOrder"
                              className="w-5 h-5 border-gray-300 rounded"
                            />

                            <span className="text-sm font-medium text-gray-700">
                              Pre Order (3+)
                            </span>
                          </label>
                        </li>

                        <li>
                          <label
                            htmlFor="FilterOutOfStock"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterOutOfStock"
                              className="w-5 h-5 border-gray-300 rounded"
                            />

                            <span className="text-sm font-medium text-gray-700">
                              Out of Stock (10+)
                            </span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </details>
                <AddProductModal fetchProducts={fetchProducts} />
              </div>
            </div>
            <div className="mt-5 shadow-sm border rounded-lg overflow-x-auto">
              <table className="w-full table-auto text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                  <tr>
                    <th className="py-3 px-6">Product ID</th>
                    <th className="py-3 px-6">Product Name</th>
                    <th className="py-3 px-6">Manufacturer</th>
                    <th className="py-3 px-6">Stock</th>
                    <th className="py-3 px-6">Added Date</th>
                    <th className="py-3 px-6">Modified Date</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                  {productsData.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item._id.slice(-6)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.manufacturer}
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
                        {/* <button className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                          Edit
                        </button> */}
                        <UpdateProductModal
                          pid={item._id}
                          pname={item.name}
                          pmanufacturer={item.manufacturer}
                          pstock={item.stock}
                          fetchProducts={fetchProducts}
                        />
                        <button
                          onClick={() => deleteProducts(item._id)}
                          className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Product ID
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                 Product Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Role
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Salary
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {productsData.map((data) =>
                console.log(data)
                // <tr>

                //   <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                //     {data.name}
                //   </td>
                //   <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                //     {data.category}
                //   </td>
                //   <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                //     Web Developer
                //   </td>
                //   <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                //     $120,000
                //   </td>
                // </tr>
              )}
              {/* <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Jane Doe
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  04/11/1980
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  Web Designer
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $100,000
                </td>
              </tr>

              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Gary Barlow
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  24/05/1995
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  Singer
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $20,000
                </td>
              </tr> 
            </tbody>
          </table> */}
        </div>
      </div>
    </>
  );
}
