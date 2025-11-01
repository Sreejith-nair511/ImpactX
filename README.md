# Transparent & Verifiable Disaster Relief Funding on Algorand # portal 2 

logo 
<h1><img width="1024" height="904" alt="logo" src="https://github.com/user-attachments/assets/cc33fef5-3dc9-4427-a709-8e0f7599ddf6" />
</h1>

An open-source blockchain-powered disaster relief and impact funding platform built on Algorand. The solution ensures that every donation is transparent, tamper-proof, and outcome-verified. Funds are locked in smart contract escrows and released only when verified by multi-source oracles, including NGO reports, IoT/drones, and satellite data. This approach restores donor trust, eliminates corruption, and establishes a global standard for accountable disaster aid.

## Development Team

This project was developed by:
- **Goodwell Sreejith S** - Lead Developer
- **Vasudha** - Frontend Engineer
- **Nikhil** - Blockchain Specialist

## Problem Statement

Every year, trillions of dollars are allocated to global aid, disaster relief, poverty alleviation, and climate action. However, reports from the World Bank estimate that up to 30% of this funding is lost due to corruption, mismanagement, or fraud. This leads to significant inefficiency: funds raised for schools, hospitals, or disaster survivors often never reach those in need. Opaque reporting, middlemen layers, and lack of verification worsen the issue, leading to loss of trust, wasted resources, and delayed climate or humanitarian action.

## Why Current Systems Fail

- **Middlemen Layers**: Funds pass through multiple intermediaries (NGOs, agencies, government bodies), each capable of misreporting or diverting resources.

- **Opaque Reporting**: Donors rarely see real-time updates; reports are delayed, manipulated, or fabricated.

- **Lack of Verification**: No reliable system exists to confirm whether claimed outcomes (e.g., 10,000 trees planted) actually occurred.

- **Centralized Control**: A few organizations hold and distribute funds, creating monopolies vulnerable to misuse.

## Our Solution

We propose a blockchain-based open-source platform to ensure transparency and accountability in disaster relief and social impact funding. Using Algorand smart contracts, funds are locked in escrow and released only when independent oracles verify that relief activities have been completed. The system integrates IoT, drones, and satellite imagery to cross-verify outcomes, creating an end-to-end transparent audit trail.

## Enhanced Features

We've expanded the platform with advanced intelligence features:

### AI Verification & Analytics
- **Global Impact Dashboard**: Real-time visualization of humanitarian impact across the globe
- **Data Insights & Analytics**: Advanced analytics and machine learning insights
- **Climate Forecast**: AI-powered climate predictions for proactive disaster preparation
- **Verification Engine**: Multi-layer AI verification process for complete transparency
- **Fraud Detection**: Advanced fraud detection and prevention systems

### Automation & Marketplace
- **Intelligent Automation**: Streamlined operations through intelligent automation
- **Impact Token Marketplace**: Trade impact tokens representing verified humanitarian achievements
- **Decentralized Treasury**: Transparent, community-governed fund management
- **Community Proposals**: Democratic decision-making for fund allocation
- **Volunteer Opportunities**: Platform for volunteers to contribute skills and time

### Education & Community
- **Impact Academy**: Courses on humanitarian innovation and blockchain technology
- **Global Events**: Conferences, workshops, and community gatherings
- **API Playground**: Tools for developers to build on the platform
- **Smart Contracts**: Transparent, blockchain-verified agreements

## Technology Stack

- **Blockchain**: Algorand (public ledger) with TEAL smart contracts
- **Frontend**: React.js + Vite + Tailwind CSS + Framer Motion
- **Backend**: Node.js/Express with REST API
- **Storage**: IPFS for proof documents with on-chain hashes
- **Oracles**: Multi-source verification (NGO reports, IoT/drones, satellite imagery)
- **Privacy**: Secure handling of sensitive data
- **Deployment**: Docker/Kubernetes for backend, Vercel for frontend

## System Architecture

- **Tamper-proof Ledger**: All donations and fund flows are immutably recorded on Algorand.
- **Smart Contract Escrow**: Funds released only when outcome verifications pass.
- **Outcome Verification Oracles**: Multi-source inputs from NGOs, IoT sensors, drones, and satellites.
- **Dual-Chain Architecture**: Algorand (public transparency) with privacy measures for sensitive data.
- **Off-chain Storage**: Proofs such as documents, reports, and images stored on IPFS with on-chain hashes.

## Project Structure

```
impactx/
├── frontend/          # React.js + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── ...
├── backend/           # Node.js/Express backend
│   ├── contracts/
│   │   └── escrow.teal
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── prisma/
│   └── ...
├── k8s/               # Kubernetes deployment manifests
├── docs/              # Documentation
└── README.md
```

## Implementation Roadmap

**Phase 1 (MVP)**: Build Algorand smart contract escrow + donor dashboard.

**Phase 2 (Pilot)**: Integrate NGOs with field-level verification (IoT/drones).

**Phase 3 (Scaling)**: Add cross-border aid flows, satellite data verification, and AI-driven fraud detection.

