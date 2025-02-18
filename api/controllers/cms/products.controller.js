const { errorMessage, notFoundError } = require("@/library/functions")
const { Product}  = require("@/models")
const {unlinkSync} = require('node:fs')


class ProductsController {
    index = async (req, res, next) => {
        try {
            let products = await Product.aggregate()
            
            .lookup({from:'categories', localField:'categoryId',foreignField:'_id',as:'category'})
            .lookup({from:'brands', localField:'brandId',foreignField:'_id',as:'brand'})


            for(let i in products) {
                products[i].category = products[i].category[0]
                products[i].brand = products[i].brand[0]



            }


            res.send(products)
        } catch(error) {
            errorMessage(next, error)
        }
    }
    
    create = async (req, res, next) => {
        try {
            const { name, summary, description, price ,discountedPrice, categoryId,brandId, status, featured } = req.body

            const images = req.files.map(file => file.filename) 

            await Product.create({ name,summary,description,price,discountedPrice,categoryId,brandId, status , featured,images})

            res.status(201).send({
                message: 'Product added.'
            })
        } catch (error) {
            errorMessage(next, error)
        }
    }
    
    show = async (req, res, next) => {
        try {
            const {id} = req.params

            const product = await Product.findById(id)

            if(product) {
                res.send(product)
            } else {
                notFoundError(next, 'Product')
            }
        } catch(error) {
            errorMessage(next, error)
        }
    }
    
    update = async (req, res, next) => {
        try {
            const { id } = req.params

            const product = await Product.findById(id)

            if (product) {
                const { name, summary, description, price ,discountPrice, categoryId,brandId, status, featured } = req.body

               let images = product.images
               if(req.files.length > 0) {
                images = [
                    ...images,
                    ...req.files.map(file => file.filename),
                ]

               }
    
                await Product.findByIdAndUpdate(id,{ name,summary,description,price,discountPrice,categoryId,brandId, status , featured,images})
                res.send({
                    message: 'Product updated.'
                })
            } else {
                notFoundError(next, 'Product')
            }
        } catch (error) {
            errorMessage(next, error)
        }
    }
    
    destroy = async (req, res, next) => {
        try {
            const { id } = req.params

            const product = await Product.findById(id)

            if (product) {
                for(let filename of product.images){
                    unlinkSync(`./uploads/${filename}`)



                }
                await Product.findByIdAndDelete(id)

                res.send({
                    message: 'Product deleted.'
                })
            } else {
                notFoundError(next, 'Product')
            }
        } catch (error) {
            errorMessage(next, error)
        }
    }
image = async (req,res,next) => {
    try{
        const {id,filename } = req.params

        const product = await Product.findById(id)

        if(product) {
          if(product.images.length>1){
            unlinkSync(`./uploads/${filename}`)
            const images = product.images.filter(file => file != filename)
            await Product.findByIdAndDelete(id,{images})

            res.send({
                message:"Image deleted"
            })


          }
          else {
            next({
                message:'product must have at least one image.'


            })
          }
        } else {
            notFoundError(next, 'Product')
        }


    }
    catch(error){
        errorMessage(next,error)
    }
    
}

}

module.exports = new ProductsController
