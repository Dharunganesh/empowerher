# SafeRoute - Women's Safety Navigation App

A Java-based application designed to provide safer navigation routes and emergency assistance for women.

## Project Overview
SafeRoute is a women's safety application that helps users navigate through safer routes while traveling and provides quick access to emergency services through an SOS feature that connects to the nearest police station.

## Features
- Safe route navigation
- Real-time location tracking
- SOS emergency alert system
- Nearest police station locator
- Emergency contact management
- User authentication and security

## Project Structure
```
SafeRouteApp/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/saferoute/
│   │   │   │       ├── controller/
│   │   │   │       ├── service/
│   │   │   │       ├── model/
│   │   │   │       └── util/
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── assets/
│   └── package.json
└── security/
    └── src/
        └── main/
            └── java/
                └── com/saferoute/security/
```

## Team Responsibilities

### Backend Team (Person 1)
- Core backend services implementation
- Database design and management
- Location service integration
- Route calculation algorithms
- API development for police station integration

### Frontend Team (Person 2)
- Mobile application UI/UX
- Map integration and visualization
- Real-time location tracking interface
- User profile management
- SOS button implementation

### Security Team (Person 3)
- User authentication system
- SOS alert system implementation
- Emergency contact management
- Police station communication module
- Real-time notification system

## Getting Started

### Prerequisites
- Java JDK 17 or higher
- Maven
- Git
- Your preferred IDE (IntelliJ IDEA recommended)

### Setup Instructions
1. Clone the repository
```bash
git clone [repository-url]
```

2. Create your feature branch
```bash
git checkout -b feature/your-feature-name
```

3. Follow module-specific README files in each directory for detailed setup instructions

## Branching Strategy
- main: Production-ready code
- develop: Development branch
- feature/*: Individual feature branches
- bugfix/*: Bug fix branches

## Commit Guidelines
- Use meaningful commit messages
- Reference issue numbers in commits
- Keep commits focused and atomic

## Communication
- Use GitHub Issues for task tracking
- Regular team meetings for sync-ups
- Use pull requests for code reviews

## Security Considerations
- Never commit sensitive information
- Follow security best practices
- Regular security audits

## License
[Add your license here] 