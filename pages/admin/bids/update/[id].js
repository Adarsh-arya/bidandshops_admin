import apiRequest, { apiUrl, uploadFileRequest } from 'lib/makeApi';
import { errorToast, showAsyncToast, showAsyncToastError, showAsyncToastSuccess, successToast } from 'lib/showToast';
import { useEffect, useState } from 'react';
import { Form, Row, Col, Button, InputGroup, Stack, OverlayTrigger, Spinner } from 'react-bootstrap';
import Rating from "react-rating";
import Image from 'next/image';
import { useRouter } from 'next/router';
import makeApi from 'lib/makeApi';
import { setDateInpValue, setTimeInpValue } from 'lib/getVewDate';


function UpdateBid() {
    const router = useRouter()
    const [content, setContent] = useState({
        "title": "",
        "hintPrice": "",
        "image": "",
        "minPrice": "",
        "rating": 1,
        "desc": ""
    })

    const [timeStamp, setTimeStamp] = useState({
        "startDate": "",
        "startTime": "",
        "endDate": "",
        "endTime": "",
    });

    const [isSlide, setIsSlide] = useState({
        "isSlide": false,
        "slideImage": "",
    })

    useEffect(() => {
        if (router.query.id) {
            makeApi("/api/bid/" + router.query.id, "GET").then((data) => {
                setContent({
                    "title": data.title,
                    "hintPrice": data.hintPrice,
                    "minPrice": data.minPrice,
                    "image": data.image,
                    "desc": data.desc,
                    "inStock": data.inStock,
                    "rating": data.rating,
                });

                setTimeStamp({
                    "startDate": setDateInpValue(data.startDate),
                    "startTime": setTimeInpValue(data.startDate),
                    "endDate": setDateInpValue(data.endDate),
                    "endTime": setTimeInpValue(data.endDate),
                });
                setIsSlide({
                    "isSlide": data.isSlide,
                    "slideImage": data.slideImage,
                });
            }).catch((e) => {
                console.log(e);
                errorToast("Data Load Field!")
            })
        }


    }, [router])

    const uploadAfile = async (e, forslide = false) => {
        const file = e.target.files[0];
        const id = showAsyncToast("Uploading...");
        try {
            const data = await uploadFileRequest(file);

            if (forslide) {
                setIsSlide({ ...isSlide, "slideImage": data.filename })
            } else {
                setContent({ ...content, [e.target.name]: data.filename });
            }

            showAsyncToastSuccess(id, "Image Uploaded");
        } catch (error) {
            showAsyncToastError(id, error.response?.data.error || error.toString());
        }
    }

    const handelChange = (e) => {
        setContent({ ...content, [e.target.name]: e.target.value });
    }

    const handelTimeChange = (e) => {
        setTimeStamp({ ...timeStamp, [e.target.name]: e.target.value });
    }


    const constructDateTime = () => {
        const { startDate, startTime, endDate, endTime } = timeStamp;

        if (startDate && startTime && endDate && endTime) {
            const [year, month, day] = startDate.split('-').map(Number);
            const [hour, minute] = startTime.split(':').map(Number);

            const [endYear, endMonth, endDay] = endDate.split('-').map(Number);
            const [endHour, endMinute] = endTime.split(':').map(Number);

            const startDateTime = new Date(year, month - 1, day, hour, minute);
            const endDateTime = new Date(endYear, endMonth - 1, endDay, endHour, endMinute);
            return { startDateTime, endDateTime }
        } else {
            throw new Error('Please select all date and time values.');
        }
    };

    const validateFields = () => {
        const contentFields = Object.values(content);
        const timeStampFields = Object.values(timeStamp);
        if (
            contentFields.includes("") ||
            timeStampFields.includes("") ||
            Object.keys(content).length !== contentFields.length ||
            Object.keys(timeStamp).length !== timeStampFields.length
        ) {
            return false;
        }
        return true;
    };

    const submitForm = async () => {
        if (validateFields()) {
            const id = showAsyncToast("Updating Bid");
            try {
                const dates = constructDateTime();
                const addResponse = await apiRequest("/api/bid/" + router.query.id, "PATCH", {
                    ...content, ...isSlide, startDate: dates.startDateTime, endDate: dates.endDateTime
                });
                if (addResponse.success == false) {
                    showAsyncToastError(id, addResponse.error || addResponse.message || "Something Want Wrong...");
                } else {

                    showAsyncToastSuccess(id, addResponse.message || "Bid Successfully Update");
                }
            } catch (error) {
                showAsyncToastError(id, error.response?.data.error || error.toString() || "Something Want Wrong...");
            }
        } else {
            errorToast("Please Fill All Data");
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
            <h1 className="m-5">Update Bid</h1>
            <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group className="mb-3" >
                    <Form.Label>Product Image </Form.Label>
                    <Form.Control type="file" name='image' onChange={(e) => uploadAfile(e)} />
                    {content.image != "" ? <div className='m-2'>
                        <Image src={`${apiUrl}/${content.image}`} width={60} height={60} alt={content.image} />
                    </div> : null}
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" name="title" onChange={handelChange} value={content.title} />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>Product Min Bid Amount</Form.Label>
                            <Form.Control type="text" onChange={handelChange} value={content.minPrice} name="minPrice" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control type="number" onChange={handelChange} value={content.hintPrice} name="hintPrice" />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" >
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control type="text" name='desc' as="textarea" rows={3} onChange={handelChange} value={content.desc} />
                </Form.Group>


                <Row>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>Bid Start Date</Form.Label>
                            <Form.Control type="date" value={timeStamp.startDate} onChange={handelTimeChange} name="startDate" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>Bid Start Time</Form.Label>
                            <Form.Control type="time" value={timeStamp.startTime} onChange={handelTimeChange} name="startTime" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>Bid End Date</Form.Label>
                            <Form.Control type="date" value={timeStamp.endDate} onChange={handelTimeChange} name="endDate" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Form.Label>Bid End Time</Form.Label>
                            <Form.Control type="time" value={timeStamp.endTime} onChange={handelTimeChange} name="endTime" />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" >
                    <Form.Label>Product Rating</Form.Label>
                    <div>
                        <Rating
                            initialRating={content.rating || 0}
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
                        label="Add To App Slides"
                        checked={isSlide.isSlide}
                        onClick={(e) => setIsSlide({ isSlide: !isSlide.isSlide, slideImage: "" })}
                    />
                    <br />
                    {isSlide.isSlide ? <Form.Group className="mb-3" >
                        <Form.Label>Slide Image Image </Form.Label>
                        <Form.Control type="file" name='image' onChange={(e) => uploadAfile(e, true)} />
                        {isSlide.slideImage != "" ? <div className='m-2'>
                            <Image src={`${apiUrl}/${isSlide.slideImage}`} width={60} height={60} alt={isSlide.slideImage} />
                        </div> : null}
                    </Form.Group> : null}
                </Form.Group>
                <div className="d-grid gap-2 mt-5 mb-5">
                    <Button variant="primary" onClick={submitForm}>Update Bid</Button>
                </div>
            </Form>


        </div>
    )
}
export default UpdateBid