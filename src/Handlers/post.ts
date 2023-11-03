import prisma from "../DB/db";
import myError from "../Errors/myError";

const checkPostId = async (id) => {
  return await prisma.post.findUnique({ where: { id } });
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: req.user.id,
      },
    });
    res.status(200);
    res.json({ data: posts });
  } catch (e) {
    next(new myError("Error the posts didn't returned ", "db"));
  }
};

export const createPost = async (req, res, next) => {
  try {
    const post = await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        authorId: req.user.id,
      },
    });
    res.status(200);
    res.json({ data: post });
  } catch (e) {
    next(new myError("Error the post didn't created ", "db"));
  }
};

export const getPost = async (req, res, next) => {
  try {
    if ((await checkPostId(req.params.id)) === null) {
      next(new myError("Error no post with this id", "page"));
      return;
    }

    console.log(req.user.id, req.params.id);
    const post = await prisma.post.findUnique({
      where: {
        authorId: req.user.id,
        id: req.params.id,
      },
    });
    res.status(200);
    res.json({ data: post });
  } catch (e) {
    next(new myError("Error the post didn't returned ", "db"));
  }
};

export const updatePost = async (req, res, next) => {
  try {
    if ((await checkPostId(req.params.id)) === null) {
      next(new myError("Error no post with this id", "page"));
      return;
    }

    const post = await prisma.post.update({
      where: {
        authorId: req.user.id,
        id: req.params.id,
      },
      data: req.body,
    });
    res.status(200);
    res.json({ data: post });
  } catch (e) {
    next(new myError("Error the post didn't updated ", "db"));
  }
};

export const deletePost = async (req, res, next) => {
  try {
    if ((await checkPostId(req.params.id)) === null) {
      next(new myError("Error no post with this id", "page"));
      return;
    }

    const post = await prisma.post.delete({
      where: {
        authorId: req.user.id,
        id: req.params.id,
      },
    });
    res.status(200);
    res.json({ data: post });
  } catch (e) {
    next(new myError("Error the post didn't deleted ", "db"));
  }
};
