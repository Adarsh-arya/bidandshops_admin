import apiRequest, { apiUrl, uploadFileRequest } from 'lib/makeApi';
import { errorToast, showAsyncToast, showAsyncToastError, showAsyncToastSuccess, successToast } from 'lib/showToast';
import { useEffect, useState } from 'react';
import { Form, Row, Col, Button, InputGroup, Stack, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import Rating from "react-rating";
import Image from 'next/image';
import { useRouter } from 'next/router'
import makeApi from 'lib/makeApi';

function AddProduct() {
    const router = useRouter()


    const [content, setContent] = useState({
        "title": "",
        "hintPrice": "",
        "price": "",
        "image": "",
        "description": "",
        "inStock": true,
        "rating": 1,
    })
    const [gallery, setgallery] = useState([]);
    const [specs, setSpecs] = useState([{
        title: "",
        value: ""
    }]);

    useEffect(() => {
        if (router.query.id) {
            makeApi("/api/product/" + router.query.id, "GET").then((data) => {
                setContent({
                    "title": data.title,
                    "hintPrice": data.hintPrice,
                    "price": data.price,
                    "image": data.image,
                    "description": data.description,
                    "inStock": data.inStock,
                    "rating": data.rating,
                });
                setgallery(data.gallery || []);
                setSpecs(data.specs || [{
                    title: "",
                    value: ""
                }]);
            }).catch((e) => {
                errorToast("Data Load Field!")
            })
        }


    }, [router])




    const addSpacs = () => {
        setSpecs([...specs, {
            title: "",
            value: ""
        }])
    }

    const removeSpecByIndex = (indexToRemove) => {
        setSpecs(prevSpecs => {
            const updatedSpecs = [...prevSpecs];
            if (indexToRemove >= 0 && indexToRemove < updatedSpecs.length) {
                updatedSpecs.splice(indexToRemove, 1);
            }
            return updatedSpecs;
        });
    }

    const handleSpecChange = (index, key, updatedValue) => {
        setSpecs(prevSpecs => {
            const updatedSpecs = [...prevSpecs];
            if (index >= 0 && index < updatedSpecs.length) {
                updatedSpecs[index] = {
                    ...updatedSpecs[index],
                    [key]: updatedValue
                };
            }
            return updatedSpecs;
        });
    }

    const handelChange = (e) => {
        setContent({ ...content, [e.target.name]: e.target.value });
    }

    const uploadAfile = async (e) => {
        const file = e.target.files[0];
        const id = showAsyncToast("Uploading...");
        try {
            const data = await uploadFileRequest(file);
            if (e.target.name == "image") {
                setContent({ ...content, [e.target.name]: data.filename });
            } else {
                setgallery([...gallery, data.filename]);
            }
            showAsyncToastSuccess(id, "Image Uploaded");
        } catch (error) {
            showAsyncToastError(id, error.response?.data.error || error.toString());
        }

    }

    const removeImageByIndex = (indexToRemove) => {
        setgallery(prevSpecs => {
            const updateGallery = [...prevSpecs];
            if (indexToRemove >= 0 && indexToRemove < updateGallery.length) {
                updateGallery.splice(indexToRemove, 1);
            }
            return updateGallery;
        });
    }


    const validateContent = (content) => {
        return (
            content.title.trim() !== "" &&
            content.hintPrice !== "" &&
            content.price !== "" &&
            content.image.trim() !== "" &&
            content.description.trim() !== ""
            // You can add more specific validations as needed
        );
    };

    const validateGallery = (gallery) => {
        return gallery.length > 0; // Gallery should have at least one image
    };

    const validateSpecs = (specs) => {
        return specs.every(spec => spec.title.trim() !== "" && spec.value.trim() !== "");
    };

    const validateAll = () => {
        const isContentValid = validateContent(content);
        const isGalleryValid = validateGallery(gallery);
        const isSpecsValid = validateSpecs(specs);

        return isContentValid && isGalleryValid && isSpecsValid;
    };


    const submitForm = async () => {
        if (validateAll()) {
            const id = showAsyncToast("Updating Product");
            try {

                const addResponse = await apiRequest("/api/product/" + router.query.id, "PATCH", {
                    ...content, gallery, specs
                });
                if (addResponse.success == false) {
                    showAsyncToastError(id, addResponse.error || addResponse.message || "Something Want Wrong...");
                } else {

                    showAsyncToastSuccess(id, addResponse.message)
                }
            } catch (error) {
                showAsyncToastError(id, error.response?.data.error || error.toString() || "Something Want Wrong...");
            }
        } else {
            errorToast("Enter All Required Data Data")
        }

    }


    if (content.title == "") {
        return <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "Center", alignItems: "center" }}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    }

    return (
        <div className="container">
            <h1 className='mt-3 mb-3' >Update Product</h1>

            <Form>
                <Form.Group className="mb-3" >
                    <Form.Label>Product Preview Image</Form.Label>
                    <Form.Control type="file" name='image' onChange={(e) => uploadAfile(e)} />
                    {content.image != "" ? <div className='m-2'>
                        <Image src={`${apiUrl}/${content.image}`} width={60} height={60} alt={content.image} />
                    </div> : null}
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" name='title' value={content.title} onChange={(e) => handelChange(e)} />
                </Form.Group>

                <Row className="mb-3">
                    <Col>
                        <Form.Label>Product Hint Price</Form.Label>
                        <Form.Control type="number" name='hintPrice' value={content.hintPrice} onChange={(e) => handelChange(e)} />
                    </Col>
                    <Col>
                        <Form.Label>Product Sell Price</Form.Label>
                        <Form.Control type="number" name='price' value={content.price} onChange={(e) => handelChange(e)} />
                    </Col>
                </Row>
                <Form.Group className="mb-3" >
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control type="text" name='description' as="textarea" rows={3} value={content.description} onChange={(e) => handelChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Gallery Images</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Gallery Images"
                            type="file"
                            name='gallery'
                            onChange={(e) => uploadAfile(e)}
                        />

                    </InputGroup>
                    {gallery.length != 0 ?
                        <Row>
                            {
                                gallery.map((e, i) => {
                                    return <Col md={1}>
                                        <OverlayTrigger
                                            key={"placement-" + i}
                                            overlay={
                                                <Tooltip id={`tooltip-${i}`}>
                                                    Click To Remove
                                                </Tooltip>
                                            }
                                        >
                                            <div className='m-2' onClick={() => { removeImageByIndex(i) }} style={{ cursor: "pointer" }}>
                                                <Image src={`${apiUrl}/${e}`} width={60} height={60} alt={content.image} />
                                            </div>
                                        </OverlayTrigger>
                                    </Col>
                                })
                            }
                        </Row>
                        : null}
                </Form.Group>
                <h4 className='mt-5'>Product specification's</h4>
                {
                    specs.map((e, i) => {
                        return <Row className="mb-3" key={"specs-" + i}>
                            <Form.Group as={Col} >
                                <Form.Label>Specification</Form.Label>
                                <Form.Control type="text"
                                    placeholder='Ram'
                                    value={e.title}
                                    onChange={(e) => handleSpecChange(i, "title", e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Value</Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="120 GB"
                                        value={e.value}
                                        onChange={(e) => handleSpecChange(i, "value", e.target.value)}
                                    />
                                    {i != 0 ? <InputGroup.Text
                                        className='bg-danger text-light'
                                        style={{ cursor: "pointer" }}
                                        onClick={() => removeSpecByIndex(i)}
                                    >Remove</InputGroup.Text> : null}
                                </InputGroup>
                            </Form.Group>
                        </Row>
                    })
                }
                <Stack direction="horizontal" gap={3}>
                    <div></div>
                    <div className="ms-auto">
                        <Button className="me-1" variant="primary" onClick={addSpacs} >+</Button>
                    </div>
                </Stack>

                <Form.Group className="mb-3" >
                    <Form.Label>Product Rating</Form.Label>
                    <div>
                        <Rating
                            initialRating={content.rating}
                            readonly={false}
                            emptySymbol={<i className='fe fe-star'></i>}
                            fullSymbol={<i style={{ color: 'red' }} className='fe fe-star'></i>}
                            onChange={(v) => setContent({ ...content, "rating": v })}
                        />
                    </div>
                    <br />
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="In Stock"
                        value={content.inStock}
                        checked={content.inStock}
                        onClick={() => setContent({ ...content, "inStock": !content.inStock })}
                    />

                </Form.Group>
                <div className="d-grid gap-2 mt-5 mb-5">
                    <Button variant="primary" onClick={submitForm} >Update Product</Button>
                </div>
            </Form>
        </div >
    )
}
export default AddProduct