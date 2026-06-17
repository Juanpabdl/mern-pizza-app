import {useGetMyOrders} from "../api/orderAPI";
import OrderStatusCard from "../components/OrderStatusCard";
import OrderStatusDetail from "../components/OrderStatusDetail";

const OrderStatusPage = () => {
    const {orders, isPending} = useGetMyOrders();

    if (isPending) {
        return <p>Loading...</p>;
    }

    if(!orders || orders?.length === 0) {
        return <p>No orders found.</p>;
    }

    return (
        <div className="space-y-10">
            {orders.map((order) => (
                <div key={order._id} className="space-y-10 bg-gray-50 p-10 rounded-lg">
                    <OrderStatusCard order={order} />
                    <div className="grid gap-10 md:grid-cols-2">
                        <OrderStatusDetail order={order} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OrderStatusPage;