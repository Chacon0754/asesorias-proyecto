const Post = require('../models/post.model');
const Response = require('../models/response.model');

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({ include: Response });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addPost = async (req, res) => {
    try {
        const { author, role, content } = req.body;
        let imageUrl = null;
        let pdfUrl = null;
        console.log('fileType: ',req.fileType)

        if (req.fileType === 'image') {
            imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        } else if (req.fileType === 'pdf') {
            pdfUrl = req.file ? `/uploads/${req.file.filename}` : null;
        }

        console.log('Imagen: ', imageUrl)
        console.log('pdf ', pdfUrl)

        const post = await Post.create({ author, role, content, imageUrl, pdfUrl });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addResponse = async (req, res) => {
    try {
        const { postId, author, role, content } = req.body;
        
        let imageUrl = null;
        let pdfUrl = null;
        console.log('fileType: ',req.fileType)

        if (req.fileType === 'image') {
            imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        } else if (req.fileType === 'pdf') {
            pdfUrl = req.file ? `/uploads/${req.file.filename}` : null;
        }
        console.log('imageUrl:', imageUrl);
        console.log('pdfUrl: ', pdfUrl)

        const response = await Response.create({ postId, author, role, content, imageUrl, pdfUrl });
        res.json(response)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};