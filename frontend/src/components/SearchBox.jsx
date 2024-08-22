import {Form, Button} from "react-bootstrap";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SearchBox = () => {
    const {keyword: urlKeyword} = useParams();
    const [keyword, setKeyword] = useState(urlKeyword || "");

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/search/${keyword.trim()}`);
            setKeyword("");
        } else {
            navigate("/");
        }
    }

    return ( 
        <Form onSubmit={submitHandler} className="d-flex">
            <Form.Control 
                type="text" 
                placeholder="Search Products..."
                className="ms3 me-1"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
            ></Form.Control>
            <Button type="submit" variant="light">Search</Button>
        </Form>
     );
}
 
export default SearchBox;