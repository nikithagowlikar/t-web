import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const demoRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        rollNo: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("input", input);
      try {
        const response = await ctx.prisma.demo.create({
          data: {
            ...input,
          },
        });
        console.log("response", response);
        return response;
      } catch (err: any) {
        throw new Error(err);
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        body: demoSchema(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("input", input);
      try {
        const response = await ctx.prisma.demo.update({
          where: {
            id: input.id,
          },
          data: {
            firstName: input.body.firstName,
            lastName: input.body.lastName,
            rollNo: input.body.rollNo,
          },
        });
        console.log("response", response);
        return response;
      } catch (err: any) {
        throw new Error(err);
      }
    }),

  get: publicProcedure.query(async ({ ctx, input }) => {
    try {
      const response = await ctx.prisma.demo.findMany();
      console.log("response", response);
      return response;
    } catch (err: any) {
      throw new Error(err);
    }
  }),
});

function demoSchema() {
  return z.object({
    firstName: z.string(),
    lastName: z.string(),
    rollNo: z.number(),
  });
}
