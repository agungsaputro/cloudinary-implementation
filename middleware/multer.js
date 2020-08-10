const multer = require ("multer");

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, './files/images/');
        }else{
            cb({message: 'apa ini?'}, false);
        }
    },filename: function(req,file, cb){
        cb(null,file.originalname);
    }
})

const upload = multer({storage:storage});

module.exports = upload;