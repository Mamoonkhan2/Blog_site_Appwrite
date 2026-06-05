import conf from '../conf/confi'
import { Account,Storage , ID, Client, TablesDB, Databases, Query } from 'appwrite'

export class AppConfig {
    client = new Client()
    database;
    bucket;

    constructor() {
        this.client
            .setEndpoint(String(conf.apiUrl))
            .setProject(conf.projectId);

        // 2. Initialize it here! 
        // Note: The class name is 'Databases' (plural), 
        // but you can name your variable 'database' (singular).
        this.database = new Databases(this.client); 
        this.bucket = new Storage(this.client)
    }

     async createTable({contant, slug, title, UserId, status, featureImage}) {
        console.log(slug);
        
        contant = String(contant);
        try {
            // Now 'this.database' will exist
            return await this.database.createDocument(
                conf.databaseId,
                conf.collectionId,
                slug||ID.unique(),
                { contant, title, UserId, status, featureImage}
            );
        } catch (error) {
            console.log("Error while creating table:", error);
            throw error;
        }
    }
    async updatePost(slug,{contant, title, status, featureImage }) {
        try {
            return await this.database.updateDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                { contant, title, status, featureImage }
            );
        } catch (error) {
            console.log("Error while updating post:", error);
            throw error;
        }
    }
    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Error while deleting post:", error);
            return false;
        }

    }
    /**
     * Fetches a post from the database based on the given slug.
     * @param {string} slug - The slug of the post to fetch.
     * @returns {Promise<object>} - A promise resolving to the post object if found, else throws an error.
     * @throws {Error} - If the post is not found or there is an error with the database.
     */
    async getPost(slug,value) {
        console.log(value)
        try {
            return await this.database.getDocument(
                conf.databaseId,
                conf.collectionId,
                slug    
            )
        } catch (error) {
            console.log("error Appwriteservice getPost", error);
            throw error;
        }
    }
    /**
     * Fetches all posts from the database that match the given query.
     * If no query is provided, it will fetch all posts with the status "Active".
     * @param {Query[]} quires - An array of query objects to filter the results.
     * @returns {Promise<object[]>} - A promise resolving to an array of post objects if found, else throws an error.
     * @throws {Error} - If there is an error with the database.
     */
    async getPosts(quires = [Query.equal("status", "Active")]) {
        try {
            return await this.database.listDocuments(
                conf.databaseId,
                conf.collectionId,
                quires
            );
        } catch (error) {
            console.log("error Appwriteservice getPosts", error);
            throw error;
        }
    }
    //file upload
    /**
     * Uploads a file to the bucket.
     * @param {File} file - The file to upload.
     * @returns {Promise<object>} - A promise resolving to the uploaded file object if successful, else returns false.
     * @throws {Error} - If there is an error with the bucket or the file upload.
     */
      async uploadFile(file) {
    
        try {
            // 3. Now 'this.bucket' exists and has 'createFile'
            return await this.bucket.createFile(
                conf.bucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }
    /**
     * Deletes a file from the bucket based on the given file id.
     * @param {string} fileId - The id of the file to delete.
     * @throws {Error} - If there is an error with the bucket or the file is not found.
     */
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.bucketId,
                fileId
            )
        } catch (error) {
            
            console.log("error Appwriteservice deleteFile", error);
            throw error;
        }
    }

    /**
     * Returns a URL that can be used to preview the file with the given fileId.
     * @param {string} fileId - The id of the file to preview.
     * @returns {string} - The URL to preview the file.
     * @throws {Error} - If there is an error with the bucket or the file is not found.
     */
    getFilePreview(fileId){
        return this.bucket.getFileView(
            conf.bucketId,
            fileId
        )
    }
}
const appConfig = new AppConfig();
export default appConfig;
