const router = require("express").Router();
const Sequelize = require('sequelize');
const ProductCategory = require("../models/productCategory");
const ProductTag = require("../models/productTag");
const Product = require("../models/product");
const Op = Sequelize.Op
var logger = require('../settings/logger');


// DEDICATED ROAD FOR ORDERS RATING
router.get("/buyer/product", async (request, response) => {
    try {
        var loggerDate = new Date().toISOString()
        logger.info(`timestamp:${loggerDate}, headers:${request.headers}, url:${request.url}, method:${request.method}, query:${request.query}`)
        const productToRate = Product.findOne({
            where: {
                sellerId: request.query.sellerId,
                name: request.query.productName
            }
        });
        if (!productToRate) {
            return response.status(404).json({
                "response": "Product not found"
            });
        } else {
            return response.status(200).json({
                "response": productToRate.data.response
            });
        }
    } catch (error) {
        console.log(error)
        response.status(error.response.status).json({
            "response": error.response.data.response
        });
    }
});

//GET PRODUCTS PER SELLER AND USER ID FOR AGGREGATOR
router.get("/productsPerCart", async (request, response) => {
    try {
        var loggerDate = new Date().toISOString()
        logger.info(`timestamp:${loggerDate}, headers:${request.headers}, url:${request.url}, method:${request.method}, query:${request.query}`)
        const Products = await Product.findAll({
            where: {
                id: { [Op.in]: request.query.productIds }
            }
        });
        return response.status(200).json({
            "response": Products
        });

    } catch (error) {
        console.log(error)
        response.status(error.response.status).json({
            "response": error.response.data.response
        });
    }
});


// CONSULT PRODUCTS FOR BUYERS
router.get("/buyer/products", async (request, response) => {
    try {
        var loggerDate = new Date().toISOString()
        logger.info(`timestamp:${loggerDate}, headers:${request.headers}, url:${request.url}, method:${request.method}, query:${request.query}`)
        var sellersIds = [];
        var productsIdsPerCategory = [];
        var productsIdsPerTag = [];
        var productsIds = [];
        if (Array.isArray(request.query.sellerId)) {
            console.log(request.query.sellerId)
            request.query.sellerId.forEach(
                (id) => {
                    sellersIds.push(parseInt(id))
                }
            )
        } else {
            sellersIds.push(parseInt(request.query.sellerId))
        }
        if (request.query.category) {
            const productCategories = await ProductCategory.findAll({
                where:
                {
                    name: request.query.category
                }
            });
            for (let i = 0; i < productCategories.length; i++) {
                productsIdsPerCategory.push(productCategories[i].productId)
            }
            for (let i = 0; i < productsIdsPerCategory.length; i++) {
                productsIds.push(productsIdsPerCategory[i])
            }
        }

        if (request.query.tag) {
            const productTags = await ProductTag.findAll({
                where:
                {
                    name: request.query.tag,
                }
            });
            for (let i = 0; i < productTags.length; i++) {
                productsIdsPerTag.push(productTags[i].productId)
            }
            for (let i = 0; i < productsIdsPerTag.length; i++) {
                productsIds.push(productsIdsPerTag[i])
            }
        }
        if (request.query.tag && request.query.category) {
            productsIds = productsIdsPerCategory.filter((value) => productsIdsPerTag.includes(value));
        } else if (!request.query.tag && request.query.category) {
            productsIds = productsIdsPerCategory
        } else if (request.query.tag && !request.query.category) {
            productsIds = productsIdsPerTag
        }
        logger.debug(`PRODUCT_IDS, PRODUCT_IDS_PER_CATEGORY, PRODUCT_IDS_PER_TAG : ${productsIds}, ${productsIdsPerCategory}, ${productsIdsPerTag}`)
        const products = await Product.findAndCountAll({
            where: {
                [Op.and]: [
                    { id: productsIds.length > 0 ? { [Op.in]: productsIds } : { [Op.not]: null } },
                    { sellerId: request.query.sellerId !== undefined ? { [Op.in]: sellersIds } : { [Op.not]: null } },
                    { unitPrice: { [Op.between]: [request.query.lowerPrice, request.query.higherPrice] } },
                    { condition: request.query.condition !== undefined ? { [Op.eq]: request.query.condition } : { [Op.not]: null } },
                    { availableQuantity: { [Op.gt]: 0 } },
                    { onSale: true }
                ]
            }, sort: [[request.query.filter, "ASC"]]
        });
        return response.status(200).json({
            "response": products.rows,
            "rows": products.count
        });
    } catch (error) {
        console.log(error)
        response.status(error.response.status).json({
            "response": error.response.data.response
        });
    }
});

