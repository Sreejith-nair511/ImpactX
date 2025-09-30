# Disaster Relief Escrow on Algorand

A minimal web application where donors can contribute funds to a disaster relief project and funds are stored in an Algorand smart contract escrow. The funds are released only when an NGO uploads proof of aid delivery.

## Features

1. **Algorand Smart Contract (Escrow)**
   - Accepts donations from multiple users
   - Releases funds when an NGO "approves" delivery (manual verification)

2. **Frontend (React.js)**
   - Donor view: Connect wallet, enter amount, donate
   - NGO view: Upload proof (text + optional image upload)
   - Status view: Show escrow balance + release status

3. **Backend (Node.js/Express)**
   - Simple API to interact with Algorand smart contract
   - Store NGO proof uploads (in local storage or mock DB)

## Tech Stack

- **Blockchain**: Algorand (TEAL smart contract)
- **Frontend**: React.js + Tailwind CSS
- **Backend**: Node.js/Express
- **Storage**: Local/Mock (IPFS later)

## Project Structure

```
disaster-relief-escrow/
├── frontend/          # React.js frontend
│   ├── src/
│   │   ├── DonorView.jsx
│   │   ├── NGOView.jsx
│   │   └── StatusView.jsx
│   └── ...
├── backend/           # Node.js/Express backend
│   ├── contracts/
│   │   └── escrow.teal
│   ├── server.js
│   └── ...
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

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

- **Frontend**: Deploy on Vercel
- **Backend**: Local server (expand to cloud later)
- **Blockchain**: Algorand TestNet

## Future Enhancements

- Integrate with real Algorand blockchain
- Implement IoT oracles for automatic verification
- Store proofs on IPFS for decentralized storage
- Integrate satellite APIs for location verification
- Add Hyperledger for enhanced privacy features

## License

This project is licensed under the MIT License.