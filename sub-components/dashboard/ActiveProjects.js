// import node module libraries
import Link from 'next/link';
import { ProgressBar, Col, Row, Card, Table, Image } from 'react-bootstrap';

// import required data files
import { apiUrl } from 'lib/makeApi';
import { viewDate } from 'lib/getVewDate';

const ActiveProjects = ({ data }) => {
    return (
        <Row className="mt-6 text-center">
            <Col md={12} xs={12}>
                <Card>
                    <Card.Header className="bg-white  py-4">
                        <h4 className="mb-0">Active Bids</h4>
                    </Card.Header>
                    <Table responsive className="text-nowrap mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Product name</th>
                                <th>Time Durations</th>
                                <th>Unique Bid</th>
                                <th>Bid User</th>
                                <th>Total Bids</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length == 0 ? <p className='mt-5'>No Bids Active Now</p> : data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="align-middle">
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <div className={`icon-shape icon-md border p-4 rounded-1 bg-white`}>
                                                        <Image src={apiUrl + "/" + item['image']} alt="" width={40} height={40} />
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
                                                    item.winData == null ? "No Winner" : <span className="avatar avatar-sm" >
                                                        <Image alt="avatar" src={apiUrl + "/" + item.winData.profile.profile} className="rounded-circle" width={45} height={45} />
                                                    </span>
                                                }
                                            </div>
                                        </td>
                                        <td className="align-middle"><Link href={"/admin/bids/users/" + item._id}>{item.users.length} Bid</Link></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Card.Footer className="bg-white text-center">
                        <Link href="/admin/bids" className="link-primary">View All Bids</Link>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    )
}

export default ActiveProjects