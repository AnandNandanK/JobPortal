import jwt from "jsonwebtoken";


export const isAuthenticated=async(req,res,next)=>{

    try {

        // console.log(res)
        const token=req.cookies.token;
        console.log("printing Token",token)

        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                success:false,
            })
        }

        const decode =await jwt.verify(token,process.env.SECRET_KEY);

        if(!decode){
            return res.status(401).json({
                message:"Invalid Token"
            })
        }

        console.log("Printing UserId from decoding it..",decode)
        req.id=decode.userId;

        next();

    } catch (error) {
        console.log(error);
    }

}