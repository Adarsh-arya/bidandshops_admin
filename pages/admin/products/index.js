import ProductData from "components/productTabel"
import { useEffect, useState } from "react"
import makeApi from "lib/makeApi";
import { Spinner } from 'react-bootstrap';
function Products() {
    const [data, setData] = useState(null)

    const getProducts = async () => {
        const data = await makeApi("/api/products", "GET");
        setData(data)
    }

    useEffect(() => {
        getProducts();
    }, [])



    return (
        data == null ?
            <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "Center", alignItems: "center" }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
            : <ProductData data={data} />
    )
}
export default Products