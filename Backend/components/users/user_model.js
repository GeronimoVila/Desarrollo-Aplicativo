import mongoose, { Schema } from 'mongoose';

export const UserModel = mongoose.model(
    'user',
    new Schema({
        uuid: String,
        username: String,
        displayName: String,
        hashedPassword: String,
        isEnabled: Boolean,
        roles: String,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date,
    })
);

export class UserMongo {
    async getList (filters){
        return (await UserModel.find(filters).exec())
        .map(i => i.toJSON());
    }

    async create(data) {
        return UserModel.create(data);
    }

    async update(filter, data) {
        return UserModel.updateMany(filter, data);
    }
}