interface UserInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const Query = {
  users: async (parent: any, args: UserInfo, { prisma }: any) => {
    return await prisma.user.findMany();
  },
};
