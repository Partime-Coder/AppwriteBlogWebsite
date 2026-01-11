import conf from "../conf/cong";
import { Client, ID, Databases, Storage, Query, } from "appwrite";

export class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ title, slug, content, image, status, userid }) {
        try {
            return await this.databases.createDocument({
                databaseId: conf.appwriteDatabaseID,
                collectionId: conf.appwriteCollectionID,
                documentId: slug,
                data: {
                    title,
                    content,
                    image,
                    status,
                    userid
                }
            })
        } catch (error) {
            throw error;
        }
    }
    async updatePost(slug, { title, content, image, status, }) {
        try {
            return await this.databases.updateDocument({
                databaseId: conf.appwriteDatabaseID,
                collectionId: conf.appwriteCollectionID,
                documentId: slug,
                data: {
                    title,
                    content,
                    image,
                    status,
                }
            })
        } catch (error) {
            throw error;
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument({
                databaseId: conf.appwriteDatabaseID,
                collectionId: conf.appwriteCollectionID,
                documentId: slug,

            });
            return true;

        } catch (error) {
            throw error;
            return false;
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument({
                databaseId: conf.appwriteDatabaseID,
                collectionId: conf.appwriteCollectionID,
                documentId: slug,

            });
        } catch (error) {
            throw error;
        }
    };
    // this part updated
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries
            )
        } catch (error) {
            console.error("getPosts error:", error)
            return false
        }
    };

    // file upload service 

    async uploadFile(file) {
        try {
            return await this.storage.createFile({
                bucketId: conf.appwriteBucketID,
                fileId: ID.unique(),
                file: file,
            })
        } catch (error) {
            throw error;
        }
    }
    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile({
                bucketId: conf.appwriteBucketID,
                fileId: fileId,
            })
            return true
        } catch (error) {
            throw error;
            return false
        }
    };

  getFileView(fileId) {
  return this.storage.getFileView(
    conf.appwriteBucketID,
    fileId
  );
}


}


const service = new Service()

export default service;