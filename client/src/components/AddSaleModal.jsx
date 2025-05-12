import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import Select from "react-tailwindcss-select";
import MultiSelectMenu from "./MultiSelectMenu";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AddSaleModal = ({ storesData, productsData, fetchSales }) => {
  const [showModal, setShowModal] = useState(false);
  const [salesdata, setSalesData] = useState({
    products_id: "",
    store_id: "",
    quantity: "",
    total_sale_amount: 0,
  });

  const options = productsData.map(({ _id, name }) => ({
    value: _id,
    label: name,
  }));

  const [products, setProduct] = useState(null);

  const addSales = async (e) => {
    e.preventDefault();
    console.log(salesdata);
    try {
      const res = await axios.post("http://localhost:4000/sales", salesdata);
      // console.log(res);
      setShowModal(false);
      setSalesData({
        products_id: "",
        store_id: "",
        quantity: "",
        total_sale_amount: 0,
      });
      fetchSales();
      alert("successful insert");
    } catch (error) {
      alert(error.response.data.error);

      console.log(error);
    }
  };

  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (e.target.tagName === "INPUT") {
      setSalesData({ ...salesdata, [name]: value });
    } else if (e.target.tagName === "TEXTAREA") {
      setSalesData({ ...salesdata, [name]: value });
    }
  };

  const handleOptionChange = (event) => {
    setSalesData({ ...salesdata, store_id: event.target.value });
  };

  const handleChange = (value) => {
    // console.log("value:", value);
    setProduct(value);
    setSalesData({ ...salesdata, products_id: value });
  };

  return (
    <>
      <button
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add Sale
      </button>
      {showModal ? (
        <>
          <div className=" flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full h-full max-w-md md:h-auto">
              <div className="relative bg-white rounded-lg shadow ">
                <section className="bg-white">
                  <div className="max-w-2xl px-4 py-8 mx-auto lg:py-10">
                    <div className="flex justify-between">
                      <h2 className="mb-4 text-xl font-bold text-gray-900">
                        Add product
                      </h2>
                      <button
                        type="button"
                        className=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                        onClick={() => setShowModal(false)}
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    <form action="#">
                      <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="my-dropdown"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                          >
                            Select an Store:
                          </label>
                          <select
                            id="my-dropdown"
                            value={salesdata.store_id}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            onChange={handleOptionChange}
                          >
                            <option>--Please choose an option--</option>
                            {storesData.map((item) => (
                              <option key={item._id} value={item._id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                          >
                            Selecte products
                          </label>
                          <Select
                            value={products}
                            onChange={handleChange}
                            isMultiple
                            options={options}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                          >
                            Add Quantity of Selected products
                          </label>
                          <input
                            type="text"
                            name="quantity"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            value={salesdata.quantity}
                            onChange={handleInputs}
                            placeholder="50, 60, 40"
                            required
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                          >
                            Total Sales Amount
                          </label>
                          <input
                            type="number"
                            name="total_sale_amount"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                            value={salesdata.total_sale_amount}
                            onChange={handleInputs}
                            placeholder="0"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-center space-x-4">
                        <button
                          type="submit"
                          className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                          onClick={addSales}
                        >
                          Add product
                        </button>
                      </div>
                    </form>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default AddSaleModal;
