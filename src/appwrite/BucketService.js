import conf from "../conf/conf.js";
import { Client, Storage ,ID} from "appwrite";


export class BucketService{

    client = new Client;
    bucket ;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        
        this.bucket = new Storage(this.client)
    }
    async uploadFile(file){
        
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file 
        )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            
        }
    }

}

const bucketService = new BucketService();
export default bucketService;