// CONSULT PRODUCTS FOR SELLERS
router.get("/seller/products", async (request, response) => {
    try {
        var loggerDate = new Date().toISOString()
        logger.info(`timestamp:${loggerDate}, headers:${request.headers}, url:${request.url}, method:${request.method}, query:${request.query}`)
        const sellerProducts = await Product.findAll({
            where: {
                sellerId: request.query.sellerId ? request.query.sellerId : { [Op.in]: request.query.sellerIds },
            }
        });
        if (!sellerProducts) {
            return response.status(404).json({
                "response": "No product to sell for the current user"
            });
        } else {
            return response.status(200).json({
                "response": sellerProducts
            });
        }
    } catch (error) {
        console.log(error)
        response.status(error.response.status).json({
            "response": error.response.data.response
        });
    }
});

// CONSULT ONE PRODUCT FOR SELLERS ORDERS
router.get("/seller/product", async (request, response) => {
    try {
        var loggerDate = new Date().toISOString()
        logger.info(`timestamp:${loggerDate}, headers:${request.headers}, url:${request.url}, method:${request.method}, query:${request.query}`)
        logger.debug(`query: ${request.query}`)
        const sellerProducts = await Product.findOne({
            where: {
                sellerId: request.query.sellerId,
                name: request.query.productName
            }
        });
        if (!sellerProducts) {
            return response.status(404).json({
                "response": "No product to sell for the current user"
            });
        } else {
            return response.status(200).json({
                "response": sellerProducts
            });
        }
    } catch (error) {
        console.log(error)
        response.status(error.response.status).json({
            "response": error.response.data.response
        });
    }
});

// WITHDRAW FROM SELL THE PRODUCTS OWNED BY DISABLED SELLER ACCOUNTS
router.put("/seller/products", async (request, response) => {
    try {
        var loggerDate = new Date().toISOString()
        logger.info(`timestamp:${loggerDate}, headers:${request.headers}, url:${request.url}, method:${request.method}, body:${request.body}`)
        const productsToWithdraw = await Product.findAll({
            where: {
                sellerId: request.query.userId,
                onSale: true
            }
        });
        if (productsToWithdraw.length == 0) {
            return response.status(200).json({
                "response": "account deleted"
            });
        }
        productsToWithdraw.forEach((product) => {
            product.update({
                onSale: false
            });
        });
        return response.status(200).json({
            "response": "account deleted and products withdrawn from sale"
        });
    } catch (error) {
        console.log(error)
        response.status(error.response.status).json({
            "response": error.response.data.response
        });
    }
});

// ROAD FOR PRODUCTS QUANTITY UPDATE AFTER ORDER CREATION
router.put("/products", async (request, response) => {
    try {
        var loggerDate = new Date().toISOString()
        logger.info(`timestamp:${loggerDate}, headers:${request.headers}, url:${request.url}, method:${request.method}, body:${request.body}`)
        request.body.forEach(async (cartProduct) => {
            console.log("productId: ", cartProduct.productId)
            console.log("quantity: ", cartProduct.quantity)
            var productToUpdate = await Product.findByPk(cartProduct.productId)
            productToUpdate.update({
                availableQuantity: productToUpdate.availableQuantity - cartProduct.quantity
            });
        })
        return response.status(200).json({
            "response": "Stocks updated"
        });
    } catch (error) {
        console.log(error)
        response.status(error.response.status).json({
            "response": error.response.data.response
        });
    }
})


// ADD A PRODUCT FOR SELLERS
router.post("/seller/product", async (request, response) => {
    try {
        var loggerDate = new Date().toISOString()
        logger.info(`timestamp:${loggerDate}, headers:${request.headers}, url:${request.url}, method:${request.method}, body:${request.body}`)
        const newSellerProduct = new Product({
            name: request.body.name,
            label: request.body.label,
            condition: request.body.condition,
            description: request.body.description,
            unitPrice: request.body.unitPrice,
            availableQuantity: request.body.availableQuantity,
            sellerId: request.body.sellerId,
        })
        await newSellerProduct.save();
        return response.status(201).json({
            "response": "New product added"
        });
    } catch (error) {
        if (error.name === "SequelizeDatabaseError") {
            logger.error(`timestamp:${loggerDate}, errorName:${error.name}, queryParameters:${error.parent.parameters}`)
            return response.status(400).json({
                "response": "Bad json format"
            });
        }
        else if (error.name === "SequelizeUniqueConstraintError") {
            logger.error(`timestamp:${loggerDate}, errorName:${error.name}, queryParameters:${error.parent.parameters}`)
            return response.status(409).json({
                "response": "Product already existant for current user"
            });
        }
    }
});

