import {useSession} from 'next-auth/client'
import Link from 'next/link'
import Protected from '../Components/protected'
import Nav from '../Components/Nav'
import Order from '../models/order'
import dbconnect from '../middleware/dbconnect'

//Need to make protected dynamic

const Dashboard = (props) => {
    const orders = props.orders
    const [session,loading] = useSession()
    if(session){
        if(session.user.type === 'mechanic'){
            return(
                <div>
                    <Nav />
                    <div className="mechanic">
                        <img src={session.user.image} />
                        <div>
                            <p>{session.user.name}</p>
                            <p>{session.user.email}</p>
                        </div>
                        
                        
                    </div>
                    {orders && <div className="container">
                        {orders.map(order => {
                                return(
                                    <div className="order" key={order._id}>
                                        <div>
                                            <h1>Customer Information</h1>
                                            <p>Name: {order.customerName}</p>
                                            <p>Email: {order.email}</p>
                                            <p>Phone No:{order.phone}</p>
                                        </div>
                                        <div>
                                            <h1>Service Details</h1>
                                            <p>Vehicle: {order.vehicle}</p>
                                            <p>Price: {order.price}</p>
                                            <p>Service: {order.type}</p>
                                            <p>Area: {order.area}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>}
                        <style>{`
                            .mechanic{
                                width: 30vw;
                                margin: 5vmin auto;
                                display: flex;
                                font-family: sans-serif;
                                font-size: 1.2rem;
                                border: 1px solid rgb(240,240,240);
                            }
                            .mechanic img{
                                width: 10vw;
                                height: 10vw;
                            }
                            .mechanic div{
                                padding: 2vmin;
                            }
                            .order{
                                width: 80vw;
                                margin: 5vmin auto;
                                display: flex;
                                justify-content: space-around;
                                font-family: sans-serif;
                                font-size: 1.2rem;
                                border: 1px solid rgb(200,200,200);
                            }
                            .order h1{
                                font-size: 1.5rem;
                            }
                        `}
                        </style>
                </div>
            )  
        }
        return(
            <Protected message="You can only access this page if you are one of our registered mechanics." />
        );
    }
    return(
        <Protected message="You can only access this page if you are logged in." />
    )
}

export const getServerSideProps = async () => {
    await dbconnect()
    const data = await Order.find({type: 'Bike General Service'})
    console.log(data)
    return{
        props: {
            orders: JSON.parse(JSON.stringify(data))
        }
    }
}


export default Dashboard