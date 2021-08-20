const multer = require('multer');
const express = require('express');

const fileFilter = (req, file, callback) =>{

    const filename = file.originalname.toLowerCase();
    const index = filename.lastIndexOf('.');
    const fileType = filename.substring(index+1);

    console.log(file.originalname);
    
    //이미지 확장자 구분 검사
    if(fileType.includes('jpg') || fileType.includes('jpeg') || fileType.includes('png')){
        callback(null, true)
    }else {
        return callback({message: "This extension is not allowed"}, false)
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().valueOf()+'_'+file.originalname);
    }
})

const imageUpload = multer({
    storage: storage,
    fileFilter: fileFilter
});

exports.imageUpload = imageUpload;