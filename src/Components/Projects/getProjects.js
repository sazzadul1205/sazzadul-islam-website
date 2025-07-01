import axios from "axios";

// Get all Projects API Call
export const getProjects = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/APIs/Projects`
    );

    // Ensure a valid response
    if (response.status !== 200) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    // Improved error logging
    console.error(
      "Error fetching projects:",
      error?.response?.data || error.message
    );
    throw new Error("Unable to load projects. Please try again later.");
  }
};
