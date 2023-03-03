import { productMethod } from "../models/product.js";

const store = new productMethod();

export const showProduct = async (req, res) => {
  const result = await store.show();

  res.send(result);
};

export const createProduct = async (req, res) => {
  const result = await store.create(req.body);

  res.json(result);
};

export const deleteProduct = async (req, res) => {
  const result = await store.Delete(req.params.id);

  res.json(result);
};

export const deleteAllProduct = async (req, res) => {
  const result = await store.deleteAll();

  res.json(result);
};

export const updateProduct = async (req, res) => {
  const result = await store.update(req.body.id, req.body.product);

  res.json(result);
};
