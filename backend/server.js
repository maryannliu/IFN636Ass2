const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/loans', require('./routes/loanRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));


// Export the app object for testing
if (require.main === module) {
    connectDB();

    // register event listener 
    require('./events/bookEvents');

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