**Phase 4 (Open Source)**: Release SDKs and APIs for NGOs, civic-tech startups, and governments.

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Docker (for containerized deployment)
- Kubernetes (for production deployment)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

   The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## Usage

1. **Donor View**: Connect your wallet and make a donation
2. **NGO View**: Upload proof of aid delivery to release funds
3. **Status View**: Check the current escrow balance and release status

## Deployment

### Docker Deployment

You can run the application using Docker Compose for local development or production:

```bash
# For development
docker-compose up --build

# For production
docker-compose -f docker-compose.prod.yml up --build
```

### Kubernetes Deployment

The application can also be deployed to a Kubernetes cluster. See the [k8s/README.md](k8s/README.md) for detailed instructions.

- **Frontend**: Deploy on Vercel or Kubernetes
- **Backend**: Deploy on Kubernetes or cloud provider
- **Database**: PostgreSQL (Docker container or managed service)
- **Blockchain**: Algorand TestNet

## Open Source Vision

By releasing the codebase under an open-source license, we aim to create a global standard for transparent and verifiable disaster relief. NGOs, civic-tech innovators, and governments can fork, extend, and customize the system to suit regional needs. This encourages collaboration, innovation, and trust in humanitarian ecosystems.

## Impact

- Restores trust in aid and charity ecosystems.
- Prevents corruption and mismanagement.
- Ensures faster, verified relief delivery.
- Provides a model for sustainable, climate-related project funding.
- Sets a global precedent for tamper-proof, outcome-driven funding systems.

## Future Scope

- **Tokenized Impact Credits**: Donors receive proof-of-impact tokens.
- **AI-driven fraud detection**: Pattern analysis for anomaly detection in aid distribution.
- **Cross-border interoperability**: Integration with CBDCs and international remittance systems.
- **Community governance**: DAO-based voting for fund allocation decisions.

## Conclusion

Our project harnesses Algorand's secure, scalable blockchain to revolutionize disaster relief funding. By combining transparency, outcome verification, and open-source collaboration, we aim to create a future where every donation counts, every promise is proven, and global aid truly reaches those who need it most.

## Additional Documentation

For more detailed information about the implementation and deployment of this system, please refer to the following documents:

- [Vision Implementation Guide](VISION-IMPLEMENTATION.md) - Detailed explanation of how the system implements the vision
- [Deployment Guide](DEPLOYMENT-GUIDE.md) - Comprehensive deployment instructions for various environments
- [Project Structure](PROJECT-STRUCTURE.md) - Detailed overview of the project architecture
- [Developer Documentation](README-dev.md) - Technical documentation for developers
- [Architecture Diagram](architecture.md) - Visual representation of the system architecture

Image 
<img width="1760" height="860" alt="Screenshot 2025-11-01 103651" src="https://github.com/user-attachments/assets/bd157892-f404-412f-80e9-759818cdf246" />
<img width="1673" height="929" alt="Screenshot 2025-11-01 103724" src="https://github.com/user-attachments/assets/30c5988a-ae16-4729-8ac5-b026142aade4" />
<img width="1693" height="887" alt="Screenshot 2025-11-01 103705" src="https://github.com/user-attachments/assets/3b4e435f-52aa-44c9-9ad6-280a0ae3a68d" />
<img width="1760" height="860" alt="Screenshot 2025-11-01 103651" src="https://github.com/user-attachments/assets/378a97dc-02c7-4595-9742-04a7ea59941b" />
<img width="1748" height="828" alt="Screenshot 2025-11-01 103936" src="https://github.com/user-attachments/assets/b821987c-fa58-49e8-94b5-f0e415d5ec81" />
<img width="1585" height="407" alt="Screenshot 2025-11-01 103924" src="https://github.com/user-attachments/assets/21df0664-b257-499a-a116-f5fd47cac9f2" />
<img width="1713" height="932" alt="Screenshot 2025-11-01 103912" src="https://github.com/user-attachments/assets/910a2c49-841c-4a20-959f-71e166baf5e3" />
<img width="1723" height="830" alt="Screenshot 2025-11-01 103855" src="https://github.com/user-attachments/assets/68ae1313-b387-41bc-8e02-dc9389c78812" />
<img width="1667" height="897" alt="Screenshot 2025-11-01 103835" src="https://github.com/user-attachments/assets/47a184be-f61a-4903-9bdf-36aa9db0d44a" />
<img width="1403" height="939" alt="Screenshot 2025-11-01 103819" src="https://github.com/user-attachments/assets/43d3370b-0747-451e-85cf-ec99c0b547f2" />
<img width="1663" height="892" alt="Screenshot 2025-11-01 103802" src="https://github.com/user-attachments/assets/5a0b69a7-d280-4db3-8437-daae08b30987" />
<img width="1643" height="698" alt="Screenshot 2025-11-01 103752" src="https://github.com/user-attachments/assets/0cc95f28-d2f3-4a39-809f-176b5faad6b6" />
<img width="1617" height="691" alt="Screenshot 2025-11-01 103738" src="https://github.com/user-attachments/assets/f35b1b6d-28ce-477a-9f51-5f0c8454d5c4" />


## License

This project is licensed under the MIT License.
