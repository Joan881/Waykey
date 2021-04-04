import {useSession} from 'next-auth/client'
import Link from 'next/link'
import Protected from '../Components/protected';
import {useState} from 'react'
import {useRouter} from 'next/router'
import Nav from '../Components/Nav'

const BookService = () => {
    const [session,loading] = useSession();
    const [area,setArea] = useState('');
    const [phone,setPhone] = useState('');
    const [vehicle,setVehicle] = useState('');
    const [message,setMessage] = useState({});
    const Router = useRouter()
    const postData = async () => {
        const {name,email,image} = session.user
        const res = await fetch('/api/book',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({customerName: name,customerImage: image,email,price: 999,phone,area,vehicle})
        })
        const response = await res.json();
        return response
        
    }
    const onFormSubmit = async (e) => {
        e.preventDefault();
        const resMessage = await postData();
        setMessage(resMessage)
    }
    const onPhoneInput = (e) => {
        setPhone(e.target.value)
    }
    const onVehicleInput = (e) => {
        setVehicle(e.target.value)
    }
    const onPlaceInput = (e) => {
        setArea(e.target.value)
    }
    if(!session){
        return(
            <Protected message="You can only access this page if you are logged in." />
        );
    }
    return(
        <div style={{height: '100vh',background:'rgb(245,245,245)'}}>
            <Nav />
            <div className="container">
                <div className="service"> 
                    <div className="title">
                        <h1>Bike General Service</h1>
                        <span>₹999</span>
                    </div>
                    <div className="info">
                        <p>Complete General Service Includes Engine Oil Change</p>
                        <p>Brakes Check and Clean</p>
                        <p>Clutch Play Adjustment</p>
                        <p>Chain Lubrication and Adjustment</p>
                        <p>Spark Plug Clean</p>
                        <p>Electrical Wiring Check</p>
                        <p>Exterior Foam Wash</p>
                    </div>
                </div>
                <div className="form-container">
                    <h1>Book a service</h1>
                    <form onSubmit={onFormSubmit}>
                        <div className="input">
                            <input onInput={onVehicleInput} type="text" placeholder="Enter vehicle name" />
                        </div>
                        <div className="input">
                            <input onInput={onPlaceInput} type="text" placeholder="Enter place" />
                        </div>
                        <div className="input">
                            <input onInput={onPhoneInput} type="text" placeholder="Enter phone no" />
                        </div>
                        <div className="input">
                            <input type="submit" value="BOOK NOW" />
                        </div>
                        
                    </form>
                    {message.success && <>
                        <p className="success">{message.success}</p>
                    </>}
                    {message.error && <>
                        <p className="error">{message.error}</p>
                    </>}
                </div>
            </div>       
            <style>
                {`
                    .container{
                        width: 90vw;
                        margin: 10vmin auto;
                        display: flex;
                        justify-content: space-between;
                        background: rgb(245,245,245);
                        font-size: 1.2rem;
                        font-family: sans-serif;
                    }
                    .container .service{
                        width: 50vw;
                        background: white;
                    }
                    .container .service .title{
                        border-bottom:1px solid black;
                        padding: 1vmin 4vmin;
                        display: flex;
                        justify-content: space-between;
                        align-items: center; 
                    }
                    .container .service .title h1,.container .form-container h1{
                        font-size: 1.5rem;
                    }
                    .container .service .info{
                        padding: 3vmin;
                    }
                    .container .service .info p{
                        font-size: 1rem;
                    }
                    .container .service .info p:before{
                        display:inline-block;
                        vertical-align: top;
                        line-height: 1em;
                        width: 1em;
                        height:1em;
                        margin-right: 0.3em;
                        text-align: center;
                        content: '✔';
                        color: orange;
                    }  
                    span{
                        color: orange;
                    }
                    .container .form-container{
                        width:30vw;
                        background: white;
                        padding: 0vmin;
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                    }
                    .container .form-container form{
                        flex-grow:1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-evenly;
                        
                    }
                    .container .form-container div.input{
                        margin: 2vmin 0;
                    }
                    .container .form-container input{
                        width: 65%;
                        height: 6vh;
                        padding: 1vmin;
                    }
                    .container .form-container input[type="submit"]{
                        width: 75%;
                        background: orange;
                        border: none;
                    }
                `}
            </style>
        </div>
        
    );
}

export default BookService