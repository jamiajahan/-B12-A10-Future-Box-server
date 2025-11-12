const admin = require('firebase-admin');

try {
  // Path is relative to the root (where index.js runs)
  const serviceAccount = require('../firebase-service-account.json'); 
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log("Firebase Admin SDK initialized.");
} catch (error) {
  console.error("Firebase Admin SDK Error:", error.message);
  console.log("Note: Server will run, but token verification will fail until 'firebase-service-account.json' is set up.");
}

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the authorization header is present and formatted correctly
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Add the user's info (like email, uid) to the request object
    req.user = decodedToken; 
    
    next(); // Token is valid, proceed to the next function
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(403).send({ message: 'Forbidden: Invalid token' });
  }
};

module.exports = verifyToken;