import PostModel from "../models/Post.js";

export const create = async (req, res) => {
     try {
          const docPost = new PostModel({
               title: req.body.title,
               text: req.body.text,
               tags: req.body.tags,
               imageUrl: req.body.imageUrl,
               user: req.userId,
          })

          const post = await docPost.save();

          res.json(post);
     } catch (err) {
          console.log(err);

          res.status(500).json({
               message: 'Ошибка создания поста'
          })
     }
}