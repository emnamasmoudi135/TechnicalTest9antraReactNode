const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import the cors middleware


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://emasmoudi135:11102552@cluster0.ujpipgt.mongodb.net/', {
  useNewUrlParser: true,
});

const courseSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String
});

const Course = mongoose.model('Course', courseSchema);

// Configuration de multer pour gérer le téléchargement des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Le dossier où les fichiers seront stockés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Le nom du fichier téléchargé
  }
});

const upload = multer({ storage: storage });

// Route pour créer un nouveau cours avec image
app.post('/courses', upload.single('image'), async (req, res) => {
  const { title, price } = req.body;
  const imagePath = req.file.path; // Le chemin où l'image est stockée
  const course = new Course({ title, price, image: imagePath });

  try {
    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Error saving the course.' });
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route pour récupérer tous les cours
app.get('/courses',cors(),  async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Route pour récupérer un cours spécifique par id
app.get('/courses/:id',cors(),   async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.json(course);
});

// Route pour mettre à jour un cours par id
app.put('/courses/:id', upload.single('image'), async (req, res) => {
  const { title, price } = req.body;
  const imagePath = req.file ? req.file.path : undefined; // Le chemin où la nouvelle image est stockée

  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Supprimer l'ancienne image du dossier uploads si une nouvelle image est téléchargée
    if (course.image && imagePath) {
      fs.unlinkSync(course.image);
    }

    // Mettre à jour les détails du cours
    course.title = title || course.title;
    course.price = price || course.price;
    course.image = imagePath || course.image;

    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Error updating the course' });
  }
});






// Route pour supprimer un cours par id
app.delete('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      // Supprimer l'image du dossier uploads
      if (course.image) {
        fs.unlinkSync(course.image);
      }
      await Course.findByIdAndDelete(req.params.id);
      res.json({ message: 'Course deleted successfully' });
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the course' });
  }
});

app.listen(3001, () => {
  console.log('Server is listening on port 3001');
});
