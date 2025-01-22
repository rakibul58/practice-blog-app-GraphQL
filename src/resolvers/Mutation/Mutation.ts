import bcrypt from "bcrypt";
import { createToken } from "../../utils/jwtHelper";

interface UserInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

interface SigninInfo {
  email: string;
  password: string;
}

interface PostInput {
  title: string;
  content: string;
}

export const Mutation = {
  signup: async (parent: any, args: UserInfo, { prisma }: any) => {
    const { name, email, password } = args;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.$transaction(async (tx: any) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      await tx.profile.create({
        data: {
          bio: args.bio || "",
          userId: user.id,
        },
      });

      return user;
    });

    const token = createToken(user.id);

    return { token };
  },

  signin: async (parent: any, args: SigninInfo, { prisma }: any) => {
    const { email, password } = args;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid password");
    }
    const token = createToken(user.id);
    return { token };
  },

  addPost: async (parent: any, args: PostInput, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return { UserError: "Unauthorized", post: null };
    }
    const { title, content } = args;
    if (!title || !content) {
      return { UserError: "Title and content are required", post: null };
    }
    const post = await prisma.post.create({
      data: { title, content, authorId: userInfo.userId },
    });
    return { post };
  },
};
