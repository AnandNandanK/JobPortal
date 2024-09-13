import multer from "multer"

const storage = multer.memoryStorage();
export const singleUpload=multer({storage}).single("file")

// When a POST request is made to the /register endpoint, the singleUpload middleware runs before the register controller function.
// singleUpload will process the file and attach the file data to req.file.
// The register controller can then access the uploaded file via req.file.