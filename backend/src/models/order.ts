import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    deliveryDetails: {
        email: { type: String, required: true },
        username: { type: String, required: true },
        addressLine: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
    },
    items: [
        {   
            menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
        }
    ],
    totalAmount: { type: Number },
    status: { 
        type: String, 
        enum: ['placed', 'paid', 'inProgress', 'outForDelivery', 'delivered'],  
    },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;