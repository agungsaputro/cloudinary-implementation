const ImageModel = require('../models/model');
const Cloud  = require('../config/CloudinaryConfig');


exports.createImage = (req,res) =>{
    try{
        const imageDetails = {
            name: req.body.name
        }
        ImageModel.find({name: imageDetails.name},
            (error,callback) =>{
                if(error){
                    res.json({error:error, message: 'ada masalah '})
                }else if(callback.length >= 1){
                    res.json({message: 'file sudah ada'})
                }else{
                    const imageDetails = {
                        name: req.body.name,
                        addImage: req.files[0].path
                    }
                    Cloud.uploads(imageDetails.addImage).then((result) =>{
                        const imageDetails ={
                            name: req.body.name,
                            addImage: result.url
                        }
                    ImageModel.create(imageDetails,(error,created) =>{
                        if(error){
                            res.json({error:error,message: 'coba lagi'})
                        }else{
                            res.json({created: created, message: 'sukses'})
                        }
                    })
                        
                    })
                }
            })
    }catch(error){
        console.log(error);
    }
}
