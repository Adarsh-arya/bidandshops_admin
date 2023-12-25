// import node module libraries
import Link from 'next/link';
import { ProgressBar, Col, Row, Card, Table, Image, Dropdown, Spinner } from 'react-bootstrap';

// import required data files
import ActiveProjectsData from "data/dashboard/ActiveProjectsData";
import React, { useEffect, useState } from 'react';
import makeApi, { apiUrl } from 'lib/makeApi';
import { viewDate } from 'lib/getVewDate';




const Bids = () => {

    const [data, setData] = useState(null)

    const getBids = async () => {
        try {
            const data = await makeApi("/api/allbids", "GET");
            setData(data)
        } catch (error) {
            setData([])
        }
    }

    useEffect(() => {
        getBids();
    }, [])

    if (data == null) {
        return <div style={{ width: "100%", height: "83vh", display: "flex", justifyContent: "Center", alignItems: "center" }}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    }

    return (
        <Row className=" text-center">
            <Col md={12} xs={12}>
                <Card>
                    <Card.Header className="bg-white  py-4">
                        <h4 className="mb-0">All Bids</h4>
                    </Card.Header>
                    <Table responsive className="text-nowrap mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Product name</th>
                                <th>Time Durations</th>
                                <th>Unique Bid</th>
                                <th>Bid Winner</th>
                                <th>Total Bids</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="align-middle">
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <div className={`icon-shape icon-md border p-4 rounded-1 ${item.brandLogoBg}`}>
                                                        <Image src={apiUrl + "/" + item.image} alt="" width={40} height={40} />
                                                    </div>
                                                </div>
                                                <div className="ms-3 lh-1">
                                                    <h5 className=" mb-1">
                                                        <Link href="#" className="text-inherit">{item.title}</Link></h5>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">{viewDate(item.startDate)} - {viewDate(item.endDate)}</td>
                                        <td className="align-middle">{item.winData == null ? "No Winner" : item.winData.amountData.amount + " RS"}</td>
                                        <td className="align-middle">
                                            <div className="avatar-group">
                                                {
                                                    item.winData == null ?
                                                        <> No Winner</>
                                                        : <span className="avatar avatar-sm" >
                                                            <Image alt="avatar" src={apiUrl + "/" + item.winData.profile.profile} className="rounded-circle" />
                                                        </span>
                                                }
                                            </div>
                                        </td>
                                        <td className="align-middle"><Link href={"/admin/bids/users/" + item._id}>{item.users.length} Bid</Link></td>
                                        <td className="align-middle">
                                            <Link href={"/admin/bids/update/" + item._id}>Update</Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>

                </Card>
            </Col>
        </Row>
    )
}

export default Bids