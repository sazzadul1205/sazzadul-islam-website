import axios from "axios";

// Get all Projects Hook
export const getProjects = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/Projects`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching all Projects:", error.message);
    throw error; // Rethrow the error to be handled by the caller
  }
};
