const express = require('express');
const app = express();
app.use(express.json());

// Logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

console.log('Mounting auth routes...');
try {
    const authRoutes = require('./routes/auth');
    console.log('Auth routes loaded type:', typeof authRoutes);
    if (authRoutes.stack) {
        console.log('Auth router stack length:', authRoutes.stack.length);
        authRoutes.stack.forEach(layer => {
            if (layer.route) {
                console.log('Route:', layer.route.path, layer.route.methods);
            }
        });
    }
    app.use('/api/auth', authRoutes);
} catch (e) {
    console.error('Failed to load auth routes:', e);
}

app.listen(5003, () => console.log('Test server route on 5003'));
