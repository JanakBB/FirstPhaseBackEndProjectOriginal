import {
  Col,
  Row,
  Image,
  ListGroup,
  Button,
  Form,
  FormGroup,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import {
  useAddReviewMutation,
  useCheckReviewStatusQuery,
  useGetProductByIdQuery,
} from "../slices/productSlice";
import Message from "../components/Message";
import { toast } from "react-toastify";
import Meta from "../components/Meta";

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductByIdQuery(id);
  const {
    data: reviewStatus,
    isLoading: reviewStatusLoading,
    error: reviewStatusError,
  } = useCheckReviewStatusQuery(id);
  const [addReview, { isLoading: reviewLoading }] = useAddReviewMutation();

  const addToCartHandler = (item) => {
    dispatch(addToCart(item));
    navigate("/cart");
  };

  const addReviewHandler = async (e) => {
    e.preventDefault();
    try {
      let resp = await addReview({
        _id: product._id,
        rating,
        comment,
      }).unwrap();
      toast.success(resp.message);
    } catch (err) {
      toast.error(err.data.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <h6>Loading...</h6>
      ) : error ? (
        <Message variant="danger">{error.data.error}</Message>
      ) : (
        <>
        <Meta title={product.name} description={product.description}/>
          <Row>
            <Col md={5}>
              <Image src={String(product.image)} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5>Price ${product.price}</h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={product.numReviews} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <span>{product.description}</span>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0
                          ? `In Stock(${product.countInStock})`
                          : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Control
                    as="select"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    variant="secondary"
                    disabled={product.countInStock === 0}
                    onClick={() =>
                      addToCartHandler({ ...product, qty: Number(qty) })
                    }
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className="my-3">
            <Col md={6} className="reviews">
              <h2>Customer Reviews</h2>
              {product.reviews.length > 0 ? (
                <>
                  {product.reviews.map((review) => (
                    <>
                      <span>{review.name}</span>
                      <Rating value={review.rating} />
                      <p>{review.comment}</p>
                    </>
                  ))}
                </>
              ) : (
                <Message>No reviews yet</Message>
              )}
              {reviewStatusLoading ? (
                <h1>Loading...</h1>
              ) : reviewStatusError ? (
                <Message>{reviewStatusError.data.error}</Message>
              ) : reviewStatus.canBeReviewed ? (
                <>
                  <h2>Write Customer Review</h2>

                  <Form onSubmit={addReviewHandler}>
                    <FormGroup controlId="rating" className="my-3">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value={0}>Select Rating ...</option>
                        <option value={1}>1 - Poor</option>
                        <option value={2}>2 - Satisfy</option>
                        <option value={3}>3 - Good</option>
                        <option value={4}>4 - Very Good</option>
                        <option value={5}>5 - Excellent</option>
                      </Form.Control>
                    </FormGroup>
                    <FormGroup controlId="comment" className="my-3">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </FormGroup>
                    <Button type="submit" variant="dark">
                      Add
                    </Button>
                  </Form>
                </>
              ) : (
                <Message>You cannot add review</Message>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductPage;
