// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '../../../util/mongo';
import Product from '../../../backend/models/Product';

export default async function handler(req, res) {
    const { method, query: { id }, body, cookies } = req;

    const token = cookies.token;

    await dbConnect();

    if (method === 'GET') {
        try {
            const product = await Product.findById(id);
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    if (method === 'PUT') {
        if(!token || token !== process.env.NEXT_PUBLIC_TOKEN) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
            const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json(`Product ${product.title} (ID: ${id}) has been updated`);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    if (method === 'DELETE') {
        if(!token || token !== process.env.NEXT_PUBLIC_TOKEN) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
            const product = await Product.findByIdAndDelete(id);
            res.status(200).json(`Product ${product.title} (ID: ${id}) has been deleted`);
        } catch (err) {
            res.status(500).json(err);
        }
    }

}