#  Charging Station Manager

A full-stack application for managing EV charging stations with real-time mapping and monitoring capabilities.

##  Features

### Backend
- RESTful API using Node.js & Express
- MongoDB database integration
- JWT Authentication
- CRUD operations for charging stations
- Protected routes
- Location-based services

### Frontend
- Vue.js with Tailwind CSS
- Interactive map view using OpenStreetMap
- Real-time station monitoring
- Responsive design
- Authentication & Authorization
- Station management interface

##  Tech Stack

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: Vue.js, Tailwind CSS, Leaflet
- **Authentication**: JWT
- **Database**: MongoDB Atlas
- **Deployment**: Vercel

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env  # Configure your environment variables
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env  # Configure your environment variables
npm run dev
```

##  Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

##  API Documentation

### Authentication Endpoints
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Charging Station Endpoints
- GET `/api/stations` - Get all stations
- POST `/api/stations` - Create station
- PUT `/api/stations/:id` - Update station
- DELETE `/api/stations/:id` - Delete station

##  Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

##  Screenshots

### Registration Page
![Registration Page](![alt text](image.png))
Description: User registration interface for creating a new charging station account.

### Dashboard
![Dashboard](![alt text](image-1.png))
Description: Main dashboard showing charging station statistics and map view.

### Login Page
![Login Page](![alt text](image-2.png))
Description: User authentication interface for existing users.

##  Deployment

### Backend Deployment
1. Configure environment variables
2. Set up MongoDB Atlas
3. Deploy to your chosen platform

### Frontend Deployment
1. Build the production files
```bash
cd frontend
npm run build
```
2. Deploy the `dist` folder

##  License

MIT License

##  Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

##  Acknowledgments

- OpenStreetMap for mapping services
- Tailwind CSS for styling
- Vue.js community
