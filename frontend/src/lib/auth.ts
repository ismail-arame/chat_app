import { jwtVerify } from "jose";

type tokenType = {
  userId: string;
  iat: number;
  exp: number;
};

export const getJwtSecretKey = () => {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error("token secret env variable is not ser");
  }
  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(
      "6uv7NHET9n6RezPbVFj4KMCZJvMd7LJU26e69uDttCkurjCt7Lb"
    );
    const jwt =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGFkMWFjMDQ3NGRmMTMxMTliNTY5MGMiLCJpYXQiOjE2ODk1MTQxNDIsImV4cCI6MTY4OTYwMDU0Mn0.mNxDfVbTgHgduwN_6xqNf3WO5LDpU_qK_DnYHD8yBkg";

    // const verified = await jwtVerify(
    //   token,
    //   new TextEncoder().encode(getJwtSecretKey())
    // );
    const verified = await jwtVerify(jwt, secret);
    console.log("token : ", token);
    console.log(verified);
    return verified.payload as tokenType;
  } catch (error: any) {
    throw new Error(error);
  }
};
