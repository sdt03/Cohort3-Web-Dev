const { z, Schema } = require("zod");

// const requiredBody = z.object({
//     email: z.string().email(),
//     name: z.string(),
//     password: 
//     z.string().min(6).regex(/[A-Z]/, {message: "Password should contain atleast one uppercase character"})
//     .regex(/[a-z]/, {message: "Password should contain atleast 1 lowercase character"})
//     .regex(/[\W_]/, {message: "Should contain atleast 1 special character"})
// });

const passwordSchema = z.string().min(6).regex(/[A-Z]/, {message: "Password should contain atleast one uppercase character"})
    .regex(/[a-z]/, {message: "Password should contain atleast 1 lowercase character"})
    .regex(/[\W_]/, {message: "Should contain atleast 1 special character"});

    const password = "Nasteda@123"
    try {
        passwordSchema.parse(password);
        console.log("Password is valid!");
      } catch (error) {
        console.error(error.errors);
      }

