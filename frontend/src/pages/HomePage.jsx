import Product from "../components/Product";
// import products from "../data";s
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../slices/productSlice";
import Message from "../components/Message";

const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
      <h2>Latest Products</h2>
      {isLoading ? (
        <h6>Loading...</h6>
      ) : error ? (<Message variant="danger">{error.data.error}</Message>) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xlg={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomePage;
