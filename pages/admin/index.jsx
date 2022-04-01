import axios from 'axios';
import Image from 'next/image';
import styles from '../../styles/Admin.module.css';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';


const Index = ({orders,products}) => {
    const [ordersList, setOrdersList] = useState(orders);
    const [pizzaList, setpizzaList] = useState(products);
    const status = ['Processing', 'On The Way', 'Delivered' ];
    //const status = ['Processing', 'Delivered', 'Cancelled'];

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/products/${id}`);
            if (res.status === 200) {
                setpizzaList(pizzaList.filter(pizza => pizza._id !== id));
            }    
        } catch (error) {
            console.log(error); 
        }
    }

    const handleStatus = async (id, status) => {
        try {
            console.log(id + " " + status)
            const res = await axios.put(`/orders/${id}`, {status: status});
            if (res.status === 200) {
                setOrdersList(ordersList.map(order => order._id === id ? {...order, status} : order));
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className={styles.container}>
        <div className={styles.item}>
            <h1 className={styles.title}>Products</h1>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.trTitle}>
                        <th>Image</th>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Price</th>                      
                        <th>Action</th>
                    </tr>
                </thead> 
                <tbody>
                    {pizzaList.map(product => (
                        <tr className={styles.tr} key={product._id}>
                            <td>
                                <div className={styles.imgContainer}>
                                    <Image
                                        src={product.img}
                                        width={50}
                                        height={50}
                                        objectFit="cover"
                                        alt=""
                                    />
                                </div>
                            </td>
                            <td>
                                <span className={styles.id}>{product._id.slice(0,5) + "..." + product._id.slice(product._id.length-4,product._id.length)}</span>
                            </td>
                            <td>
                                <span className={styles.title}>{product.title}</span>
                            </td>
                            <td>
                                <span className={styles.price}>${product.prices[0]}</span>
                            </td>
                            <td>
                                <button className={styles.button}>Edit</button>
                                <button className={styles.button} onClick={() => handleDelete(product._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>   
            </table>
        </div>
        <div className={styles.item}>
            <h1 className={styles.title}>Orders</h1>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.trTitle}>
                        <th>Id</th>
                        <th>Customer</th>
                        <th>Total</th>                      
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead> 
                <tbody>
                    {ordersList.map(order => (
                    <tr className={styles.tr} key={order._id}>
                        <td>
                            <span className={styles.id}>{order._id.slice(0,5) + "..." + order._id.slice(order._id.length-4,order._id.length)}</span>
                        </td>
                        <td>
                            <span className={styles.customer}>{order.customer}</span>
                        </td>
                        <td>
                            <span className={styles.price}>${order.total}</span>
                        </td>
                        <td>
                            <span className={styles.title}>{order.method === 0 ? "Cash" : "Paid"}</span>
                        </td>
                        <td>
                            <span className={styles.title}>{status[order.status]}</span>
                        </td>
                        <td>
                            <button onClick={() => handleStatus(order._id, order.status + 1)} disabled={order.status===status.length-1}>Next Stage</button>
                        </td>
                    </tr>
                    ))}
                </tbody>   
            </table>
        </div>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || '';
    if(myCookie.token !== process.env.NEXT_PUBLIC_TOKEN){
        ctx.res.writeHead(302, {Location: '/admin/login'});
        ctx.res.end();
    }
    const productRes = await axios.get(`/products`);
    const orderRes = await axios.get(`/orders`);
    return {
      props: {
        orders: orderRes.data,
        products: productRes.data
      }
    }
  };

export default Index