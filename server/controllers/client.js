import Product from '../models/Product.js';
import ProductStat from '../models/ProductStat.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import getCountryIso3 from 'country-iso-2-to-3'
// Get Product list with stat

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        const productsWithStat = await Promise.all(products.map(async (product) => {
            const stat = await ProductStat.find({
                productId: product?._id
            })
            return {
                ...product?._doc,
                stat
            }
        }))
        res.status(200).json(productsWithStat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Get Customers list

export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: "user" }).select('-password');
        res.status(200).json(customers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


// Get Transaction
export const getTransactions = async (req, res) => {
    try {
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const formatted = {
                [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1
            }
            return formatted;
        }

        const sortFormatted = Boolean(sort) ? generateSort() : {};

        const transactions = await Transaction.find({
            $or: [
                { userId: { $regex: search, $options: 'i' } },
                { cost: { $regex: search, $options: 'i' } },
            ],
        }).sort(sortFormatted).skip(page * pageSize).limit(pageSize);

        const total = await Transaction.countDocuments({
            userId: { $regex: search, $options: "i" },
          });

        res.status(200).json({
            transactions,
            total,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Get Count of users arround the world

export const getGeography = async (req, res) => {
    try {
        const users = await User.find();
        const mappedLocations = users.reduce((acc,data) => {
            const countryISO3 = getCountryIso3(data?.country);
            if (!acc[countryISO3]) {
                acc[countryISO3] = 0;
            }
            acc[countryISO3]++;
            return acc;
        },{})

        const formattedLocations = Object.entries(mappedLocations).map(
        ([country, count]) => {
          return { id: country, value: count };
        }
      );
      res.status(200).json(formattedLocations);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Get Product by id
export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Add Product to DB
export const addProduct = async (req, res) => {
    const product = new Product(req.body);
    try {
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}