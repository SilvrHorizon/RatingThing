import { resolve } from "path";
import { User } from "../entities/user.entity";

export class currentUserFetcher{
    
    private user?: User;
    private userAlreadyFetched: boolean = false;

    constructor(private userId: number){
        if(!userId){
            this.userAlreadyFetched = true;
            this.user = undefined;
        }
    }

    async getUser(){
        if(this.userAlreadyFetched){
            return this.user;
        }        


        return this.fetchUser();


    }
    
    private async fetchUser(){
        this.user = await User.findOne({where: {id: this.userId}});
        this.userAlreadyFetched = true;
        return this.user; 
    }
}