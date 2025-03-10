# Hindu Monthly Panchang Calendar

## Project Overview
This project provides a Hindu monthly panchang calendar that displays daily panchang details fetched from an astrology API. The calendar includes information such as tithi, nakshatra, yoga, karana, and other important Hindu astrological elements. Daily pooja and vrat data is included as sample data.

## Features
- Monthly view of Hindu panchang calendar
- Daily panchang details including tithi, nakshatra, yoga, and karana
- Information about daily poojas and vrats
- Responsive design for different devices

## Technology Stack
- **Frontend**: Next.js (React framework)
- **Backend**: Node.js
- **Database**: MongoDB
- **API**: Integration with astrology API for panchang calculations

## Setup Instructions

### Frontend Setup
The frontend is developed using Next.js. To set up and run the frontend:

1. Navigate to the frontend directory
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. The frontend will be available at `http://localhost:3000`

**Environment Variables**:  
Create a `.env` file in the frontend directory with required variables.

### Backend Setup
The backend is developed using Node.js with MongoDB as the database:

1. Navigate to the backend directory
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. The backend server will start running on port 8080 (`http://localhost:8080`)

**Environment Variables**:  
Create a `.env` file in the backend directory with the following variables:
```
MONGO_CONN_STRING = <your_mongodb_connection_string>
ASTRO_USER_ID = <your_astrology_api_user_id>
ASTRO_API_KEY = <your_astrology_api_key>
```

## API Integration
The application fetches daily panchang details from an astrology API service. The backend manages these API calls and serves the processed data to the frontend.

## Data Structure
- **Panchang Data**: Fetched from external API
- **Pooja and Vrat Data**: Sample data stored in the application
