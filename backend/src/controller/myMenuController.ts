import type { Request, Response } from 'express';
import Menu from '../models/menu.js';
import { v2 as cloudinary } from 'cloudinary';

//api/my/menu
const getMyMenuItems = async (req: Request, res: Response) => {
    try {
        const menuItems = await Menu.find();
        if (!menuItems || menuItems.length === 0) {
            return res.status(404).json({ message: 'No menu items found.' });
        }
        return res.status(200).json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const createMenuItem = async (req: Request, res: Response) => {
    try {
        //1. Check if menu item with the same name already exists
        const existingItem = await Menu.findOne({ name: req.body.name });
        
        if (existingItem) {
            return res.status(409).json({ message: 'Menu item with this name already exists.' });
        }

        //2. Handle image file
        const image = req.file as Express.Multer.File;
        const base64Image = image.buffer.toString('base64');
        const dataUrl = `data:${image?.mimetype};base64,${base64Image}`;

        const uploadResponse = await cloudinary.uploader.upload(dataUrl, {
            folder: 'menu_images',
        });
        
        //3. Save the menu item to the database
        const newMenuItem = new Menu(req.body);
        newMenuItem.imageUrl = uploadResponse.secure_url;
        newMenuItem.lastUpdated = new Date();
        await newMenuItem.save();

        return res.status(201).json({ message: 'Menu item created successfully.', menuItem: newMenuItem });
    }   catch (error) {
        console.error('Error creating menu item:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export default {
    createMenuItem,
    getMyMenuItems
};