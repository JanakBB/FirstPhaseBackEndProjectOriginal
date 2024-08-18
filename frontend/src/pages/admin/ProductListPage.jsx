import { Button, Col, Row, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import {
  useAddPfoductMutation,
  useGetProductsQuery,
} from "../../slices/productSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ProductListPage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [addProduct, { isLoading: productLoading }] = useAddPfoductMutation();

  const addProductHandler = async () => {
    try {
      let resp = await addProduct().unwrap();
      toast.success(resp.message);
    } catch (err) {
      toast.error(err.data.error);
    }
  };
  return (
    <>
      <Row className="align-item-center mb-3">
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className="text-end">
          <Button variant="dark" size="sm" onClick={addProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <h6>Loading...</h6>
      ) : error ? (
        <Message variant="danger">{error.data.error}</Message>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.countInStock}</td>
                <td>
                  <Button
                    size="sm"
                    variant="light"
                    as={Link}
                    to={`/admin/product/${product._id}/edit`}
                  >
                    <FaEdit />
                  </Button>
                  <Button size="sm" variant="danger" className="mx-2">
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListPage;
