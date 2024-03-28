async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  }
  
  async function updateCampaign(id, data) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/updatecampaign/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update campaign');
    }
    return response.json();
  }
  
  export { fetchData, updateCampaign };