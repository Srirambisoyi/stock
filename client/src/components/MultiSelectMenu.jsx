import { useState } from "react";
import Select from "react-tailwindcss-select";

const MultiSelectMenu = ({
  selectedProducts,
  quantities,
  onProductSelection,
  onQuantityChange,
}) => {
  const products = [
    { id: 1, name: "Product A" },
    { id: 2, name: "Product B" },
    { id: 3, name: "Product C" },
  ];

  const handleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      onProductSelection(selectedProducts.filter((id) => id !== productId));
    } else {
      onProductSelection([...selectedProducts, productId]);
    }
  };

  const handleQuantityChange = (productId, value) => {
    onQuantityChange({ ...quantities, [productId]: value });
  };

  const options = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));

  const selectedOptions = selectedProducts.map((id) =>
    options.find((option) => option.value === id)
  );

  return (
    <div className="flex flex-col gap-4">
      <Select
        label="Select Products"
        isMulti
        options={options}
        value={selectedOptions}
        onChange={(selected) => {
          onProductSelection(selected.map((option) => option.value));
        }}
      />
      {selectedProducts.map((productId) => (
        <div
          key={productId}
          className="flex items-center justify-between border-b border-gray-300 pb-2"
        >
          <span>{products.find((p) => p.id === productId).name}</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Quantity:</span>
            <input
              type="number"
              min={0}
              value={quantities[productId] || ""}
              onChange={(e) =>
                handleQuantityChange(productId, parseInt(e.target.value, 10))
              }
              className="w-16 px-2 py-1 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultiSelectMenu;
