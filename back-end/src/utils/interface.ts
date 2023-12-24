import mongoose, { Document } from 'mongoose';
import { Request } from 'express';
import { IUser } from '../entities/user';

export interface IReqAuth extends Request {
  user?: IUser;
}

export interface IDecodedToken {
  _id?: string;
  iat: number;
  exp: number;
}
