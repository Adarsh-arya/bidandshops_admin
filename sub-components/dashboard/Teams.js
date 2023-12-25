// import node module libraries
import React from "react";
import Link from 'next/link';
import { Card, Table, Dropdown, Image } from 'react-bootstrap';
import { MoreVertical } from 'react-feather';

// import required data files
import TeamsData from "data/dashboard/TeamsData";
import { apiUrl } from "lib/makeApi";
import { viewDate } from "lib/getVewDate";

const Teams = ({ data }) => {


    return (
        <Card className="h-100">
            <Card.Header className="bg-white py-4">
                <h4 className="mb-0">New Users </h4>
            </Card.Header>
            <Table responsive className="text-nowrap">
                <thead className="table-light">
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Email Verified</th>
                        <th>Attempt Bid</th>
                        <th>Join Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td className="align-middle">
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <Image src={apiUrl + "/" + item.profile} alt="" className="avatar-md avatar rounded-circle" />
                                        </div>
                                        <div className="ms-3 lh-1">
                                            <h5 className=" mb-1">{item.name}</h5>
                                            <p className="mb-0">{item.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="align-middle">{item.isAllow ? "Active" : "Suspend"}</td>
                                <td className="align-middle">{item.isEmailVerify ? "Yes" : "NO"}</td>
                                <td className="align-middle">{item.bids.length} BID</td>

                                <td className="align-middle">{viewDate(item.date, true)}</td>

                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Card.Footer className="bg-white text-center">
                <Link href="/admin/users" className="link-primary">View All Users</Link>
            </Card.Footer>
        </Card>
    )
}

export default Teams