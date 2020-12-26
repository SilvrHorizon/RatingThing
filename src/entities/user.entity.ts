import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from "bcrypt";
import { promisify } from "util";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity{
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({unique: true})
    email: string;

    @Field()
    @Column({default: false})
    isAdmin: boolean;

    @Column()
    password: string;

    async checkPassword(password: string): Promise<boolean>{
        return await bcrypt.compare(password, this.password)
    }

    @BeforeUpdate()
    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }
}