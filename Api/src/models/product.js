import client from "../../database.js";

export class productMethod {
  async show() {
    const sql = `SELECT * FROM product`;
    const conn = await client.connect();
    const result = await conn.query(sql);
    conn.release();
    return result.rows;
  }

  async create(product = {}) {
    const sql = `INSERT INTO product (title,price,taxes,ads,discount,total,count,category)
Values
    ('${product.title}', ${product.price}, ${product.taxes}, ${product.ads}, ${product.discount}, ${product.total}, ${product.count}, '${product.category}') RETURNING * ;`;
    const conn = await client.connect();
    const result = await conn.query(sql);
    conn.release();
    return result.rows[0].id;
  }

  async Delete(id) {
    const sql = `DELETE FROM product WHERE id=${id} ; `;
    const conn = await client.connect();
    const result = await conn.query(sql);
    conn.release();
    return result;
  }
  async deleteAll() {
    const sql = `TRUNCATE TABLE product ;`;
    const conn = await client.connect();
    const result = await conn.query(sql);
    conn.release();
    return result;
  }
  async update(id, newProduct = {}) {
    const sql = `UPDATE product
    SET title = '${newProduct.title}', price = ${newProduct.price},
    taxes = ${newProduct.taxes},ads = ${newProduct.ads},discount = ${newProduct.discount},
    total = ${newProduct.total},count = ${newProduct.count},category = '${newProduct.category}'
    WHERE id = ${id};`;
    const conn = await client.connect();
    const result = await conn.query(sql);
    conn.release();
    return result;
  }
}
