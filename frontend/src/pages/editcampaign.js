import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from "@/src/styles/EditCampaign.module.css"; // Import your CSS styles
import Header from '@/src/components/Header';

const EditCampaign = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    logo: null,
  });

  useEffect(() => {
    if (slug) {
      async function fetchCampaignData() {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/${slug}`);
          if (!response.ok) {
            throw new Error('Campaign not found');
          }
          const data = await response.json();
          setCampaign(data);
          // Set default values for form fields based on fetched data
          setFormData({
            title: data.title,
            description: data.description,
            logo: data.logo, // Assuming the logo is a URL or file object
          });
        } catch (error) {
          console.error('Error fetching campaign:', error);
        } finally {
          setLoading(false);
        }
      }
      fetchCampaignData();
    }
  }, [slug]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'logo' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {};

      if (formData.title !== campaign.title) {
        updatedData.title = formData.title;
      }
      if (formData.description !== campaign.description) {
        updatedData.description = formData.description;
      }
      if (formData.logo) {
        // Check if logo file is selected and it has changed
        const isLogoChanged = formData.logo !== campaign.logo;
        if (isLogoChanged) {
          // If logo file is selected and changed, convert it to base64
          const base64Data = await convertImageToBase64(formData.logo);
          updatedData.logo = base64Data;
        }
      }
      if (Object.keys(updatedData).length === 0) {
        alert('No changes to update');
        return;
      }

      console.log('Updated data:', updatedData); // Log the updated data

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/${slug}`, {
        method: 'PUT', // Use PUT method for updating existing resource
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update campaign');
      }

      alert('Campaign updated successfully');
      // Optionally, redirect to a different page or refresh the data
      router.push('/');
    } catch (error) {
      console.error('Error updating campaign:', error);
      alert('Error updating campaign');
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      // Perform the delete operation
      deleteCampaign();
    }
  };

  const deleteCampaign = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/${slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete campaign');
      }

      alert('Campaign deleted successfully');
      router.push('/'); // Redirect to the main page after deletion
    } catch (error) {
      console.error('Error deleting campaign:', error);
      alert('Error deleting campaign');
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (file instanceof Blob) { // Check if file is a Blob
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve(reader.result.split(',')[1]); // Extract base64 string from the result
        };
        reader.onerror = (error) => {
          reject(error);
        };
      } else {
        resolve(null); // Resolve with null if file is not a Blob
      }
    });
  };

  return (
    <div>
      <Header/>
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img
          src={"https://res.cloudinary.com/dzplxvf5r/" + (campaign?.logo || '')}   
          alt="Campaign Logo"
          className={styles.img}
        />
        <h1 className={styles.title}>Edit Campaign</h1>
        {loading ? (
          <p>Loading...</p>
        ) : campaign ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.input}
            />

            <label className={styles.label} htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.textarea}
            />

            <div className={styles.fileInputContainer}>
              <label htmlFor="logo" className={styles.label}>
                Change Image
              </label>
              <input
                type="file" id="logo" name="logo" onChange={handleChange} accept="image/*" className={styles.fileInput}
              />
            </div>
            <div>
            <button type="submit" className={styles.btn}>Update Campaign</button>
            <button type="button" onClick={handleDelete} className={styles.delbtn}>Delete Campaign</button>
            </div>
          </form>
        ) : (
          <p>Campaign not found</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default EditCampaign;