// MODIFY A PRODUCT FOR SELLERS 
router.put("/seller/product", async (request, response) => {
    try {
        var loggerDate = new Date().toISOString()
        logger.info(`timestamp:${loggerDate}, headers:${request.headers}, url:${request.url}, method:${request.method}, body:${request.body}`)
        const productToUpdate = await Product.findOne({
            where: {
                name: request.body.name,
                sellerId: request.body.userId
            }
        });
        if (!productToUpdate) {
            return response.status(404).json({
                "response": "Product not found for current user"
            });
        }
        if (request.body.availableQuantity !== undefined || request.body.availableQuantity == 0) {
            if (request.body.onSale == true)
                return response.status(400).json({
                    "response": "Bad json format",
                });
            request.body.onSale = false
        }

        await productToUpdate.update({
            name: request.body.newName !== undefined ? request.body.newName : productToUpdate.name,
            label: request.body.label !== undefined ? request.body.label : productToUpdate.label,
            condition: request.body.condition !== undefined ? request.body.condition : productToUpdate.condition,
            description: request.body.description !== undefined ? request.body.description : productToUpdate.description,
            unitPrice: request.body.unitPrice !== undefined ? request.body.unitPrice : productToUpdate.unitPrice,
            availableQuantity: request.body.availableQuantity !== undefined ? request.body.availableQuantity : productToUpdate.availableQuantity,
            onSale: request.body.onSale !== undefined ? request.body.onSale : productToUpdate.onSale
        });
        return response.status(200).json({
            "response": productToUpdate.dataValues
        });
    } catch (error) {
        console.log(error)
        return response.status(error.response.status).json({
            "response": error.response.data.response
        });
    }
});

// DELETE A PRODUCT FOR SELLERS 
router.delete("/seller/product", async (request, response) => {
    try {
        var loggerDate = new Date().toISOString()
        logger.info(`timestamp:${loggerDate}, headers:${request.headers}, url:${request.url}, method:${request.method}, body:${request.body}`)
        const productToDelete = await Product.findOne({
            where: {
                name: request.body.productName,
                sellerId: request.body.sellerId
            }
        });
        await productToDelete.destroy();
        return response.status(200).json({
            "response": "Product deleted"
        });
    } catch (error) {
        console.log(error)
        return response.status(error.response.status).json({
            "response": error.response.data.response
        });
    }
});

// SYNC CARTPRODUCT FOR AGGREGATOR
router.get("/productsPerId", async (request, response) => {
    try {
        var loggerDate = new Date().toISOString()
        logger.info(`timestamp:${loggerDate}, headers:${request.headers}, url:${request.url}, method:${request.method}, query:${request.query}`)
        const products = await Product.findAll({
            where: {
                id: { [Op.in]: request.query.productIds }
            }
        });
        return response.status(200).json({
            "response": products
        });
    } catch (error) {
        console.log(error)
        return response.status(error.response.status).json({
            "response": error.response.data.response
        });
    }
});

//GET PRODUCTS FOR ORDERS
router.get("/orderedProduct", async (request, response) => {
    try {
        var loggerDate = new Date().toISOString()
        logger.info(`timestamp:${loggerDate}, headers:${request.headers}, url:${request.url}, method:${request.method}, query:${request.query}`)
        const products = await Product.findAll({
            where: {
                id: { [Op.in]: request.query.productIds }
            }
        });
        return response.status(200).json({
            "response": products
        });
    } catch (error) {
        console.log(error)
        return response.status(error.response.status).json({
            "response": error.response.data.response
        });
    }
});


//DEDICATED ROAD FOR PRODUCTS AVERAGE RATING UPDATE
router.put("/updateProductRating", async (request, response) => {
    try {
        var loggerDate = new Date().toISOString()
        logger.info(`timestamp:${loggerDate}, headers:${request.headers}, url:${request.url}, method:${request.method}, body:${request.body}`)
        const productToUpdate = await Product.findByPk(request.body.productId)
        await productToUpdate.update({
            averageRating: request.body.averageRating
        });
        await productToUpdate.save();
        return response.status(200).json({
            "response": productToUpdate
        });
    }
    catch (error) {
        console.log(error)
        return response.status(error.response.status).json({
            "response": error.response.data.response
        });
    }
});
module.exports = router;