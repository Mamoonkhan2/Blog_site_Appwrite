import conf from '../conf/confi'
import { Account, ID, Client } from 'appwrite'


export class AppriteService {
    client;
    account;
    constructor() {
        this.client = new Client(); // Initialize client here
        this.client
            .setEndpoint(conf.apiUrl)
            .setProject(conf.projectId);

        // Initialize this.account as an instance of the Appwrite Account service
        this.account = new Account(this.client);
    }
    async createAcount({ email, password, name }) {
        try {
            const UserAcount = this.account.create(ID.unique(), email, password, name);
            if (UserAcount) {
                //do something
                return UserAcount
            }
            else {
                return UserAcount;
            }
        } catch (e) {
            console.log('error in current user', e)
            throw e;
        }
    }

    async LoginUser({ email, password }) {
        try {
            // will check for the accoutnt and then if it exist it will create a session for the user
            // and return the session data
            return await this.account.createEmailPasswordSession(
                email,
                password
            );
        }
        catch (error) {
            console.log('error in login user', error)
            throw error;
        }
    }
    async CurrentUser() {
        // it will give the current user data if the user is logged in otherwise it will throw an error
        try {
            return await this.account.get();
        }
        catch (e) {
            console.log("Error while fetching current user:", e);
            throw e;
        }
    }
    async LogoutUser() {
        try {
            return await this.account.deleteSession('current');
        } catch (error) {
            console.log("Error while logging out user:", error);
            throw error;
        }
    }
};
export const service = new AppriteService();
