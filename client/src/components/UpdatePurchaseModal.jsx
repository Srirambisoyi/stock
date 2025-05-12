import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const UpdatePurchaseModal = ({ isOpen, onClose, purchase, fetchProducts }) => {
  const [formData, setFormData] = useState({
    productName: "",
    totalPurchaseAmount: "",
    stock: "",
  });

  useEffect(() => {
    if (purchase) {
      setFormData({
        productName: purchase.product_id.name,
        totalPurchaseAmount: purchase.total_purchase_amount,
        stock: purchase.stock,
      });
    }
  }, [purchase]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/purchase/${purchase._id}`, formData);
      fetchProducts();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" mb={2}>
          Update Purchase
        </Typography>
        <TextField
          fullWidth
          label="Product Name"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Total Purchase Amount"
          name="totalPurchaseAmount"
          value={formData.totalPurchaseAmount}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Update
        </Button>
      </Box>
    </Modal>
  );
};

export default UpdatePurchaseModal;
