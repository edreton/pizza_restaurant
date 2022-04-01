// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '../../../util/mongo';
import Product from '../../../backend/models/Product';

export default async function handler(req, res) {
    const { method, query, body, cookies } = req;

    const token = cookies.token;

    await dbConnect();

    if (method === 'GET') {
        try {
            const { page, limit, order } = query;
            const pageNum = parseInt(page, 10) || 0;
            const limitNum = parseInt(limit, 10) || 10;
            const orderBy = {}; 
            switch (order) {
                case 'title':
                    orderBy.title = 1;
                    break;
                case 'price':
                    orderBy.prices = 1;
                    break;
                case '-title':
                    orderBy.title = -1;
                    break;
                case '-price':
                    orderBy.prices = -1;
                    break;
                case 'createdAt':
                    orderBy.createdAt = 1;
                    break;
                default:
                    orderBy.createdAt = -1;
                    break;
            }

            const products = await Product.find({}).sort(orderBy).limit(limitNum).skip(pageNum * limitNum);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    if (method === 'POST') {
        if(!token || token !== process.env.NEXT_PUBLIC_TOKEN) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
            const product = await Product.create(req.body);
            res.status(201).json(product);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

}