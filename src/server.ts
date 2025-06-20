import {Server} from 'http'
import app from './app';
import mongoose from 'mongoose';

let server: Server;
const PORT = 5000
async function main() {
    try{
        await mongoose.connect('mongodb+srv://bookAdmin:29j6ATFfFo6a2v2M@cluster0.hvsn9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        server = app.listen(PORT, ()=> {
            console.log(`app is listening on port ${PORT}`)
        });
    } catch (error){
        console.log(error)
    }
}

main()