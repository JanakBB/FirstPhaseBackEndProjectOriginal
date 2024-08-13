import {useState} from "react"
import FormContainer from "../components/FormContainer"
import { Form, Button, FormGroup } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { saveShippingAddress } from "../slices/cartSlice"


const Shipping = () => {
    const {userInfo} = useSelector(state => state.auth);
    const {shippingAddress} = useSelector(state => state.cart)
    const [recipient, setRecipient] = useState(userInfo.name);
    const [address, setAddress] = useState(shippingAddress.address || "");
    const [city, setCity] = useState(shippingAddress.city || "");
    const [phone, setPhone] = useState(shippingAddress.phone || "");
    const dispatch = useDispatch();


    const submitHandler = (e) => {
        dispatch(saveShippingAddress({recipient, address, city, phone}))
        e.preventDefault();
    }

    return(
        <FormContainer>
            <h2>Shipping Address</h2>
            <Form onSubmit={submitHandler} className="my-4">
                <FormGroup controlId="recipient" className="my-2">
                    <Form.Label>Recipient Name</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Enter recipient"
                        value={recipient}
                        onChange={e => setRecipient(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="Centact" className="my-2">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Enter Contact"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="address" className="my-2">
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="house no./building/street/area"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="city" className="my-2">
                    <Form.Label>City</Form.Label>
                    <Form.Control 
                        type="text"
                        value={city}
                        placeholder="Province/City/District"
                        onChange={e => setCity(e.target.value)}
                    />
                </FormGroup>
                <Button type="submit" variant="dark" className="my-2">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default Shipping;