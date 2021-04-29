import { useState, useEffect } from "react";

import { Spinner } from "../../components";
import { firebase } from "../../config";

function Home() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref("products")
      .on("value", res => {
        if (res.val()) {
          const rawData = res.val();
          const productArray = [];
          Object.keys(rawData).map(i => {
            productArray.push({ id: i, ...rawData[i] });
          });
          setProducts(productArray);
        }
      });
  }, []);

  const resetData = () => {
    setProductName("");
    setCategory("");
    setPrice("");
  };

  const onSubmit = e => {
    e.preventDefault();

    setIsLoading(true);

    const data = {
      product: productName,
      category: category,
      price: price,
    };

    firebase
      .database()
      .ref("products")
      .push(data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

    resetData();

    setIsLoading(false);
  };

  return (
    <div>
      <h2 className="text-center">Home</h2>
      <hr />
      <form>
        <div className="mb-3">
          <label htmlFor="product-name" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="product-name"
            placeholder="Type the product name"
            value={productName}
            onChange={e => setProductName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            placeholder="Type the category"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            placeholder="Type the product name"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ minWidth: "150px" }}
            onClick={e => onSubmit(e)}
          >
            {isLoading && <Spinner />}
            {!isLoading && "Save"}
          </button>
        </div>
      </form>
      <hr />
      <table className="table table-responsive">
        <thead>
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(i => {
            return (
              <tr key={i.id}>
                <td>{i.product}</td>
                <td>{i.category}</td>
                <td>{i.price}</td>
                <td>
                  <button type="button" className="btn btn-success btn-sm m-1">
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger btn-sm m-1">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
