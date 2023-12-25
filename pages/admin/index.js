// import node module libraries
import { Fragment, useEffect, useState } from "react";
import Link from 'next/link';
import { Container, Col, Row, Spinner } from 'react-bootstrap';

import { StatRightTopIcon } from "widgets";

import { ActiveProjects, Teams, TasksPerformance } from "sub-components";

import ProjectsStatsData from "data/dashboard/ProjectsStatsData";
import OrdersList from "sub-components/dashboard/OrdersList";
import makeApi from "lib/makeApi";
import { errorToast } from "lib/showToast";
import checkAuth from "lib/checkAuth";
import { useRouter } from "next/router";

const Home = () => {



    const [data, setData] = useState(null)

    useEffect(() => {
        makeApi("/api/admin/dashbord").then((data) => {
            setData(data);
        }).catch((e) => {
            console.log(e);
            errorToast(e.toString());
        })
    }, [],)

    if (data == null) {
        return <div style={{ width: "100%", height: "83vh", display: "flex", justifyContent: "Center", alignItems: "center" }}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    }


    return (
        <Fragment>
            <div className="bg-primary pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                <Row>
                    <Col lg={12} md={12} xs={12}>
                        {/* Page header */}
                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-2 mb-lg-0">
                                    <h3 className="mb-0  text-white">Projects</h3>
                                </div>
                                <div>
                                    <Link href="/admin/bids/addbid" className="btn btn-white">Create New Bid</Link>
                                </div>
                            </div>
                        </div>
                    </Col>
                    {ProjectsStatsData(data['count']).map((item, index) => {
                        return (
                            <Col xl={3} lg={6} md={12} xs={12} className="mt-6" key={index}>
                                <StatRightTopIcon info={item} />
                            </Col>
                        )
                    })}
                </Row>

                {/* Active Projects  */}
                <ActiveProjects data={data['activeBids']} />
                <OrdersList />

                <br />

                {/* Teams  */}
                <Teams data={data['users']} />



            </Container>
        </Fragment>
    )
}
export default Home;
