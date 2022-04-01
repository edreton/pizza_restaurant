import dbConnect from "../../../util/mongo";
import Order from "../../../backend/models/Order";

const handler = async (req, res) => {
    const { method, query:{id}, body } = req;
    
    await dbConnect();
    
    if (method === "GET") {
        try {
            const order = await Order.findById(id);
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    if (method === "PUT") {
        try {
            const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json(`Order ID: ${id}) has been updated`);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    if (method === "DELETE") {
        try {
            const order = await Order.findByIdAndDelete(id);
            res.status(200).json(`Order ID: ${id}) has been deleted`);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

}

export default handler;