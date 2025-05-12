import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import axios from "axios";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  height: '80%',
  overflowY: 'auto',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UpdateSaleModal({
  open,
  onClose,
  sale,
  storesData,
  productsData,
  fetchSales
}) {
  const [formData, setFormData] = useState({
    products_id: sale.products_id,
    store_id: sale.store_id,
    quantity: sale.quantity,
    total_sale_amount: sale.total_sale_amount,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4000/sales/${sale._id}`, formData);
      fetchSales();
      onClose();
    } catch (error) {
      console.error("Error updating sale", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="update-sale-modal-title"
      aria-describedby="update-sale-modal-description"
    >
      <Box sx={style}>
        <Typography id="update-sale-modal-title" variant="h6" component="h2">
          Update Sale
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="store-label">Store</InputLabel>
          <Select
            labelId="store-label"
            id="store_id"
            name="store_id"
            value={formData.store_id}
            onChange={handleChange}
          >
            {storesData.map((store) => (
              <MenuItem key={store._id} value={store._id}>
                {store.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {formData.products_id.map((product, index) => (
          <FormControl fullWidth margin="normal" key={index}>
            <InputLabel id={`product-label-${index}`}>Product</InputLabel>
            <Select
              labelId={`product-label-${index}`}
              id={`products_id-${index}`}
              name={`products_id[${index}]`}
              value={formData.products_id[index]}
              onChange={handleChange}
            >
              {productsData.map((product) => (
                <MenuItem key={product._id} value={product._id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
        <TextField
          margin="normal"
          fullWidth
          id="quantity"
          label="Quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          id="total_sale_amount"
          label="Total Sale Amount"
          name="total_sale_amount"
          value={formData.total_sale_amount}
          onChange={handleChange}
        />
        <Button onClick={handleUpdate} variant="contained" color="primary">
          Update Sale
        </Button>
      </Box>
    </Modal>
  );
}
