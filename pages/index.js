import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Add from '../components/Add'
import AddButton from '../components/AddButton'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'
import styles from '../styles/Home.module.css'

export default function Home({pizzaList, admin}) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Cheese Pizza</title>
        <meta name="description" content="Best cheese pizza you'll ever taste" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <Add setClose={setClose} />}


    </div>
  )
}


export const getStaticProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || '';
  let admin = false;
  if(myCookie.token === process.env.NEXT_PUBLIC_TOKEN){
    admin = true;
  }
  const res = await axios.get('/products');
  return {
    props: {
      pizzaList: res.data,
      admin
    }
  }
}
