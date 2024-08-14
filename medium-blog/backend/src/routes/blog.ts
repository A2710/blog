import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify} from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@aditya2710/medium-common'

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
        JWT_SECRET: string;
	},
    Variables: {
        userId: string;
    }
}>();

blogRouter.use('/*', async (c, next) => {
  const header = c.req.header("authorization") || "";
  const user = await verify(header, c.env.JWT_SECRET);

  if(user){
    //@ts-ignore
    c.set("userId",user.id);
    await next();
  }
  else
  {
    c.status(403);
    return c.json({ error: "You are not logged in" })
  }
})

blogRouter.post('/', async (c) => {
    const body = await c.req.json();

    const { success } = createBlogInput.safeParse(body);
    if(!success)
    {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })

    return c.json({
        id: blog.id
    })
})

blogRouter.put('/', async (c) =>{
    const body = await c.req.json();

    const { success } = updateBlogInput.safeParse(body);
    if(!success)
    {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const blog = await prisma.post.update({
            where:{
                id: body.id,
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
    }
    catch(e)
    {
        c.status(411);
        return c.json({message: "something went wrong, could not update!"});
    }

    return c.json({
        id: body.id,
    });
})

//Todo: add pagination

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select:{
                    name: true
                }
            }
        }
    });

    return c.json({blogs})
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog = await prisma.post.findFirst({
            where: {
                id: id,
            },
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select:{
                        name: true
                    }
                }
            }
        })

        return c.json({
            blog
        })
    } catch(e) {
        c.status(411);
        return c.json({
            message: "error while fetching the blog post!",
        });
    }
})

blogRouter.put('api/v1/blog', (c) => {
    return c.text('put blog')
})

blogRouter.get('api/v1/blog', (c) => {
    return c.text('get blog')
})

export default blogRouter
  