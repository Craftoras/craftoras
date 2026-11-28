export const DEFAULT_CRAFT_CATEGORIES = [
    {
        name: 'Pashmina & Cashmere',
        slug: 'pashmina-cashmere',
        image: '/images/crafts/pashmina-cashmere.jpg',
        description: 'Hand-spun on traditional spinning wheels (charkha) and woven on centuries-old handlooms from Changthangi goat fiber.'
    },
    {
        name: 'Hand-Knotted Carpets',
        slug: 'hand-knotted-carpets',
        image: '/images/crafts/hand-knotted-carpets.jpg',
        description: 'Intricate silk-on-silk and wool rugs patterned with traditional floral, hunting, and medallion motifs.'
    },
    {
        name: 'Kashmir Walnut Wood Carving',
        slug: 'kashmir-walnut-wood-carving',
        image: '/images/crafts/walnut-wood-carving.jpg',
        description: 'Deeply hand-chiseled furniture, screens, and keepsake boxes crafted from seasoned wild walnut trees.'
    },
    {
        name: 'Papier-Mâché Artistry',
        slug: 'papier-mache-artistry',
        image: '/images/crafts/papier-mache.jpg',
        description: 'Finely molded paper pulp hand-painted with pure gold leaf and botanical gouache paints (Naqashi).'
    },
    {
        name: 'Crewel & Aari Needlework',
        slug: 'crewel-aari-needlework',
        image: '/images/crafts/crewel-aari-needlework.jpg',
        description: 'Hand-embroidered floral tapestries, cushion covers, and wearables crafted with pointed hooked needles (aari).'
    }
];

export const DEFAULT_BANNERS = [
    {
        banner: '/images/crafts/pashmina-woven.jpg',
        link: 'handloom-kashmiri-pashmina-shawl'
    },
    {
        banner: '/images/crafts/hand-knotted-carpets.jpg',
        link: 'silk-on-silk-kashmiri-carpet'
    },
    {
        banner: '/images/crafts/papier-mache-qalamdan.jpg',
        link: 'naqashi-gold-leaf-papier-mache-box'
    }
];

export const DEFAULT_FEATURED_PRODUCTS = [
    {
        _id: 'default-pashmina-1',
        name: 'Handloom Kashmiri Pashmina Shawl',
        slug: 'handloom-kashmiri-pashmina-shawl',
        category: 'Pashmina & Cashmere',
        price: 320,
        discount: 10,
        rating: 5,
        images: ['/images/crafts/pashmina-cashmere.jpg', '/images/crafts/pashmina-woven.jpg'],
        description: 'Hand-spun on traditional spinning wheels (charkha) and woven on centuries-old handlooms from Changthangi goat fiber.'
    },
    {
        _id: 'default-carpet-1',
        name: 'Silk-on-Silk Kashmiri Hand-Knotted Carpet',
        slug: 'silk-on-silk-kashmiri-carpet',
        category: 'Hand-Knotted Carpets',
        price: 950,
        discount: 0,
        rating: 5,
        images: ['/images/crafts/hand-knotted-carpets.jpg'],
        description: 'Intricate silk-on-silk and wool rugs patterned with traditional floral, hunting, and medallion motifs.'
    },
    {
        _id: 'default-walnut-1',
        name: 'Chinar Carved Walnut Keepsake Box',
        slug: 'chinar-carved-walnut-keepsake-box',
        category: 'Kashmir Walnut Wood Carving',
        price: 185,
        discount: 5,
        rating: 4.8,
        images: ['/images/crafts/walnut-wood-carving.jpg', '/images/crafts/chinar-wood-carving.jpg'],
        description: 'Deeply hand-chiseled furniture, screens, and keepsake boxes crafted from seasoned wild walnut trees.'
    },
    {
        _id: 'default-papier-1',
        name: 'Naqashi Gold-Leaf Papier-Mâché Qalamdan',
        slug: 'naqashi-gold-leaf-papier-mache-box',
        category: 'Papier-Mâché Artistry',
        price: 140,
        discount: 0,
        rating: 4.9,
        images: ['/images/crafts/papier-mache.jpg', '/images/crafts/papier-mache-qalamdan.jpg'],
        description: 'Finely molded paper pulp hand-painted with pure gold leaf and botanical gouache paints (Naqashi).'
    },
    {
        _id: 'default-crewel-1',
        name: 'Aari & Crewel Floral Embroidered Tapestry',
        slug: 'aari-crewel-floral-embroidered-tapestry',
        category: 'Crewel & Aari Needlework',
        price: 165,
        discount: 12,
        rating: 4.9,
        images: ['/images/crafts/crewel-aari-needlework.jpg'],
        description: 'Hand-embroidered floral tapestries, cushion covers, and wearables crafted with pointed hooked needles (aari).'
    }
];
