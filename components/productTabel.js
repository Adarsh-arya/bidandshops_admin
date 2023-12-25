// import node module libraries
import Link from 'next/link';
import { ProgressBar, Col, Row, Card, Table, Image } from 'react-bootstrap';

// import required data files
import ActiveProjectsData from "data/dashboard/ActiveProjectsData";
import { apiUrl } from 'lib/makeApi';

const ProductData = ({ data }) => {
    return (
        <Row className=" text-center">
            <Col md={12} xs={12}>
                <Card>
                    <Card.Header className="bg-white  py-4">
                        <h4 className="mb-0">Our Products</h4>
                    </Card.Header>
                    <Table responsive className="text-nowrap mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Product name</th>
                                <th>In Stock</th>
                                <th>Total Orders</th>
                                <th>Price</th>
                                <th>Action</th>
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
                                        <td className="align-middle">{item.inStock ? "Yes" : "NO"}</td>
                                        <td className="align-middle">No Integrate this</td>
                                        <td className="align-middle">
                                            <span style={{ textDecorationLine: "line-through", fontSize: 12, color: "#ddd" }}> ₹{item.hintPrice}</span>   ₹{item.price}
                                        </td>
                                        <td className="align-middle">
                                            <Link href={`/admin/products/update/${item._id}`}>Update</Link>
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

export default ProductData