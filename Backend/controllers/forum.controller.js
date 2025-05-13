// controllers/forum.controller.js
const sequelize = require("../config/database");
const Post     = require("../models/post.model");
const Response = require("../models/response.model");

// GET /api/forum/posts
exports.getPosts = async (req, res) => {
  try {
    // si quieres las respuestas incluidas:
    const posts = await Post.findAll({
      include: [{ model: Response, as: "responses" }]
    });
    // convierto cada instancia en un objeto plano
    const plain = posts.map(p => p.get({ plain: true }));
    return res.json(plain);
  } catch (e) {
    console.error("Error al obtener posts:", e);
    return res.status(500).json({ message: "Error al obtener posts", error: e.message });
  }
};

// POST /api/forum/posts
exports.addPost = async (req, res) => {
  try {
    const { author, role, content } = req.body;
    // manejo fileType, si subes imagen o PDF
    const imageUrl = req.fileType === "image" ? `/uploads/${req.file.filename}` : null;
    const pdfUrl   = req.fileType === "pdf"   ? `/uploads/${req.file.filename}` : null;

    const created = await Post.create({ id: sequelize.literal("POSTS_SEQ.NEXTVAL"), author, role, content, imageUrl, pdfUrl });
    // saco datos planos
    const plain = created.get({ plain: true });
    console.log("Post creado:", plain);
    return res.status(201).json(plain);
  } catch (e) {
    console.error("Error al crear post:", e);
    return res.status(500).json({ message: "Error al crear post", error: e.message });
  }
};

// POST /api/forum/response
// controllers/forum.controller.js
exports.addResponse = async (req, res) => {
  try {
    console.log(req.body);
    const { postId, author, role, content } = req.body;

    const imageUrl = req.fileType === "image" ? `/uploads/${req.file.filename}` : null;
    const pdfUrl   = req.fileType === "pdf"   ? `/uploads/${req.file.filename}` : null;

    // Intentar crear la respuesta sin usar RETURNING
    let created;
    try {
      created = await Response.create(
        { post_id: postId, author, role, content, imageUrl, pdfUrl },
        { returning: false }
      );
    } catch (err) {
      if (err.message?.includes("reading 'length'")) {
        console.warn("⚠️ Error esperado por RETURNING de Oracle: la inserción sí se hizo.");
      } else {
        throw err;
      }
    }

    // Buscar la respuesta recién creada por coincidencia de datos
    const response = await Response.findOne({
      where: {
        post_id: postId,
        author,
        role,
        content
      },
      order: [["createdAt", "DESC"]],
      raw: true
    });

    return res.status(201).json(response);
  } catch (e) {
    console.error("Error al crear response:", e);
    return res
      .status(500)
      .json({ message: "Error al crear response", error: e.message });
  }
};
