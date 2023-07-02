import { ObjectId } from 'mongodb';

enum UserVerifyStatus {
  Unverified,
  Verified,
  Banned
}

interface UserType {
  _id?: ObjectId;
  fullname?: string;
  email: string;
  date_of_birth?: Date;
  password: string;
  created_at?: Date;
  updated_at?: Date;
  email_verify_token?: string;
  forget_password_token?: string;
  verify?: UserVerifyStatus;

  bio?: string | null;
  location?: string | null;
  website?: string | null;
  username?: string | null;
  avatar?: string | null;
  cover_avatar?: string | null;
}

export default class User {
  _id: ObjectId;
  fullname: string;
  email: string;
  date_of_birth: Date;
  password: string;
  created_at: Date;
  updated_at: Date;
  email_verify_token: string;
  forget_password_token: string;
  verify: UserVerifyStatus;

  bio: string | null;
  location: string | null;
  website: string | null;
  username: string | null;
  avatar: string | null;
  cover_avatar: string | null;

  constructor(user: UserType) {
    const date = new Date();

    this._id = user._id || new ObjectId();
    this.fullname = user.fullname || '';
    this.email = user.email || '';
    this.date_of_birth = user.date_of_birth || new Date();
    this.password = user.password || '';
    this.created_at = user.created_at || date;
    this.updated_at = user.updated_at || date;
    this.email_verify_token = user.email_verify_token || '';
    this.forget_password_token = user.forget_password_token || '';
    this.verify = user.verify || UserVerifyStatus.Unverified;

    this.bio = user.bio || '';
    this.location = user.location || '';
    this.website = user.website || '';
    this.username = user.username || '';
    this.avatar = user.avatar || '';
    this.cover_avatar = user.cover_avatar || '';
  }
}
