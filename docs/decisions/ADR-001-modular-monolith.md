# ADR-001: Use Modular Monolith Architecture

## Context
CareConnect is a healthcare appointment management platform being developed as a portfolio/learning project. The application needs to handle:
- User authentication and authorization
- Doctor profile management
- Appointment scheduling
- Availability management
- Notifications
- Admin dashboard

We need to choose an architecture that balances:
- Development speed
- Learning value
- Maintainability
- Scalability for future growth

## Decision
Use a **modular monolith architecture** with clear separation of concerns.

## Alternatives Considered

### Alternative 1: Microservices
**Pros:**
- Independent scaling
- Technology diversity
- Fault isolation
- Team autonomy

**Cons:**
- High operational complexity
- Distributed system challenges (network latency, partial failures)
- Difficult to develop and test locally
- Overkill for a portfolio project
- Requires DevOps expertise

### Alternative 2: Monolithic (non-modular)
**Pros:**
- Simple to start
- Easy deployment

**Cons:**
- Code becomes tangled over time
- Difficult to maintain as it grows
- Hard to extract services later
- No clear boundaries

### Alternative 3: Modular Monolith (Chosen)
**Pros:**
- Clear module boundaries
- Easy to develop and test locally
- Simple deployment (single artifact)
- Can be split into microservices later if needed
- Lower operational complexity
- Good for learning software architecture
- Appropriate for portfolio project scale

**Cons:**
- Cannot scale individual components independently
- Single point of failure (mitigated by modern hosting)
- Technology choice applies to entire system

## Reasoning

### Why Modular Monolith for CareConnect?

1. **Learning Value**: As a portfolio project, the focus is on learning software engineering principles. Modular monolith teaches:
   - Domain-driven design
   - Module boundaries
   - Clean architecture
   - Without the complexity of distributed systems

2. **Development Speed**: Single codebase, simple tooling, fast feedback loops. This allows faster iteration and learning.

3. **Operational Simplicity**: Single deployment artifact, no service mesh, no distributed tracing complexity. Suitable for a student project.

4. **Future Flexibility**: The modular structure means we can extract services into microservices later if the project grows. The boundaries are already defined.

5. **Appropriate Scale**: For a portfolio project, microservices would be overkill. The application will likely have limited traffic initially.

## Consequences

### Positive
- Fast development cycle
- Easy local testing
- Simple deployment pipeline
- Clear code organization
- Good learning opportunity
- Easy to understand architecture

### Negative
- Cannot scale individual components (not needed for this scale)
- Technology choice applies to entire system (acceptable for this project)
- Single deployment artifact (acceptable for this scale)

### Mitigations
- Modular structure allows future extraction to microservices
- Modern hosting (Vercel, Railway, etc.) handles scaling well
- Clear module boundaries prevent code tangling

## Implementation

### Backend Structure
```
server/src/
├── features/
│   ├── auth/
│   ├── doctors/
│   ├── appointments/
│   └── admin/
├── shared/
│   ├── models/
│   ├── utils/
│   └── types/
└── app.ts
```

### Frontend Structure
```
client/src/
├── features/
│   ├── auth/
│   ├── doctors/
│   ├── appointments/
│   └── admin/
├── shared/
│   ├── components/
│   ├── hooks/
│   └── lib/
└── App.tsx
```

Each feature is self-contained with its own:
- Routes
- Components
- Services
- Types
- Business logic

## References
- [Modular Monolith: Modulith](https://modulith.io/)
- [Monolith First](https://www.thoughtworks.com/insights/blog/dont-start-monoliths)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
