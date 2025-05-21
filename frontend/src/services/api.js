
const API_URL = "https://your-api-endpoint.com/api";

export const login = async (username, password) => {
  // need to fetch or axios call here
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, token: "sample-token" });
    }, 500);
  });
};

export const getIncidents = async () => {
  // here too
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          type: "Medical",
          location: "123 Main St",
          status: "New",
          priority: "High",
          reportedAt: "2025-03-19T10:30:00",
        },
        {
          id: 2,
          type: "Fire",
          location: "456 Oak Ave",
          status: "Dispatched",
          priority: "Critical",
          reportedAt: "2025-03-19T10:15:00",
        },
        {
          id: 3,
          type: "Police",
          location: "789 Pine St",
          status: "In Progress",
          priority: "Medium",
          reportedAt: "2025-03-19T09:45:00",
        },
      ]);
    }, 500);
  });
};

export const getIncidentById = async (id) => {
  //same here
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: id,
        type: "Medical",
        description: "Person having chest pain",
        location: "123 Main St",
        coordinates: { lat: 37.7749, lng: -122.4194 },
        status: "New",
        priority: "High",
        reportedAt: "2025-03-19T10:30:00",
        reportedBy: {
          name: "John Doe",
          phone: "555-123-4567",
        },
      });
    }, 500);
  });
};

export const updateIncidentStatus = async (id, status) => {
  // same same
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};
