require('dotenv').config();
const mongoose = require('mongoose');
const { dbConnect } = require('./utiles/db');
const categoryModel = require('./models/categoryModel');
const productModel = require('./models/productModel');
const bannerModel = require('./models/bannerModel');

const DEFAULT_CATEGORIES = [
    {
        name: 'Pashmina & Cashmere',
        slug: 'pashmina-cashmere',
        image: '/images/crafts/pashmina-cashmere.jpg'
    },
    {
        name: 'Hand-Knotted Carpets',
        slug: 'hand-knotted-carpets',
        image: '/images/crafts/hand-knotted-carpets.jpg'
    },
    {
        name: 'Kashmir Walnut Wood Carving',
        slug: 'kashmir-walnut-wood-carving',
        image: '/images/crafts/walnut-wood-carving.jpg'
    },
    {
        name: 'Papier-Mâché Artistry',
        slug: 'papier-mache-artistry',
        image: '/images/crafts/papier-mache.jpg'
    },
    {
        name: 'Crewel & Aari Needlework',
        slug: 'crewel-aari-needlework',
        image: '/images/crafts/crewel-aari-needlework.jpg'
    }
];

const DEFAULT_SELLER_ID = new mongoose.Types.ObjectId('000000000000000000000001');

const DEFAULT_PRODUCTS = [
    {
        sellerId: DEFAULT_SELLER_ID,
        name: 'Handloom Kashmiri Pashmina Shawl',
        slug: 'handloom-kashmiri-pashmina-shawl',
        category: 'Pashmina & Cashmere',
        brand: 'Craftoras Artisan Guild',
        price: 320,
        stock: 15,
        discount: 10,
        description: 'Hand-spun on traditional spinning wheels (charkha) and woven on centuries-old handlooms from Changthangi goat fiber.',
        shopName: 'Craftoras',
        images: ['/images/crafts/pashmina-cashmere.jpg', '/images/crafts/pashmina-woven.jpg'],
        rating: 5
    },
    {
        sellerId: DEFAULT_SELLER_ID,
        name: 'Silk-on-Silk Kashmiri Hand-Knotted Carpet',
        slug: 'silk-on-silk-kashmiri-carpet',
        category: 'Hand-Knotted Carpets',
        brand: 'Craftoras Artisan Guild',
        price: 950,
        stock: 6,
        discount: 0,
        description: 'Intricate silk-on-silk and wool rugs patterned with traditional floral, hunting, and medallion motifs.',
        shopName: 'Craftoras',
        images: ['/images/crafts/hand-knotted-carpets.jpg'],
        rating: 5
    },
    {
        sellerId: DEFAULT_SELLER_ID,
        name: 'Chinar Carved Walnut Keepsake Box',
        slug: 'chinar-carved-walnut-keepsake-box',
        category: 'Kashmir Walnut Wood Carving',
        brand: 'Craftoras Artisan Guild',
        price: 185,
        stock: 20,
        discount: 5,
        description: 'Deeply hand-chiseled furniture, screens, and keepsake boxes crafted from seasoned wild walnut trees.',
        shopName: 'Craftoras',
        images: ['/images/crafts/walnut-wood-carving.jpg', '/images/crafts/chinar-wood-carving.jpg'],
        rating: 4.8
    },
    {
        sellerId: DEFAULT_SELLER_ID,
        name: 'Naqashi Gold-Leaf Papier-Mâché Qalamdan',
        slug: 'naqashi-gold-leaf-papier-mache-box',
        category: 'Papier-Mâché Artistry',
        brand: 'Craftoras Artisan Guild',
        price: 140,
        stock: 25,
        discount: 0,
        description: 'Finely molded paper pulp hand-painted with pure gold leaf and botanical gouache paints (Naqashi).',
        shopName: 'Craftoras',
        images: ['/images/crafts/papier-mache.jpg', '/images/crafts/papier-mache-qalamdan.jpg'],
        rating: 4.9
    },
    {
        sellerId: DEFAULT_SELLER_ID,
        name: 'Aari & Crewel Floral Embroidered Tapestry',
        slug: 'aari-crewel-floral-embroidered-tapestry',
        category: 'Crewel & Aari Needlework',
        brand: 'Craftoras Artisan Guild',
        price: 165,
        stock: 18,
        discount: 12,
        description: 'Hand-embroidered floral tapestries, cushion covers, and wearables crafted with pointed hooked needles (aari).',
        shopName: 'Craftoras',
        images: ['/images/crafts/crewel-aari-needlework.jpg'],
        rating: 4.9
    }
];

async function seed() {
    await dbConnect();

    for (const cat of DEFAULT_CATEGORIES) {
        await categoryModel.updateOne({ slug: cat.slug }, { $setOnInsert: cat }, { upsert: true });
    }

    for (const prod of DEFAULT_PRODUCTS) {
        await productModel.updateOne({ slug: prod.slug }, { $setOnInsert: prod }, { upsert: true });
    }

    const firstProd = await productModel.findOne({ slug: 'handloom-kashmiri-pashmina-shawl' });
    if (firstProd) {
        const bannerCount = await bannerModel.countDocuments();
        if (bannerCount === 0) {
            await bannerModel.create({
                productId: firstProd._id,
                banner: '/images/crafts/pashmina-woven.jpg',
                link: firstProd.slug
            });
        }
    }

    console.log('Craftoras default Kashmiri craft categories, products, and banner seeded successfully.');
    await mongoose.disconnect();
}

seed().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
});
