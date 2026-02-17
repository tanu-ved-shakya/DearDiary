const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/auth/register', (req, res) => {
    console.log('Register hit!', req.body);
    res.json({ msg: 'Worked' });
});

app.listen(5002, () => console.log('Test server on 5002'));
