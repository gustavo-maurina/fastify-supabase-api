import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRegisterOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { supabase } from "../config/supabase";

const createUserSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
};

const schema = {
  body: createUserSchema,
};

export default function (
  fastify: FastifyInstance,
  opts: FastifyRegisterOptions<FastifyPluginOptions>,
  done: () => void
) {
  fastify.post(
    "/create-user",
    { schema: schema },
    async (request: FastifyRequest<any>, reply: FastifyReply) => {
      const user = await supabase.auth.signUp({
        email: request.body.email,
        password: request.body.password,
      });

      if (!user.error) return reply.send(user);

      reply.code(500).send(user.error);
    }
  );

  fastify.get(
    "/create-user",
    async (request: FastifyRequest<any>, reply: FastifyReply) => {
      const users = await supabase.auth.api.getUser(
        request.headers["authorization"]
      );
      reply.send(users);
    }
  );

  done();
}
