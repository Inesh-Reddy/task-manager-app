const z = require('zod');

const taskValidation = z.object({
    title: z.string().min(1, { message: "Must provide title" }),
    completed: z.boolean()
});

module.exports = taskValidation

  