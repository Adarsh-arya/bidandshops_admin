// import node module libraries
import Link from 'next/link';
import { ProgressBar, Col, Row, Card, Table, Image } from 'react-bootstrap';

// import required data files
import ActiveProjectsData from "data/dashboard/ActiveProjectsData";

const OrdersList = () => {
    return (
        <Row className="mt-6 text-center">
            <Col md={12} xs={12}>
                <Card>
                    <Card.Header className="bg-white  py-4">
                        <h4 className="mb-0">New Orders</h4>
                    </Card.Header>
                    <Table responsive className="text-nowrap mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Product name</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ActiveProjectsData.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="align-middle">
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <div className={`icon-shape icon-md border p-4 rounded-1 ${item.brandLogoBg}`}>
                                                        <Image src={item.brandLogo} alt="" />
                                                    </div>
                                                </div>
                                                <div className="ms-3 lh-1">
                                                    <h5 className=" mb-1">
                                                        <Link href="#" className="text-inherit">Sourav Bapari</Link></h5>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">Sourav</td>
                                        <td className="align-middle">10, State, Delhi , 202020</td>
                                        <td className="align-middle">
                                            Kolkata
                                        </td>
                                        <td className="align-middle">{item.progress} Bid</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Card.Footer className="bg-white text-center">
                        <Link href="#" className="link-primary">View All Bids</Link>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    )
}

export default OrdersList