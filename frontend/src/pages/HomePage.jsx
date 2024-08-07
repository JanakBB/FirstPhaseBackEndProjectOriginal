import Product from "../components/Product";
// import products from "../data";s
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../slices/productSlice";

const HomePage = () => {
  const { data: products, isLoading, err } = useGetProductsQuery();
  console.log(products);
  return (
    <>
      <h2>Latest Products</h2>
      {isLoading ? (
        <h6>Loading...</h6>
      ) : (
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
