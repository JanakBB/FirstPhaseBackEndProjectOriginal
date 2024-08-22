import Product from "../components/Product";
// import products from "../data";s
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../slices/productSlice";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomePage = () => {
  const {pageNumber, keyword} = useParams();
  const { data, isLoading, error } = useGetProductsQuery({pageNumber, keyword});
  return (
    <>
    <Meta />
      {!keyword && <ProductCarousel />}
      {keyword ? <h2>Search Products</h2> : <h2>Latest Products</h2>}
      {isLoading ? (
        <h6>Loading...</h6>
      ) : error ? (
        <Message variant="danger">{error.data.error}</Message>
      ) : (
        <>
        <Row>
          {data.products.map((product) => (
            <Col sm={12} md={6} lg={4} xlg={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate pageNumber={data.pageNumber} pages={data.pages} keyword={keyword ? keyword : ""}/>
        </>
      )}
    </>
  );
};

export default HomePage;
