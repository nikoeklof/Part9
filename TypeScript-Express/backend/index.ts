import express from 'express';
import patientRouter from './routes/patients';
import diagnoseRouter from './routes/diagnoses';
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients/:id?', patientRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});