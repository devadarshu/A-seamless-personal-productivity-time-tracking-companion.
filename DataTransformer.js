/**
 * DataTransformer.js
 * Bridges the gap between "Machine Speak" and "Human Speak."
 */

const transformItemResponse = (rawJson) => {
  try {
    // 1. Mapping to Human Titles
    // We handle varying keys (item_title_v2, name, etc.) and fallback to a default
    const humanTitle = rawJson.item_title_v2 || rawJson.name || "Untitled Item";

    // 2. Data Transformation: Humanizing Timestamps
    // Converts "2026-02-27T11:40:00Z" to "February 27, 2026"
    const formattedDate = rawJson.timestamp 
      ? new Date(rawJson.timestamp).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : "Date unavailable";

    return {
      id: rawJson.id,
      title: humanTitle,
      description: rawJson.caption_text || "No description provided.",
      displayDate: `Added on ${formattedDate}`,
      status: 'READY'
    };
  } catch (error) {
    console.error("Transformation Error:", error);
    return getFallbackData("We encountered an error processing this item.");
  }
};

// 3. Graceful Failures
const getFallbackData = (specificError) => {
  return {
    title: "Offline Mode",
    description: `Note: ${specificError} We're having trouble connecting to the server, but your local data is still here.`,
    displayDate: "Viewing cached version",
    status: 'CACHED'
  };
};

export { transformItemResponse, getFallbackData };
