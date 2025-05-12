import { useState, useEffect } from "react";
import axios from "axios";
import AddStore from "../components/AddStore";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';


export default function ManageStores() {
  const [storesData, setStoresData] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await axios.get("http://localhost:4000/stores");
      setStoresData(res.data);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const handleEditOpen = (store) => {
    setSelectedStore(store);
    setEditOpen(true);
  };

  const handleDeleteOpen = (store) => {
    setSelectedStore(store);
    setDeleteOpen(true);
  };

  const handleClose = () => {
    setEditOpen(false);
    setDeleteOpen(false);
    setSelectedStore(null);
  };

  return (
    <div className="w-full px-4 py-5 my-3 bg-white rounded-lg shadow">
      <div className="flex justify-between align-middle">
        <h2 className="text-gray-800 font-semibold truncate">Manage Stores</h2>
        <AddStore fetchStores={fetchStores} />
      </div>
      <div>
        {storesData.map((store) => (
          <div
            key={store._id}
            className="flex flex-col rounded-lg bg-white shadow-lg w-full my-4 md:flex-row"
          >
            <img
              className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
              src="http://clipart-library.com/image_gallery/n748527.gif"
              alt="Store"
            />
            <div className="flex flex-col justify-start p-6">
              <h5 className="mb-2 text-3xl font-bold text-neutral-800">
                {store.name}
              </h5>
              <p className="mb-4 text-base text-neutral-600">
                {store.address}
              </p>
              <span className="text-2xl font-semibold inline-block text-teal-500">
                Cost {store.cost}
              </span>
              <span className="text-2xl font-semibold inline-block text-teal-500">
                Sell {store.sell}
              </span>
              <div className="flex mt-4">
                <button
                  className="mr-2 px-4 py-2 text-white bg-blue-500 rounded"
                  onClick={() => handleEditOpen(store)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 text-white bg-red-500 rounded"
                  onClick={() => handleDeleteOpen(store)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedStore && (
        <>
          <EditStoreModal
            open={editOpen}
            handleClose={handleClose}
            store={selectedStore}
            fetchStores={fetchStores}
          />
          <DeleteStoreModal
            open={deleteOpen}
            handleClose={handleClose}
            store={selectedStore}
            fetchStores={fetchStores}
          />
        </>
      )}
    </div>
  );
}


function EditStoreModal({ open, handleClose, store, fetchStores }) {
  const [name, setName] = useState(store.name);
  const [address, setAddress] = useState(store.address);
  const [cost, setCost] = useState(store.cost);
  const [sell, setSell] = useState(store.sell);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:4000/stores/${store._id}`, { name, address, cost, sell });
      fetchStores();
      handleClose();
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Store</DialogTitle>
      <DialogContent>
        <TextField margin="dense" label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
        <TextField margin="dense" label="Address" fullWidth value={address} onChange={(e) => setAddress(e.target.value)} />
        <TextField margin="dense" label="Cost" fullWidth value={cost} onChange={(e) => setCost(e.target.value)} />
        <TextField margin="dense" label="Sell" fullWidth value={sell} onChange={(e) => setSell(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

 function DeleteStoreModal({ open, handleClose, store, fetchStores }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/stores/${store._id}`);
      fetchStores();
      handleClose();
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Store</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete {store.name}?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

