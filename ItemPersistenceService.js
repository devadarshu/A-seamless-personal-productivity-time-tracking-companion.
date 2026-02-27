/**
 * ItemPersistenceService.js
 * Handles saving and retrieving item metadata with robust error handling.
 */

export const saveItemData = async (id, title, description) => {
  try {
    // 1. Title Persistence & 2. Caption/Description Storage
    const payload = {
      id: id,
      title: title.trim(), // Ensuring no leading/trailing whitespace
      description: String(description), // Explicitly cast to String/Text
      lastUpdated: new Date().toISOString(),
    };

    // Simulating a database/API call
    const response = await fakeDatabaseSave(payload);

    if (response.success) {
      return { status: 'SUCCESS', message: 'Data saved successfully.' };
    }
  } catch (error) {
    // 3. Error Handling: Specific scenarios
    if (error.code === 'STORAGE_FULL') {
      return { 
        status: 'WARNING', 
        message: 'Storage is full. Data saved locally to cache only.' 
      };
    }

    if (error.message === 'Network Request Failed') {
      // Logic for offline persistence could go here
      return { 
        status: 'OFFLINE', 
        message: 'No connection. Your changes will sync when you are back online.' 
      };
    }

    return { 
      status: 'ERROR', 
      message: 'Failed to save. Please try again.' 
    };
  }
};

export const getItemData = async (id) => {
  try {
    const data = await fakeDatabaseGet(id);
    if (!data) throw new Error('Not Found');
    
    return {
      title: data.title,
      description: data.description // Retrieved as human-readable String
    };
  } catch (err) {
    console.error("Retrieval Error:", err);
    return null;
  }
};
