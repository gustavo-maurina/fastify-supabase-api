import localize from "ajv-i18n";
import fastify from "fastify";

const app = fastify({
  logger: true,
  ajv: {
    customOptions: { allErrors: true, jsonPointers: true },
    plugins: [require("ajv-errors")],
  },
  schemaErrorFormatter: (errors: any, dataVar) => {
    localize["pt-BR"](errors);
    const myErrorMessage = errors
      .map((error: any) => error.message.trim())
      .join(", ");
    return new Error(myErrorMessage);
  },
});

app.get("/", async (request, reply) => {
  return { hello: "world" };
});

const start = async () => {
  try {
    app.register(require("../routes/create-user.routes"));
    await app.listen(3000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
