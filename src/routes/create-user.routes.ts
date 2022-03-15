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
      const { email, password } = request.body;
      const user = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (!user.error) return reply.send(user);

      reply.code(500).send(user.error);
    }
  );
  done();
}
