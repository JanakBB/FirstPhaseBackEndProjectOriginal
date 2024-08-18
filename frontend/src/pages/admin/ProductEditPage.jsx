import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery, useUpdateProductMutation } from "../../slices/productSlice";
import FormContainer from "../../components/FormContainer";
import { Button, Form, FormGroup } from "react-bootstrap";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductEditPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState("");

  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const [updateProduct, {isLoading: productUpdateLoading}] = useUpdateProductMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setBrand(product.brand);
      setCategory(product.category);
      setPrice(product.price);
      setCountInStock(product.countInStock);
    }
  }, [product]);

  const updateProductHandler = async(e) => {
    e.preventDefault();
    try{
    let resp = await updateProduct({
        _id: product._id,
        name, 
        brand,
        category,
        price,
        countInStock,
        description,
    }).unwrap();
    toast.success(resp.message)
    navigate("/admin/products");
    } catch(err) {
        toast.error(err.data.error);
    }
  }

  return (
    <>
      {isLoading ? (
        <h6>Loading..</h6>
      ) : error ? (
        <Message variant="danger">{error.data.error}</Message>
      ) : (
        <FormContainer>
          <h3 className="mb-3">Edit Product</h3>
          <Form onSubmit={updateProductHandler}>
            <FormGroup controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="brand" className="my-2">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="category" className="my-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="price" className="my-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="countInStock" className="my-2">
              <Form.Label>Counnt In Stock</Form.Label>
              <Form.Control
                type="number"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="description" className="my-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
            <Button variant="dark" className="my-2" type="submit">Update</Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default ProductEditPage;
