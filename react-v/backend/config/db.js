import mongoose from "mongoose";

const connectDB = async (error) => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB Connected");
    } catch (error) {
        console.log("DB connection Error");
        console.log(error);
        
    };
};

export default connectDB;