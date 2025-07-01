import axios from "axios";

// Get all Projects API Call with optional title query filter
export const getProjects = async (title = "") => {
  try {
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/APIs/Projects`;
    if (title) {
      // encodeURIComponent to safely include in URL
      url += `?title=${encodeURIComponent(title)}`;
    }

    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching projects:",
      error?.response?.data || error.message
    );
    throw new Error("Unable to load projects. Please try again later.");
  }
};
