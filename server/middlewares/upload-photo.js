import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

dotenv.config();

aws.config.update({
	secretAccessKey: process.env.AWSSecretKey,
	accessKeyId: process.env.AWSAccessKeyId
});

const s3 = new aws.S3();

// Upload feature
const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'vue-amazon-clone-img',
		acl: 'public-read',
		metadata: (request, file, callBack) => {
			callBack(null, { fieldName: file.fieldname });
		},
		key: (request, file, callBack) => {
			callBack(null, Date.now().toString());
		}
	})
});

export default upload;
