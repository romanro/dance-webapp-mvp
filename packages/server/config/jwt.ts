import fs from 'fs';
import { SignOptions, VerifyOptions } from 'jsonwebtoken';
import path from "path";

export const jwtAccessPrivateKey = fs.readFileSync(path.resolve(__dirname, "jwtAccessPrivate.key"), 'utf8');
export const jwtAccessPublicKey = fs.readFileSync(path.resolve(__dirname, "jwtAccessPublic.key"), 'utf8');

export const jwtRefreshPrivateKey = fs.readFileSync(path.resolve(__dirname, "jwtRefreshPrivate.key"), 'utf8');
export const jwtRefreshPublicKey = fs.readFileSync(path.resolve(__dirname, "jwtRefreshPublic.key"), 'utf8');

export const jwtConfig = {
  issuer: 'sso.danskilll.com',
  audience: 'dansekill.com'
};

export const signOptionsAccessToken: SignOptions = {
  ...jwtConfig,
  algorithm: "RS256",
  expiresIn: "15m",
};

export const verifyOptionsAccessToken: VerifyOptions = {
  ...jwtConfig,
  algorithms: ["RS256"]
};

export const signOptionsRefreshToken: SignOptions = {
  ...jwtConfig,
  algorithm: "RS256",
  expiresIn: "30d",
};

export const verifyOptionsRefreshToken: VerifyOptions = {
  ...jwtConfig,
  algorithms: ["RS256"]
};