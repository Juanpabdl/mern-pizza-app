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

        //2. Handle image file upload to Cloudinary
        const menuImage = await uploadImage(req.file as Express.Multer.File);

        //3. Save the menu item to the database
        const newMenuItem = new Menu(req.body);
        newMenuItem.imageUrl = menuImage;
        newMenuItem.lastUpdated = new Date();
        await newMenuItem.save();

        return res.status(201).json({ message: 'Menu item created successfully.', menuItem: newMenuItem });
    }   catch (error) {
        console.error('Error creating menu item:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const updateMenuItem = async (req: Request, res: Response) => {
    try {
        //const { id, name, price } = req.body;
        const menuItem = await Menu.findById(req.body.id);
        
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found.' });
        }
        // Update fields if provided
        menuItem.name = req.body.name;
        menuItem.price = req.body.price;
        menuItem.category = req.body.category;
        menuItem.lastUpdated = new Date();

        if (req.file) {
            const menuImage = await uploadImage(req.file as Express.Multer.File);
            menuItem.imageUrl = menuImage;
        }

        await menuItem.save();

        return res.status(200).json({ message: 'Menu item updated successfully.', menuItem });
    } catch (error) {
        console.error('Error updating menu item:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const uploadImage = async (file: Express.Multer.File) => {
    const base64Image = file.buffer.toString('base64');
    const dataUrl = `data:${file?.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.uploader.upload(dataUrl, {
        folder: 'menu_images',
    });
    
    return uploadResponse.secure_url;
};

//api/my/menu/:id
const getMenuItemById = async (req: Request, res: Response) => {
    try {
        const menuItem = await Menu.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found.' });
        }
        return res.status(200).json(menuItem);
    } catch (error) {
        console.error('Error fetching menu item:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export default {
    createMenuItem,
    getMyMenuItems,
    updateMenuItem,
    getMenuItemById
};