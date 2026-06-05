    const conf = {
        apiUrl: String( import.meta.env.VITE_APPWRITE_API_URL),
        projectId: String( import.meta.env.VITE_APPWRITE_PROJECT_ID),
        databaseId: String( import.meta.env.VITE_APPWRITE_DATABASE_ID),
        bucketId: String( import.meta.env.VITE_APPWRITE_BUCKET_ID),
        collectionId: String( import.meta.env.VITE_APPWRITE_COLLECTION_ID)
    }

export default conf;