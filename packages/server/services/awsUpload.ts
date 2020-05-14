import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import multer from 'multer';
import { Request, Response, NextFunction } from "express";

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// TODO: filter by type, limit by size
export const awsUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'danskill',
        metadata: function (req: Request, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req: Request, file, cb) {
            cb(null, Date.now().toString() + "_" + file.originalname)
        }
    })
})

export const awsDelete = (key: string) => {
    s3.deleteObject({
        Bucket: "danskill",
        Key: key
    }, (err, data) => {
        console.log("data: ", data);
        console.log("err: ", err);
    })
}


multer({
    storage: multerS3({
        s3: s3,
        bucket: 'danskill',
        metadata: function (req: Request, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req: Request, file, cb) {
            cb(null, Date.now().toString() + "_" + file.originalname)
        }
    })
})
