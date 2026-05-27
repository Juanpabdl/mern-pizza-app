import mongoose, {type InferSchemaType} from "mongoose";

const menuSchema = new mongoose.Schema({
    _id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        default: () => new mongoose.Types.ObjectId()
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: [{ type: String, required: true }],
    imageUrl: { type: String },
    lastUpdated: { 
        type: Date, 
        required: true, 
        default: Date.now 
    }
});

const Menu = mongoose.model("Menu", menuSchema);

const cartItemSchema = new mongoose.Schema({
    menuItemId: { type: String, ref: "Menu", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: String, required: true }
});

export type CartItemType = InferSchemaType<typeof cartItemSchema>;

export default Menu;