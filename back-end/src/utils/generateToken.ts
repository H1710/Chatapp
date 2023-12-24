import jwt from 'jsonwebtoken';

class Token {
  static async generateAccessToken(payload: any): Promise<string> {
    return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
      expiresIn: '15m',
    });
  }

  static async generateRefreshToken(payload: any): Promise<string> {
    return jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {
      expiresIn: '30d',
    });
  }
}

export { Token };
