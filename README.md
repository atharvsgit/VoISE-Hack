# CASEWISE
A comprehensive web-based surgical planning and management system designed for healthcare professionals to streamline surgical case management, patient records, and clinical workflows.

## 🏥 Features

### Core Functionality
- *Dashboard*: Real-time overview of surgical cases with key metrics and statistics
- *Patient Management*: Comprehensive patient database with medical history tracking
- *Calendar System*: Trello-style calendar for scheduling and managing surgical procedures
- *Case Creation*: Detailed form for creating new surgical cases with all relevant information
- *AI Assistant*: Conversational interface for surgical planning queries and medical consultation
- *Reference Library*: Integrated medical reference documentation with progress tracking

### User Experience
- *Authentication*: Secure login and registration system
- *Responsive Design*: Works seamlessly across desktop and mobile devices
- *Monochromatic Theme*: Clean, professional medical interface
- *Real-time Updates*: Dynamic data loading and state management

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

### Installation

1. *Clone the repository*
bash
git clone https://github.com/yourusername/surgical-planning-app.git
cd surgical-planning-app


2. *Install dependencies*
bash
npm install


3. *Install required packages*
bash
npm install react-router-dom axios lucide-react framer-motion


4. *Start the development server*
bash
npm start


The application will open at http://localhost:3000

### Build for Production

bash
npm run build


This creates an optimized production build in the build folder.

## 📁 Project Structure

surgical-planning-app/

├── public/

│   ├── index.html
│   └── favicon.ico

├── src/

│   ├── components/

│   │   └── Navbar.jsx          # Navigation bar component

│   ├── pages/

│   │   ├── Dashboard.jsx       # Main dashboard

│   │   ├── Patients.jsx        # Patient records

│   │   ├── Calender.jsx        # Surgery calendar

│   │   ├── NewCase.jsx         # Create new case form

│   │   ├── Chat.jsx            # AI assistant

│   │   ├── Reference.jsx       # Medical reference

│   │   ├── Login.jsx           # Login page

│   │   └── Register.jsx        # Registration page

│   ├── data/

│   │   └── mockData.js         # Mock data for development

│   ├── lib/

│   │   └── api.js              # API service layer

│   ├── App.js                  # Main app component

│   ├── App.css                 # App styles

│   ├── index.js                # Entry point

│   └── index.css               # Global styles

├── package.json
├── tailwind.config.js
└── README.md
## 🛠 Technology Stack

### Frontend
- *React.js* - UI library
- *React Router* - Navigation and routing
- *Tailwind CSS* - Utility-first styling
- *Lucide React* - Icon library
- *Framer Motion* - Animation library
- *Axios* - HTTP client

### State Management
- React Hooks (useState, useEffect)
- Local Storage for authentication

## 📱 Key Pages

### 1. Dashboard (/)
- Overview of all surgical cases
- Statistics cards (Total Cases, Completed, Scheduled, Success Rate)
- Recent cases list with status indicators
- Quick action button to create new cases

### 2. Patients (/patients)
- Searchable patient database
- Patient details including contact info, medical history
- Total procedures tracking
- Insurance information
- Click to view detailed patient modal

### 3. Calendar (/calendar)
- Monthly calendar view with Trello-style design
- Event indicators on dates
- Sidebar showing events for selected date
- Status badges (Completed, In Progress, Scheduled)
- Navigation between months

### 4. New Case (/new-case)
- Multi-section form:
  - Patient Information
  - Procedure Details
  - Schedule
  - Additional Notes
- Form validation
- Success confirmation

### 5. Chat (/chat)
- AI-powered surgical assistant
- Conversation history sidebar
- Real-time typing indicators
- Message timestamps

### 6. Reference (/reference)
- Medical reference documentation
- Chapter-based navigation
- Reading progress tracking
- "Continue Reading" feature

### 7. Authentication
- Login page with form validation
- Registration with password confirmation
- Protected routes
- Demo credentials accepted

## 🔐 Authentication

The app uses localStorage for authentication tokens:
- Login with any email/password (demo mode)
- Auth token stored in localStorage
- Protected routes redirect to login if not authenticated
- Logout clears authentication data

### Demo Login

Email: any@email.com
Password: any password


## 📊 Mock Data

The application includes comprehensive mock data for development:
- 6 surgical cases with various statuses
- 8 patient records with medical history
- Calendar events
- Statistics and metrics
- Surgeon information

Located in: src/data/mockData.js

## 🎨 Design System

### Color Scheme (Monochromatic)
- *Primary*: Gray-800 (#1f2937)
- *Background*: Gray-50 (#fafbfc)
- *Borders*: Gray-300 (#d1d5db)
- *Text*: Gray-900 (#111827)
- *Hover*: Gray-100 (#f3f4f6)

### Typography
- Font Family: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto')
- Headings: Bold, varying sizes
- Body: Regular weight, 14-16px

### Components
- Rounded corners (4-8px)
- Subtle shadows on cards
- Clean borders (1px solid)
- Consistent spacing (multiples of 4px)

## 🔌 API Integration

The app is designed to work with a FastAPI backend running on localhost:8000.

### API Endpoints (Expected)

GET  /api/cases/recent      - Fetch recent cases
GET  /api/patients          - Fetch all patients
POST /api/cases             - Create new case


API configuration: src/lib/api.js

If the API is unavailable, the app falls back to mock data.

## 🚧 Future Enhancements

- [ ] Advanced search and filtering
- [ ] Multi-user collaboration
- [ ] Role-based access control
- [ ] Integration with hospital systems
- [ ] Mobile app version
- [ ] Dark mode toggle
- [ ] Internationalization (i18n)

npm install
npm start

## 📝 Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Keep components focused and reusable
- Use meaningful variable names
- Comment complex logic

### Git Workflow
bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to repository
git push origin feature/your-feature-name


### Commit Convention
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Test additions/changes
- chore: Build/tool changes

## 🧪 Testing

bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage


## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔄 Changelog

### Version 1.0.0 (Current)
- Initial release
- Dashboard with case management
- Patient records database
- Calendar scheduling system
- AI chat assistant
- Medical reference library
- Authentication system

---

*Built with ❤ for healthcare professionals*
