import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Landingpage = () => {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses when the component mounts
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error.message);
    }
  };

  return (
    <div>
      {/* Image en arrière-plan */}
      <img
        src="412169569_194004210464026_2529788960600548007_n.jpg"
        alt="Your Alt Text"
        style={{
          position: 'absolute',
          top: 0,
          height: '12vh', // Set the height to 20% of the viewport height (adjust as needed)
          width: 'auto', // Maintain the aspect ratio
        }}
      />

{/* Partie 1 */}
<div
  style={{
    borderBottom: '2px solid #ccc',
    padding: '20px',
    position: 'relative',
    height: '12cm',
    overflow: 'hidden',
    marginTop: '20vh',
    textAlign: 'center',
  }}
>
  {/* Image en arrière-plan pour la partie 1 */}
  <img
    src="istockphoto-1145315815-612x612.jpeg"
    alt=""
    style={{
      width: '100%',
      height: '100vh', 
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: -1,
      objectFit: 'cover', 
    }}
  />

  {/* Contenu de la partie 1 avec fond blanc transparent */}
  <div
    style={{
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',

    }}
  >
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.7)', // Ajout de fond blanc transparent
        padding: '20px',
        display: 'inline-block', // Pour que la div s'ajuste à la largeur du contenu
        width: '60%', // Changer la largeur ici (par exemple, '80%', '400px', etc.)

      }}
    >
      <p style={{ fontWeight: 'bold', color: 'black', fontSize: '2.5em' }}>
        Improve your skills on your own
      </p>
      <p style={{ fontWeight: 'bold', color: 'black', fontSize: '2.5em' }}>
        To prepare for a better future
      </p>
      <button
        style={{
          backgroundColor: 'purple',
          color: 'white',
          border: '1px solid purple',
          padding: '10px',
          borderRadius: '20px',
          width: '160px',
        }}
      >
        <p style={{ fontWeight: 'bold'}}>Register now</p>
      </button>
    </div>
  </div>
</div>






   
{/* Partie 2 */}
<div style={{ borderBottom: '2px solid #ccc', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
<h2>Discover our courses</h2>
<button
  style={{
    backgroundColor: 'purple',
    color: 'white',
    border: '1px solid purple',
    padding: '10px',
    borderRadius: '20px',
    width: '140px'
  }}
>
  View More
</button>
</div>
<div style={{ display: 'flex', flexWrap: 'wrap' }}>
{courses.map(course => (
  <div key={course._id} style={{ flex: '0 0 30%', margin: '10px', border: '1px solid #ddd', padding: '10px' }}>
    <img
      src={`http://localhost:3001/${course.image}`} // Assuming 'image' is the path to the image
      alt={course.title}
      style={{ width: '100%', height: 'auto' }}
    />
    <h3>{course.title}</h3>
    <p style={{ color: 'purple', fontWeight: 'bold'  }}>{`${course.price}DT /Month`}</p>
  </div>
))}
</div>

  







      {/* Partie 3: Formulaire simple */}
      <div style={{ backgroundColor: 'white', padding: '20px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', backgroundColor: 'orange', padding: '20px', borderRadius: '60px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', width: '80%', maxWidth: '600px' }}>
          <h2 style={{ color: 'black', fontWeight: 'bold' }}>Contact Us</h2>
          <form>
            <div style={{ marginBottom: '10px', textAlign: 'left', marginLeft: '10%', width: '80%' }}>
              <label style={{ color: 'black', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Name:</label>
              <input type="text" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '15px', textAlign: 'left', border: '1px solid transparent' }} placeholder="Your Name" />
            </div>
            <div style={{ marginBottom: '10px', textAlign: 'left', marginLeft: '10%', width: '80%' }}>
              <label style={{ color: 'black', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Email:</label>
              <input type="email" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '15px', textAlign: 'left', border: '1px solid transparent' }} placeholder="Your Email" />
            </div>
            <div style={{ marginBottom: '10px', textAlign: 'left', marginLeft: '10%', width: '80%' }}>
              <label style={{ color: 'black', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Message:</label>
              <textarea rows="4" style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '15px', textAlign: 'left', border: '1px solid transparent' }} placeholder="Your Message"></textarea>
            </div>
            <button type="submit" style={{ backgroundColor: 'purple', color: 'white', border: '1px solid purple', width: '40%', padding: '10px', boxSizing: 'border-box', borderRadius: '5px' }}>Send the message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
