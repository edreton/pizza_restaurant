import Image from 'next/image';
import styles from '../styles/Navbar.module.css';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { AccessAlarm, Person } from '@mui/icons-material';

const Navbar = () => {
    const cart = useSelector((state) => state.cart);
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.callButton}>
                    <Image src='/img/telephone.png' alt="call" width='32' height='32' />
                </div>
                <div className={styles.texts}>
                    <div className={styles.text}>ORDER NOW!</div>
                    <div className={styles.text}>+1 (123) 456-7890</div>
                </div>

            </div>
            <div className={styles.item}>
                <ul className={styles.list}>
                    <Link href="/" passHref>
                        <li className={styles.listItem}>Homepage</li>
                    </Link>
                    <li className={styles.listItem}>Products</li>
                    <li className={styles.listItem}>Menu</li>
                    <Image src='/img/logo.png' alt="logo" width='160px' height='69px' />
                    <li className={styles.listItem}>Events</li>
                    <li className={styles.listItem}>Blog</li>
                    <li className={styles.listItem}>Contact</li>
                </ul>
            </div>
            <div className={styles.item}>
                <Link href="/admin" passHref>
                    <div className={styles.item}>
                        <div className={styles.adminButton}>
                            <Person fontSize='large' />
                        </div>
                    </div>
                </Link>
                <Link href="/cart" passHref>
                    <div className={styles.item}>
                        <div className={styles.cart}>
                            <Image src='/img/cart.png' alt="cart" width='30px' height='30px' />
                            <div className={styles.counter}>{cart.quantity}</div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Navbar