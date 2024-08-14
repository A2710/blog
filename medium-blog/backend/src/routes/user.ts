import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify} from 'hono/jwt'
import { signupInput, signinInput } from '@aditya2710/medium-common'

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET: string
	}
}>();

userRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    // const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const user = await prisma.user.findFirst({
            where: {
                id: id,
            },
        })

        return c.json({
            user
        })
    } catch(e) {
        c.status(411);
        return c.json({
            message: "error while fetching the user data!"
        });
    }
})

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);

  if(!success)
  {
    c.status(411);
    return c.json({
      message: "Inputs not correct",

    })
  }

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.username,
      password: body.password,
    }
  });

  const token = await sign({ id: user.id}, c.env.JWT_SECRET);

  return c.json({
    jwt: token
  })
})

userRouter.post('/signin', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const body2 = {username: body.username, email: body.email};
  console.log(body2);
  const { success } = signinInput.safeParse(body);

  if(!success)
  {
    c.status(411);
    return c.json({
      message: "incorrect credentials"
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.username,
      password: body.password
    }
  });

  if (!user){
    c.status(403);
    return c.json({error: "user not found"});
  }

  const jwt = await sign({id: user.id}, c.env.JWT_SECRET);

  return c.json({
    jwt
  })
})

userRouter.post('api/v1/blog', (c) => {
  return c.text('post blog')
})

userRouter.put('api/v1/blog', (c) => {
  return c.text('put blog')
})

userRouter.get('api/v1/blog', (c) => {
  return c.text('get blog')
})

export default userRouter
