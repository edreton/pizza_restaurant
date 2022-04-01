import dbConnect from "../../../util/mongo";
import Order from "../../../backend/models/Order";

const handler = async (req, res) => {
    const { method, query, body } = req;
    
    await dbConnect();
    
    if (method === "GET") {
        try {
            const { page, limit, order } = query;
            const pageNum = parseInt(page, 10) || 0;
            const limitNum = parseInt(limit, 10) || 10;
            const orderBy = {}; 
            switch (order) {
                case 'customer':
                    orderBy.customer = 1;
                    break;
                case '-customer':
                    orderBy.customer = -1;
                    break;
                case 'total':
                    orderBy.total = 1;
                    break;                
                case '-total':
                    orderBy.total = -1;
                    break;
                case 'createdAt':
                    orderBy.createdAt = 1;
                    break;
                default:
                    orderBy.createdAt = -1;
                    break;
            }
            
            const orders = await Order.find({}).sort(orderBy).limit(limitNum).skip(pageNum * limitNum);
            res.status(200).json(orders);
        } catch (error) {
        res.status(500).json({ error });
        }
    }
    
    if (method === "POST") {
        try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
        } catch (err) {
        res.status(500).json({ message: err.message });
        }
    }

}

export default handler;