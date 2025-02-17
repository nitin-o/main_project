import conf from '../conf/conf.js';
import { Client, ID, Databases, Query } from "appwrite";

class DatabasesService {
    client = new Client();
    databases;
    

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    
    }

    async createPost (slug,{title,userId,content,image}){
        
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                
                slug,
                {title,
                userId,
                content,
                image
                }


            );
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
     
    }




    
}
const databasesService = new DatabasesService();
export default databasesService;
