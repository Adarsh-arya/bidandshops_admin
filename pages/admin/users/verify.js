// import node module libraries
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { Card, Table, Dropdown, Image, Spinner } from 'react-bootstrap';
import { MoreVertical } from 'react-feather';
import { showAsyncToast, showAsyncToastError, showAsyncToastSuccess, warnToast } from "lib/showToast";
import makeApi, { apiUrl } from "lib/makeApi";
import { viewDate } from "lib/getVewDate";

const Verify = () => {
    const [data, setData] = useState(null)
    const [update, setUpdate] = useState(null)


    const getUsers = async () => {
        const data = await makeApi("/api/users/verified", "GET");
        setData(data)
    }

    useEffect(() => {
        getUsers();
    }, [update])


    const blockUser = async (userid, isBlocked = false) => {
        const id = showAsyncToast(isBlocked ? "Unblocking User..." : "Blocking User...");
        try {
            const data = await makeApi("/api/user/" + userid, "PATCH");
            if (data.success == true) {
                showAsyncToastSuccess(id, data.message);
                setUpdate(data)
            } else {
                showAsyncToastError(id, data.error);
            }
        } catch (error) {
            showAsyncToastError(id, error.response?.data.error || "Block User Field!");
        }
    }

    const deleteUser = async (userid) => {
        const id = showAsyncToast("Deleting User...");
        try {
            const data = await makeApi("/api/user/" + userid, "DELETE");
            if (data.success == true) {
                showAsyncToastSuccess(id, data.message);
                setUpdate(data)
            } else {
                showAsyncToastError(id, data.error);
            }
        } catch (error) {
            showAsyncToastError(id, error.response?.data.error || "Delete User Field!");
        }
    }


    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        (<Link
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="text-muted text-primary-hover">
            {children}
        </Link>)
    ));

    CustomToggle.displayName = 'CustomToggle';


    if (data == null) {
        return <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "Center", alignItems: "center" }}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    }

    const ActionMenu = ({ id, isBlocked }) => {
        return (
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                    <MoreVertical size="15px" className="text-muted" />
                </Dropdown.Toggle>
                <Dropdown.Menu align={'end'}>
                    <Dropdown.Item eventKey="1" onClick={() => blockUser(id, isBlocked)}>
                        {isBlocked ? "Block User" : "Unblock User"}
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => deleteUser(id)}>
                        Delete User
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    return (
        <Card >
            <Card.Header className="bg-white py-4">
                <h4 className="mb-0">New Users </h4>
            </Card.Header>
            <Table className="text-nowrap h-100">
                <thead className="table-light">
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Email Verified</th>
                        <th>Total Bids</th>
                        {/* <th>Total Orders</th> */}
                        <th>Join Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {(data == null || data.length == 0) ? <p className="p-5">No Verified Users Found!</p> : data.map((item, index) => {
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
                                <td className="align-middle">{item.isAllow ? "Active" : "Suspended"}</td>
                                <td className="align-middle">{(item.isEmailVerify && item.isMobileVerify) ? "Yes" : "NO"}</td>
                                <td className="align-middle">{item.bids.length} BID</td>
                                <td className="align-middle">{viewDate(item.date)}</td>

                                <td className="align-middle">
                                    <ActionMenu id={item._id} isBlocked={item.isAllow} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

        </Card>
    )
}

export default Verify