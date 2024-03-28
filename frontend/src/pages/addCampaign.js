import { useState } from 'react';
import styles from '@/src/styles/AddCampaign.module.css';
import Header from '@/src/components/Header';

export default function AddCampaign() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('Selected image in file:', file);
    setImage(file);
  };

  const handleImageUpload = async () => {
    if (!image) return;

    try {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1]; // Extract base64 string
        submitFormWithImage(base64Data);
      };
    } catch (error) {
      console.error('Error reading file:', error.message);
    }
  };

  const submitFormWithImage = async (base64Data) => {
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/addcampaign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          logo: base64Data, // Send the base64 string in JSON
        }),
      });

      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Error creating campaign');
      }
      const responseData = await response.json();
      console.log('Campaign created successfully:', responseData);
      // Optionally, redirect to another page or display a success message
    } catch (error) {
      console.error('Error:', error.message);
      // Handle the error, e.g., display an error message to the user
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleImageUpload();
  };

  return (
    <div>
      <Header/>
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>CREATE CAMPAIGN</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="title" className={styles.label}>
            Title:
          </label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className={styles.input} />
          <label htmlFor="description" className={styles.label}>
            Description:
          </label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required className={styles.textarea} />
          <label htmlFor="image" className={styles.label}>
            Image:
          </label>
          <div className={styles.fileInputContainer}>
          <label htmlFor="image" className={styles.label}>
              Choose Image
            </label>
          <input type="file" id="image" onChange={handleImageChange} accept="image/*" required className={styles.fileInput} />
          </div>
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}