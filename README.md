# 🏛️ ICT Chamber Complaint Management System

A modern web application for managing and tracking citizen complaints and agency responses. Built with React, TypeScript, and Express.js.

## 🌟 Features

### For Citizens
- 📝 Submit complaints with detailed information
- 📍 Specify complaint location
- 🏢 Choose relevant agency/category
- 📱 Track complaint status
- 🔔 Receive notifications on updates
- 👤 User profile management

### For Agencies
- 📊 View and manage assigned complaints
- 📝 Respond to citizen complaints
- 📈 Track complaint statistics
- 👥 Manage agency staff
- 🔔 Real-time notifications

### For Administrators
- 👥 User management
- 🏢 Agency management
- 📊 System-wide analytics
- 🔒 Role-based access control
- 📝 Complaint oversight

## 🛠️ Tech Stack

### Frontend
- React.js with TypeScript
- Next.js for server-side rendering
- Tailwind CSS for styling
- React Context for state management
- React Router for navigation
- React Icons for UI elements

### Backend
- Express.js with TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Zod for validation
- OpenAPI/Swagger for API documentation
- Pino for logging

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/saveur1/ict-chamber-hackathon.git
cd ict-chamber-hackathon
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
```bash
# Backend
cp backend/.env.example backend/.env
# Frontend
cp frontend/.env.example frontend/.env
```

4. Start the development servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd ../frontend
npm run dev
```

## 📁 Project Structure

```
ict-chamber-hackathon/
├── backend/
│   ├── routes/         # API routes
│   ├── controllers/    # Route controllers
│   ├── models/         # Database models
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Utility functions
│   └── api-docs/       # API documentation
|
└── frontend/
    ├── src/
    │   ├── app/           # Next.js app directory
    │   ├── components/    # React components
    │   ├── Context/       # React context providers
    │   ├── types/         # TypeScript types
    │   └── utils/         # Utility functions
    └── public/            # Static files
```

## 🔒 Authentication

The system uses JWT (JSON Web Tokens) for authentication with the following roles:
- Citizen
- Agency Staff
- Administrator

## 📝 API Documentation

API documentation is available at `/api-docs` when running the backend server. The documentation is generated using OpenAPI/Swagger and includes:
- All available endpoints
- Request/response schemas
- Authentication requirements
- Example requests

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

- Bikorimana Saveur

## 🙏 Acknowledgments

- ICT Chamber for organizing the hackathon
- All contributors and supporters
- Open source community for the amazing tools and libraries
